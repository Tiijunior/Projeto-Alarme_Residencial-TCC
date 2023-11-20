import sys
import banco_de_dados as banco
import codificador_senha as cod


def verificar_admin():
    print(banco.bd_verificar_mostrar_banco('tbl_usuario', 'funcao', 'Administrador', 1))


# Cadastro Registro do Banco de Dados.
def cadastro_admin():

    # Separa o Nome do Sobrenome
    usuario_nome = (sys.argv[2].split())[0]
    usuario_sobrenome = (sys.argv[2].split())[1:]
    usuario_sobrenome = ' '.join(usuario_sobrenome)

    if banco.bd_conectar():
        # Cadastro do Usuário
        banco.tbl_usuario['id_user'] = 1
        banco.tbl_usuario['nome'] = usuario_nome
        banco.tbl_usuario['sobrenome'] = usuario_sobrenome
        banco.tbl_usuario['email'] = sys.argv[3]
        banco.tbl_usuario['senha'] = cod.codificar_senha(sys.argv[4])
        banco.tbl_usuario['funcao'] = sys.argv[5]
        banco.tbl_usuario['imagem'] = sys.argv[6]
        banco.tbl_telefone['id_user'] = banco.tbl_usuario['id_user']
        banco.tbl_telefone['numero_telefone'] = sys.argv[7]
        banco.tbl_telefone['tipo_telefone'] = sys.argv[8]

        print(banco.bd_inserir_usuario())


def buscar_admin():
    print((banco.bd_verificar_mostrar_banco('tbl_usuario', 'funcao', 'administrador', 0))[1])


def cadastrar_equipamento():
    # Cadastro do Equipamento.
    banco.tbl_equipamento['nome_equipamento'] = sys.argv[2]
    banco.tbl_equipamento['logradouro'] = sys.argv[3]
    banco.tbl_equipamento['numero'] = sys.argv[4]
    banco.tbl_equipamento['cidade'] = sys.argv[5]
    banco.tbl_equipamento['estado'] = sys.argv[6]
    banco.tbl_equipamento['cep'] = sys.argv[7]

    banco.bd_inserir_equipamento()

    # Vincula o administrador ao Equipamento.
    banco.tbl_usuario_equipamento['id_usuario'] = ((banco.bd_buscar_dados('tbl_usuario')[1])[0])[0]
    banco.tbl_usuario_equipamento['id_equipamento'] = ((banco.bd_buscar_dados('tbl_equipamento')[1])[0])[0]

    print(banco.bd_vincular_intermediaria())


def cadastrar_usuario(nome_user, sobrenome_user, email, senha, tipo_user, telefone, tipo_telefone):
    # Busca os dados do ultimo registro da tabela, para verificar qual id vai adicionar.
    id_user = 2
    indice, dados = banco.bd_buscar_dados('tbl_usuario')
    ultimo_id = (dados[indice - 1])[0] if indice > 0 else indice

    # Cadastro de Usuario
    if banco.bd_conectar():
        banco.tbl_usuario['id_user'] = id_user if ultimo_id < 2 else ultimo_id + 1      # Adiciona o id_user só se o valor de ultimo_id for menor que 2, se não adiciona o ultimo_id +1
        banco.tbl_usuario['nome'] = nome_user
        banco.tbl_usuario['sobrenome'] = sobrenome_user
        banco.tbl_usuario['email'] = email
        banco.tbl_usuario['senha'] = cod.codificar_senha(senha)
        banco.tbl_usuario['funcao'] = tipo_user
        banco.tbl_telefone['id_user'] = banco.tbl_usuario['id_user']
        banco.tbl_telefone['numero_telefone'] = telefone
        banco.tbl_telefone['tipo_telefone'] = tipo_telefone

        print(banco.bd_inserir_usuario())


def cadastrar_comodo():
    # Busca os dados do ultimo registro da tabela, para verificar qual id vai adicionar.
    id_comodo = 1
    indice, dados = banco.bd_buscar_dados('tbl_comodo')
    ultimo_id = (dados[indice - 1])[0] if indice > 0 else indice

    if banco.bd_conectar():
        banco.tbl_comodo['id_comodo'] = id_comodo if ultimo_id < 1 else ultimo_id + 1      # Adiciona o id_user só se o valor de ultimo_id for menor que 2, se não adiciona o ultimo_id +1
        banco.tbl_comodo['id_equipamento'] = sys.argv[2] if sys.argv[2] not in '' else ((banco.bd_buscar_dados('tbl_equipamento')[1])[0])[0]
        banco.tbl_comodo['nome_comodo'] = sys.argv[3]
        banco.tbl_comodo['tipo_comodo'] = sys.argv[4]
        banco.tbl_comodo['zona_comodo'] = sys.argv[5]
        banco.tbl_comodo['status_comodo'] = 0

        print(banco.bd_inserir_comodo())


def cadastrar_sensor(id_comodo, nome_sensor, tipo, porta):
    # Busca os dados do ultimo registro da tabela, para verificar qual id vai adicionar.
    indice_sensor, dados_sensor = banco.bd_buscar_dados('tbl_sensor')
    ultimo_id_sensor = (dados_sensor[indice_sensor - 1])[0] if indice_sensor > 0 else indice_sensor

    if banco.bd_conectar():
        banco.tbl_sensor['id_sensor'] = ultimo_id_sensor + 1
        banco.tbl_sensor['id_comodo'] = (banco.bd_verificar_mostrar_banco('tbl_comodo', 'nome_comodo', id_comodo, 0)[0])
        banco.tbl_sensor['nome_sensor'] = nome_sensor
        banco.tbl_sensor['tipo_sensor'] = tipo
        banco.tbl_sensor['porta_sensor'] = porta
        banco.tbl_sensor['status_sensor'] = 0

        print(banco.bd_inserir_sensor())


def cadastrar_sensores_primeiro_passos():
    id_comodo = sys.argv[3]
    nome_sensor = sys.argv[4].split(',')
    tipo_sensor = sys.argv[5].split(',')
    porta_sensor = sys.argv[6].split(',')

    for i in range(len(nome_sensor)):
        cadastrar_sensor(id_comodo, nome_sensor[i], tipo_sensor[i], porta_sensor[i])


def cadastrar_usuario_primeiro_passos():
    nome = []
    sobrenome = []
    nome_completo = sys.argv[2].split(',')
    email = sys.argv[3].split(',')
    senha = sys.argv[4].split(',')
    tipo_user = sys.argv[5].split(',')
    telefone = sys.argv[6].split(',')
    tipo_telefone = sys.argv[7].split(',')

    # Separa o Nome do Sobrenome
    for i in range(len(nome_completo)):
        nome.append(((nome_completo[i]).split())[0])
        separador = ((nome_completo[i]).split())[1:]
        sobrenome.append(' '.join(separador))

    for i in range(len(nome_completo)):
        cadastrar_usuario(nome[i], sobrenome[i], email[i], senha[i], tipo_user[i], telefone[i], tipo_telefone[i])


# Estrutura para receber comandos do Javascript
funcoes = {
    "verificar_admin": verificar_admin,
    "primeiro_acesso": cadastro_admin,
    "cadastrar_equipamento": cadastrar_equipamento,
    "cadastrar_comodo": cadastrar_comodo,
    "cadastrar_sensores_primeiro_passos": cadastrar_sensores_primeiro_passos,
    "cadastrar_usuario_primeiro_passos": cadastrar_usuario_primeiro_passos,
    "buscar_admin": buscar_admin
}

if sys.argv[1] in funcoes:
    funcao = funcoes[sys.argv[1]]
    funcao()
