import mysql.connector
from mysql.connector import Error

conexao = mysql.connector.connect()
cursor = mysql.connector.connect()

# Variáveis da tabela Usuário.
tbl_usuario = dict(id_user='', nome='', sobrenome='', email='', senha='', funcao='', imagem='')

# Variáveis da tabela Telefone.
tbl_telefone = dict(id_user='', numero_telefone='', tipo_telefone='')

# Variáveis da tabela Equipamento.
tbl_equipamento = dict(nome_equipamento='', logradouro='', numero='', cidade='', estado='', cep='')

# Variáveis da tabela intermediária Usuário e Equipamento.
tbl_usuario_equipamento = dict(id_usuario='', id_equipamento='')

# Variáveis da tabela Comodo.
tbl_comodo = dict(id_comodo='', id_equipamento='', nome_comodo='', tipo_comodo='', zona_comodo='', status_comodo='')

# Variáveis da tabela Sensor.
tbl_sensor = dict(id_sensor='', id_comodo='', nome_sensor='', porta_sensor='', tipo_sensor='', status_sensor='')


def bd_conectar():
    """
    Função responsável por fazer a conexão com o banco de dados,
    se a mesma não encontrar o banco de dados ela cria um banco de dados padrão através da função bd_criar.
    :return: retorna confirmação ou erro da conexão com o banco de dados,
    ou a confirmação ou erro da criação do banco de dados padrão.
    """

    global conexao, cursor
    try:
        conexao = mysql.connector.connect(host='localhost', database='db_algizsystem', user='tcc', password="TCC")
        return True

    except mysql.connector.errors.ProgrammingError:
        try:
            bd_criar()
            print("\nBanco de Dados Criado com Sucesso!")

        except mysql.connector.Error as erro:
            return f"Falha ao criar tabela no MySQL: {erro}"

        finally:
            if conexao.is_connected():
                return bd_desconectar()

    except mysql.connector.errors.DatabaseError as erro:
        return f'Erro de Conexão! {erro}'

    except mysql.connector.errors.InterfaceError as erro:
        return ('Erro de Conexão!'
                '\nNão foi possivel estabelecer uma conexão ao banco de dados,'
                ' verifica se o servidor está funcionando.'
                f'Tipo de Erro: \n{erro}')

    except ConnectionRefusedError:
        return ('Erro de Conexão!'
                '\nA conexão com o servidor MySQL foi recusada.'
                '\nVerifique se o servidor MySQL está em execução e se as credenciais estão cor')


def bd_desconectar():
    """
    Função responsável pela desconexão do banco de dados.
    :return: retorna uma mensagem com o encerramento da conexão
    """

    global conexao, cursor
    cursor.close()
    conexao.close()
    return "Conexão ao Banco de Dados foi encerrada com sucesso!"


