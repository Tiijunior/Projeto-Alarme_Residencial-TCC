import codificador_senha as cod
import banco_de_dados as banco
import sys


def verificar_senha():
    senha = sys.argv[2]
    senha_codificada = []

    for registro in range(banco.bd_buscar_dados('tbl_usuario')[0]):
        senha_codificada.append((banco.bd_buscar_dados('tbl_usuario')[1][registro][4]).encode())

    for elemento in range(banco.bd_buscar_dados('tbl_usuario')[0]):
        resultado_senha = cod.verificar_senha(senha, senha_codificada[elemento])

        if resultado_senha:
            print(resultado_senha)


def verificar_alarme():
    import sensores

    # Obtenção dos dados dos sensores do banco de dados
    lista_sensores_bd = banco.bd_buscar_dados('tbl_sensor')
    portas_bd = []
    zonas_bd = []

    # Preenchimento das listas de portas e zonas com base nos dados dos sensores do banco de dados
    for posicao in range(lista_sensores_bd[0]):
        if lista_sensores_bd[1][posicao][5] == 1:  # Verifica se o sensor está ativo
            portas_bd.append(f'Porta {lista_sensores_bd[1][posicao][3]}')
            if posicao == 0 or lista_sensores_bd[1][posicao - 1][1] != lista_sensores_bd[1][posicao][1]:
                zonas_bd.append(
                    banco.bd_verificar_mostrar_banco('tbl_comodo', 'id_comodo', lista_sensores_bd[1][posicao][1], 0)[4])

    # Inicialização da contagem para cada porta
    contagem = {porta: 0 for porta in portas_bd}

    # Loop principal de verificação dos sensores
    while True:
        dados_sensor = sensores.verificar_sensores(zonas_bd)
        sensor = {}
        # Processamento dos dados do sensor para criar um dicionário
        for dado in dados_sensor:
            zona_sensor, portas_sensor = dado.split(': ')
            portas_sensor = portas_sensor.strip("[]'").split(', ')
            sensor[zona_sensor] = portas_sensor

        # Verificação para cada porta em cada zona
        for zona in zonas_bd:
            zona_str = f"Zona {zona}"
            for porta_bd in portas_bd:
                porta_encontrada = False
                # Percorre toda a lista de sensores antes de acionar o alarme
                for porta_sensor in sensor.get(zona_str, []):
                    if porta_bd == porta_sensor:
                        porta_encontrada = True
                        contagem[porta_bd] = 0  # Reseta a contagem se a porta estiver presente
                        break
                if not porta_encontrada:
                    contagem[porta_bd] += 1
                    if contagem[porta_bd] >= 10:
                        # Aciona o alarme se a porta não for encontrada por 10 verificações consecutivas
                        alarme_zona = banco.bd_verificar_mostrar_banco('tbl_comodo', 'zona_comodo', zona_str.strip('Zona '), 0)
                        alarme_porta = banco.bd_buscar_dados('tbl_sensor')
                        porta = porta_bd
                        porta = porta.strip("Porta ")

                        for registro_porta in range(len(alarme_porta[1])):
                            if int(porta) == alarme_porta[1][registro_porta][3] and alarme_zona[0] == alarme_porta[1][registro_porta][1]:
                                print(f"O {alarme_porta[1][registro_porta][2]} do ambiente {alarme_zona[2]} foi acionado")
                        contagem[porta_bd] = 0  # Reseta a contagem após o alarme ser acionado


funcoes = {
    "verificar_senha": verificar_senha,
    "verificar_alarme": verificar_alarme,
}


if sys.argv[1] in funcoes:
    funcao = funcoes[sys.argv[1]]
    funcao()
