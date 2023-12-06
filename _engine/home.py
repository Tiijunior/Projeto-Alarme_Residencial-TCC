import sys
import banco_de_dados as banco


# Mostra a quantidade de registro de comodos cadastrados
def qtd_comodo():
    qtd = (banco.bd_buscar_dados('tbl_comodo'))[0]
    print(qtd)


# retonar os dados do comodo no registro
def lista_comodo():
    comodo = banco.bd_buscar_dados('tbl_comodo')
    qt_comodo = comodo[0]

    for num in range(qt_comodo):
        print(comodo[1][num])


def lista_sensor():
    id_comodo = sys.argv[2]
    sensores = []
    numero_sensores = banco.bd_buscar_dados('tbl_sensor')[0]
    dados_sensor = banco.bd_buscar_dados('tbl_sensor')[1]

    for numero in range(numero_sensores):
        if dados_sensor[numero][1] == int(id_comodo):
            sensores.append(banco.bd_verificar_mostrar_banco('tbl_sensor', 'id_sensor', numero + 1, 0))

    for numero in range(len(sensores)):
        print(sensores[numero])


# ativa os comodos de acordo com o front
def ativar_comodo():
    comodo_id = sys.argv[2]
    ativar = sys.argv[3]

    # Ativa o comodo recebido do sys.argv[2]
    banco.bd_atualizar_dados('tbl_comodo', 'status_comodo', ativar, 'id_comodo', comodo_id)

    # Ativando todos os sensores que pertence ao comodo
    banco.bd_atualizar_dados('tbl_sensor', 'status_sensor', ativar, 'id_comodo', comodo_id)


def ativar_sensor():
    sensor_id = sys.argv[2]
    ativar = sys.argv[3]

    # Ativando o sensor
    banco.bd_atualizar_dados('tbl_sensor', 'status_sensor', ativar, 'id_sensor', sensor_id)

    comodo_id = (banco.bd_verificar_mostrar_banco('tbl_sensor', 'id_sensor', sensor_id, 0)[1])
    if (banco.bd_verificar_mostrar_banco('tbl_comodo', 'id_comodo', 4, 0)[5]) == 0:
        banco.bd_atualizar_dados('tbl_comodo', 'status_comodo', ativar, 'id_comodo', comodo_id)


def minha_conta():
    id_usuario = sys.argv[2]
    equipamento_do_user = None
    usuario = banco.bd_verificar_mostrar_banco('tbl_usuario', 'id_user', id_usuario, 0)
    telefone = banco.bd_verificar_mostrar_banco('tbl_telefone', 'id_user', id_usuario, 0)
    if banco.bd_verificar_mostrar_banco('tbl_usuario_equipamento', 'id_usuario', id_usuario, 1):
        user_equipamento = banco.bd_verificar_mostrar_banco('tbl_usuario_equipamento', 'id_usuario', id_usuario, 0)
        equipamento_do_user = banco.bd_verificar_mostrar_banco('tbl_equipamento', 'id_equipamento', user_equipamento[1], 0)

    nome_completo = usuario[1] + " " + usuario[2] + ","
    foto_perfil = usuario[6]
    email = usuario[3]
    num_telefone = telefone[2]
    tipo_telefone = telefone[3]
    if equipamento_do_user is not None:
        id_equipamento = equipamento_do_user[0]
        nome_equipamento = equipamento_do_user[1]
        endereco = equipamento_do_user[2]
        num_equipamento = equipamento_do_user[3]
        cep = equipamento_do_user[4]
        cidade = equipamento_do_user[5]
        estado = equipamento_do_user[6]
        print(nome_completo, foto_perfil, ",", email, ",", num_telefone, ",", tipo_telefone, ",", id_equipamento, ",", nome_equipamento, ",", endereco, ",", num_equipamento, ",", cep, ",", cidade, ",", estado)

    else:
        print(nome_completo, foto_perfil, ",", email, ",", num_telefone, ",", tipo_telefone, ",", equipamento_do_user)


funcoes = {
    "qtd_comodo": qtd_comodo,
    "lista_comodo": lista_comodo,
    "lista_sensor": lista_sensor,
    "ativar_comodo": ativar_comodo,
    "ativar_sensor": ativar_sensor,
    "minha_conta": minha_conta
}


if sys.argv[1] in funcoes:
    funcao = funcoes[sys.argv[1]]
    funcao()