def bd_criar():
    """
    Função responsável pela criação do banco de dados padrão, criando o banco, as tabelas e a ligações que são necessária no banco.
    :return: retorna a confirmação da criação das tabelas.
    """

    global conexao, cursor
    conexao = mysql.connector.connect(host='localhost', user="tcc", password="TCC")
    cursor = conexao.cursor()

    database_nome = 'db_algizsystem'
    cursor.execute(f'CREATE DATABASE IF NOT EXISTS {database_nome}')
    print('Criando o Banco de Dados: ', database_nome)

    cursor.execute(f'USE {database_nome}')

    print('\nCriando as Tabelas do Banco de Dados: ')
    tabela_query = '''
    CREATE TABLE IF NOT EXISTS tbl_usuario (
        id_user INTEGER PRIMARY KEY NOT NULL,
        nome VARCHAR(50) NOT NULL,
        sobrenome VARCHAR(80),
        email VARCHAR(100) NOT NULL,
        senha VARCHAR(128) NOT NULL,
        funcao VARCHAR(50) NOT NULL,
        imagem VARCHAR(100)
        );
        
    CREATE TABLE IF NOT EXISTS tbl_telefone (
        id_telefone INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
        id_user INTEGER,
        numero_telefone VARCHAR(20) NOT NULL,
        tipo_telefone VARCHAR(30),
        FOREIGN KEY (id_user) REFERENCES tbl_usuario (id_user) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tbl_equipamento (
        id_equipamento INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
        nome_equipamento VARCHAR(50) NOT NULL,
        logradouro VARCHAR(100) NOT NULL,
        numero VARCHAR(10) NOT NULL,
        cidade VARCHAR(50) NOT NULL,
        estado VARCHAR(50) NOT NULL,
        cep VARCHAR(20) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tbl_comodo (
        id_comodo INTEGER PRIMARY KEY NOT NULL,
        id_equipamento INTEGER,
        nome_comodo VARCHAR(50) NOT NULL,
        tipo_comodo VARCHAR(50) NOT NULL,
        zona_comodo INTEGER NOT NULL,
        status_comodo TINYINT(1) NOT NULL,
        FOREIGN KEY (id_equipamento) REFERENCES tbl_equipamento (id_equipamento) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tbl_sensor (
        id_sensor INTEGER PRIMARY KEY NOT NULL,
        id_comodo INTEGER,
        nome_sensor VARCHAR(50) NOT NULL,
        porta_sensor INTEGER NOT NULL,
        tipo_sensor VARCHAR(50) NOT NULL,
        status_sensor TINYINT(1) NOT NULL,
        FOREIGN KEY (id_comodo) REFERENCES tbl_comodo (id_comodo) ON DELETE CASCADE,
        UNIQUE (id_comodo, nome_sensor)
    );

-- Tabela intermediária para associar usuários a equipamentos
    CREATE TABLE IF NOT EXISTS tbl_usuario_equipamento (
        id_usuario INTEGER,
        id_equipamento INTEGER,
        FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_user),
        FOREIGN KEY (id_equipamento) REFERENCES tbl_equipamento (id_equipamento)
    );

-- Índices únicos
    CREATE UNIQUE INDEX idx_usuario_email ON tbl_usuario (email);
    CREATE UNIQUE INDEX idx_equipamento_cep_logradouro ON tbl_equipamento (cep, logradouro);
    CREATE UNIQUE INDEX idx_comodo_nome ON tbl_comodo (nome_comodo);
    CREATE UNIQUE INDEX idx_sensor_comodo_nome ON tbl_sensor (id_comodo, nome_sensor);
    '''
    cont = 0
    queries = tabela_query.split(';')

    for query in queries:
        cont += 1
        if query.strip():
            # Divida a consulta para encontrar a parte que menciona a tabela
            parts = query.split(' ')
            if "TABLE" in parts:
                table_index = parts.index("EXISTS")
                tabela_nome = parts[table_index + 1].strip()
                tabela_nome = tabela_nome.split(" (")[0]  # Remove caracteres extras
                print(tabela_nome, 'foi criado com sucesso!')
                cursor.execute(query)

    conexao.commit()
    bd_desconectar()


