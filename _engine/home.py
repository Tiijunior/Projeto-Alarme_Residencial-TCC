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


funcoes = {
    "qtd_comodo": qtd_comodo,
    "lista_comodo": lista_comodo,
    "lista_sensor": lista_sensor,
    "ativar_comodo": ativar_comodo,
    "ativar_sensor": ativar_sensor
}


if sys.argv[1] in funcoes:
    funcao = funcoes[sys.argv[1]]
    funcao()
