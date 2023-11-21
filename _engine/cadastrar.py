import sys
import banco_de_dados as banco
import codificador_senha as cod


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


def cadastrar_usuario():
    # Separa o Nome do Sobrenome
    usuario_nome = (sys.argv[2].split())[0]
    usuario_sobrenome = (sys.argv[2].split())[1:]
    usuario_sobrenome = ' '.join(usuario_sobrenome)

    # Busca os dados do ultimo registro da tabela, para verificar qual id vai adicionar.
    id_user = 2
    indice, dados = banco.bd_buscar_dados('tbl_usuario')
    ultimo_id = (dados[indice - 1])[0] if indice > 0 else indice

    # Cadastro de Usuario
    if banco.bd_conectar():
        banco.tbl_usuario['id_user'] = id_user if ultimo_id < 2 else ultimo_id + 1      # Adiciona o id_user só se o valor de ultimo_id for menor que 2, se não adiciona o ultimo_id +1
        banco.tbl_usuario['nome'] = usuario_nome
        banco.tbl_usuario['sobrenome'] = usuario_sobrenome
        banco.tbl_usuario['email'] = sys.argv[3]
        banco.tbl_usuario['senha'] = cod.codificar_senha(sys.argv[4])
        banco.tbl_usuario['funcao'] = sys.argv[5]
        banco.tbl_telefone['id_user'] = banco.tbl_usuario['id_user']
        banco.tbl_telefone['numero_telefone'] = sys.argv[6]
        banco.tbl_telefone['tipo_telefone'] = sys.argv[7]

        banco.bd_inserir_usuario()


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


def cadastrar_sensor():
    # Busca os dados do ultimo registro da tabela, para verificar qual id vai adicionar.
    indice_sensor, dados_sensor = banco.bd_buscar_dados('tbl_sensor')
    ultimo_id_sensor = (dados_sensor[indice_sensor - 1])[0] if indice_sensor > 0 else indice_sensor

    indice, dados = banco.bd_buscar_dados('tbl_comodo')
    ultimo_id = (dados[indice - 1])[0] if indice > 0 else indice

    if banco.bd_conectar():
        banco.tbl_sensor['id_sensor'] = sys.argv[2] if sys.argv[2] not in '' else (ultimo_id_sensor + 1)
        teste = sys.argv[2] if sys.argv[2] not in '' else (ultimo_id_sensor + 1)
        banco.tbl_sensor['id_comodo'] = sys.argv[3] if sys.argv[3] not in '' else ultimo_id
        banco.tbl_sensor['nome_sensor'] = sys.argv[4]
        banco.tbl_sensor['tipo_sensor'] = sys.argv[5]
        banco.tbl_sensor['porta_sensor'] = sys.argv[6]
        banco.tbl_sensor['status_sensor'] = 0

        banco.bd_inserir_sensor()
        # print(banco.bd_inserir_sensor())
        print(teste)


# Alterar Registro do Banco de Dados.


# Excluir Registro do Banco de Dados.

def excluir_usuario():
    banco.bd_excluir('tbl_usuario', 'id_user', sys.argv[2])


def excluir_comodo():
    banco.bd_excluir('tbl_comodo', 'id_comodo', sys.argv[2])


def excluir_sensor():
    banco.bd_excluir('tbl_sensor', 'id_sensor', sys.argv[2])


# Modo Padrão de Fábrica


def modo_padraofabrica():
    banco.bd_modo_fabrica()


# Estrutura para receber comandos do Javascript

funcoes = {
    "cadastrar_equipamento": cadastrar_equipamento,
    "cadastrar_usuario": cadastrar_usuario,
    "cadastrar_comodo": cadastrar_comodo,
    "cadastrar_sensor": cadastrar_sensor,
    "excluir_usuario": excluir_usuario,
    "excluir_comodo": excluir_comodo,
    "excluir_sensor": excluir_sensor
}

if sys.argv[1] in funcoes:
    funcao = funcoes[sys.argv[1]]
    funcao()