def bd_inserir_usuario():
    """
    Função responsável por inserir dados de um usuário no banco de dados, incluindo informações como nome, sobrenome,
    email, senha e função.
    :return: Retorna uma mensagem de confirmação se os dados do usuário foram inseridos com sucesso no banco de dados.
    """

    global cursor, conexao, tbl_usuario, tbl_telefone
    try:
        if not bd_conectar():
            return "Erro ao conectar ao banco de dados."

        cursor = conexao.cursor()
        inserir_dados = f'INSERT INTO tbl_usuario (id_user, nome, sobrenome, email, senha, funcao, imagem) VALUES ( %s, %s, %s, %s, %s, %s, %s)'
        valores = (tbl_usuario['id_user'],
                   tbl_usuario['nome'],
                   tbl_usuario['sobrenome'],
                   tbl_usuario['email'],
                   tbl_usuario['senha'],
                   tbl_usuario['funcao'],
                   tbl_usuario['imagem'])
        cursor.execute(inserir_dados, valores)
        id_usuario = cursor.lastrowid

        inserir_dados = f'INSERT INTO tbl_telefone (id_user, numero_telefone, tipo_telefone) VALUES (%s, %s, %s)'
        valores = (tbl_telefone['id_user'],
                   tbl_telefone['numero_telefone'],
                   tbl_telefone['tipo_telefone'])
        cursor.execute(inserir_dados, valores)

        conexao.commit()
        return id_usuario

    except mysql.connector.errors as erro:
        return "Erro ao inserir dados no banco de dados:", erro

    finally:
        bd_desconectar()
        return ("Dados de usuário inseridos com sucesso!"
                "\nConexão ao Banco de Dados foi encerrada com sucesso!")


def bd_inserir_equipamento():
    """
    Função responsável por inserir dados de um equipamento no banco de dados, incluindo informações
    como o ID do usuário, logradouro, número, cidade e CEP.
    :return: Retorna uma mensagem de confirmação se os dados do equipamento foram inseridos com sucesso no
    banco de dados.
    """
    global cursor, conexao, tbl_equipamento
    try:
        if not bd_conectar():
            return "Erro ao conectar ao banco de dados."

        cursor = conexao.cursor()
        inserir_dados_equipamento = f'INSERT INTO tbl_equipamento (nome_equipamento, logradouro, numero, cidade, estado, cep) VALUES (%s, %s, %s, %s, %s, %s)'
        valores_equipamento = (
            tbl_equipamento['nome_equipamento'],
            tbl_equipamento['logradouro'],
            tbl_equipamento['numero'],
            tbl_equipamento['cidade'],
            tbl_equipamento['estado'],
            tbl_equipamento['cep']
        )
        cursor.execute(inserir_dados_equipamento, valores_equipamento)

        conexao.commit()
        return "Dados de equipamento inseridos com sucesso!"

    except mysql.connector.Error as erro:
        return "Erro ao inserir dados no banco de dados:", erro

    finally:
        bd_desconectar()


def bd_inserir_comodo():
    """
    Função responsável por inserir dados de um cômodo no banco de dados, incluindo informações como o ID do usuário,
    ID do equipamento, nome do cômodo e status do cômodo.
    :return: Retorna uma mensagem de confirmação se os dados do cômodo foram inseridos com sucesso no banco de dados.
    """

    global cursor, conexao, tbl_comodo
    try:
        if not bd_conectar():
            return "Erro ao conectar ao banco de dados."

        cursor = conexao.cursor()
        inserir_dados_comodo = f'INSERT INTO tbl_comodo (id_comodo, id_equipamento, nome_comodo, tipo_comodo, zona_comodo, status_comodo) VALUES (%s, %s, %s, %s, %s, %s)'
        valores_comodo = (
            tbl_comodo['id_comodo'],
            tbl_comodo['id_equipamento'],
            tbl_comodo['nome_comodo'],
            tbl_comodo['tipo_comodo'],
            tbl_comodo['zona_comodo'],
            tbl_comodo['status_comodo']
        )
        cursor.execute(inserir_dados_comodo, valores_comodo)

        conexao.commit()
        return "Dados de comodo inseridos com sucesso!"

    except mysql.connector.Error as erro:
        return "Erro ao inserir dados no banco de dados:", erro

    finally:
        bd_desconectar()


def bd_inserir_sensor():
    """
    Função responsável por inserir dados de um sensor no banco de dados, incluindo informações como o ID do cômodo,
    nome do sensor, tipo do sensor e status do sensor.
    :return: Retorna uma mensagem de confirmação se os dados do sensor foram inseridos com sucesso no banco de dados.
    """

    global cursor, conexao, tbl_sensor
    try:
        if not bd_conectar():
            return "Erro ao conectar ao banco de dados."

        cursor = conexao.cursor()
        inserir_dados_sensor = f'INSERT INTO tbl_sensor (id_sensor, id_comodo, nome_sensor, porta_sensor, tipo_sensor, status_sensor) VALUES (%s, %s, %s, %s, %s, %s)'
        valores_sensor = (
            tbl_sensor['id_sensor'],
            tbl_sensor['id_comodo'],
            tbl_sensor['nome_sensor'],
            tbl_sensor['porta_sensor'],
            tbl_sensor['tipo_sensor'],
            tbl_sensor['status_sensor']
        )
        cursor.execute(inserir_dados_sensor, valores_sensor)
        conexao.commit()
        return "Dados de sensor inseridos com sucesso!"

    except mysql.connector.Error as erro:
        return "Erro ao inserir dados no banco de dados:", erro

    finally:
        bd_desconectar()


def bd_vincular_intermediaria():
    global conexao, cursor, tbl_usuario_equipamento
    try:
        bd_conectar()
        cursor = conexao.cursor()
        inserir_associacao = "INSERT INTO tbl_usuario_equipamento (id_usuario, id_equipamento) VALUE (%s, %s)"
        valor_usuario_equipamento = (
            tbl_usuario_equipamento['id_usuario'],
            tbl_usuario_equipamento['id_equipamento']
        )
        cursor.execute(inserir_associacao, valor_usuario_equipamento)
        conexao.commit()
        return 'Vinculado com Sucesso!'
    except Error as erro:
        return 'Erro no banco de dados: ', erro
    finally:
        bd_desconectar()


def bd_remover_intermediaria(id_usuario, id_equipamento):
    global conexao, cursor
    try:
        bd_conectar()
        cursor = conexao.cursor()
        remover_associacao = "DELETE FROM tbl_usuario_equipamento WHERE id_usuario = %s AND id_equipamento = %s"
        cursor.execute(remover_associacao, (id_usuario, id_equipamento))
        conexao.commit()
        return 'Usuário desvinculado com sucesso!'

    except Error as erro:
        return 'Erro no banco de dados: ', erro
    finally:
        bd_desconectar()


def bd_verificar_mostrar_banco(tabela, campo, dados, verificar):
    """
    Função para verificar a existência de registros em uma tabela do banco de dados ou buscar dados apenas de um registro
    do banco de dados que foi pesquisado com o campo e o dados, com isso retorna o registro daquele dados buscado.
    :param tabela: Nome da tabela onde a pesquisa será realizada.
    :param campo: Nome do campo a ser verificado.
    :param dados: Valor a ser buscado no campo especificado.
    :param verificar: Se tiver com 1 o return vai ser True ou falso, mas se tiver com 0 retorna o registro todo pesquisado
    :return: True se um registro com o valor especificado for encontrado, False caso contrário.
    """
    global cursor, conexao
    try:
        if not bd_conectar():
            return "Erro ao conectar ao banco de dados."
        else:
            consulta = f"SELECT * FROM {tabela} WHERE {campo} = %s"
            cursor = conexao.cursor()
            cursor.execute(consulta, (dados,))
            resultado = cursor.fetchone()

            if verificar == 1:
                return resultado is not None
            elif verificar == 0:
                return resultado
            else:
                return 'Apenas 0 ou 1'

    except Error as erro:
        return "Erro ao realizar a consulta no banco de dados: ", erro

    finally:
        if conexao.is_connected():
            bd_desconectar()


def bd_buscar_dados(tabela):
    global cursor, conexao
    try:
        bd_conectar()
        if conexao.is_connected():
            cursor = conexao.cursor()

            numero_registro = f"SELECT COUNT(*) FROM {tabela}"
            cursor.execute(numero_registro)
            numero_registro = cursor.fetchone()[0]

            consulta_dados = f"SELECT * FROM {tabela}"
            cursor.execute(consulta_dados)
            dados = cursor.fetchall()

            return numero_registro, dados
    except Error as erro:
        return "Erro ao realizar a consulta no banco de dados: ", erro

    finally:
        if conexao.is_connected():
            bd_desconectar()


def bd_atualizar_dados(tabela, campo, novo_dados, campo_id, id_dado):
    """
    Atualiza os dados de um registro em uma tabela do banco de dados.

    :param tabela: Nome da tabela onde os dados serão atualizados.
    :param campo: Nome do campo a ser atualizado.
    :param novo_dados: Novo valor que será atribuído ao campo.
    :param campo_id: Nome do campo de identificação única (geralmente a chave primária).
    :param id_dado: Valor que identifica o registro a ser atualizado.
    :return: Retorna uma mensagem indicando o resultado da operação.
    """

    global cursor, conexao
    try:
        bd_conectar()
        cursor = conexao.cursor()
        atualizar_registro = f"UPDATE {tabela} SET {campo} = %s WHERE {campo_id} = %s"
        cursor.execute(atualizar_registro, (novo_dados, id_dado))
        conexao.commit()
        return "Registro atualizado com sucesso!"

    except Error as erro:
        return "Erro no banco de dados: ", erro
    finally:
        bd_desconectar()


def bd_excluir(tabela, campo, dados):
    """
    Função responsável por excluir registros de uma tabela específica no banco de dados com base no ID do usuário.
    :param campo: Nome do Campo do qual o registros irá buscar para excluir
    :param tabela: Nome da tabela da qual os registros serão excluídos.
    :param dados: ID do usuário cujos registros serão excluídos da tabela.
    :return: Retorna uma mensagem de confirmação se os registros foram excluídos com sucesso ou uma mensagem de
    erro caso ocorra um erro durante a operação.

    """

    global cursor, conexao
    try:
        if bd_conectar():
            if bd_verificar_mostrar_banco(tabela, campo, dados, 1):
                bd_conectar()
                deletar = f"DELETE FROM {tabela} WHERE {campo} = %s"
                cursor = conexao.cursor()
                cursor.execute(deletar, (dados,))
                conexao.commit()

                return 'Usuário excluído com sucesso!'
            else:
                return 'Usuário não existe!'

    except Error as erro:
        return "Erro ao excluir dados no banco de dados:", erro

    finally:
        if conexao.is_connected():
            cursor.close()
            conexao.close()


def bd_modo_fabrica():
    global cursor, conexao
    try:
        bd_conectar()

        if conexao.is_connected():
            cursor = conexao.cursor()

            cursor.execute("SET FOREIGN_KEY_CHECKS = 0")
            cursor.execute("DROP DATABASE db_algizsystem")
            cursor.execute("SET FOREIGN_KEY_CHECKS = 1")

            print('Modo Padrão de Fábrica Restaurado com Sucesso!') or bd_criar()
    except Error as erro:
        return f'Erro ao excluir o banco de dados: {erro}'
    finally:
        if conexao.is_connected():
            cursor.close()
            conexao.close()


def bd_info():
    """
    Função responsável por obter informações sobre a conexão com o banco de dados, incluindo a versão do servidor e
    o nome do banco de dados conectado.
    :return: Retorna uma mensagem que inclui informações sobre a conexão, como a versão do servidor e o nome do
    banco de dados conectado, se a conexão for bem-sucedida. Encerra a conexão com o banco de dados após
    obter as informações.
    """

    global conexao, cursor
    if bd_conectar():
        db_info = conexao.get_server_info()
        cursor = conexao.cursor()
        cursor.execute("select database();")
        nome_banco = cursor.fetchone()
        print("Conectado ao Servidor Com sucesso!" +
              "\nVersão do Servidor: " + db_info +
              "\nBanco de Dados conectado: ", 'Algiz System' if 'db_algizsystem' in nome_banco else nome_banco)

    if conexao.is_connected():
        return bd_desconectar()
