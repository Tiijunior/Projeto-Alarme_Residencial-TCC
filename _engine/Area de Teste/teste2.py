# import banco_de_dados
# import codificador_senha
import teste_som as som
import sensores

"""
    print("\nSeja Bem Vindo ao Sistema de Segurança Algiz Security System")

    while True:
        op = menu_inicial()
        if op in opcoes:
            if op != '1' and not banco_de_dados.bd_verificar_banco('tcc', 'TCC', 'tbl_usuario', 'funcao',
                                                                   'Administrador'):
                print('Por favor, cadastre um administrador primeiro!')
                opcoes['1']()
                opcoes[op]()
            else:
                opcoes[op]()
        elif op == '0':
            break
        else:
            print('Opção inválida!')

"""

"""indice, dados = banco_de_dados.bd_buscar_dados('tbl_usuario')
ultimo_id = (dados[indice - 1])[0] if indice > 0 else indice

print(ultimo_id)


# senha = banco_de_dados.bd_buscar_dados('tbl_usuario')
# print(codificador_senha.verificar_senha('123456', str.encode(((senha[1])[0])[4])))

usuario = 'Tiago'
senha = '12345678'
usuario_banco = banco_de_dados.bd_verificar_mostrar_banco('tbl_usuario', 'nome', usuario, 0)

if codificador_senha.verificar_senha(senha, str.encode(usuario_banco[4])):
    print('Acesso Liberado!')
else:
    print('Acesso Negado!')

# print(usuario_banco)
"""
"""

# print(banco_de_dados.bd_buscar_dados('tbl_comodo'))
# print(banco_de_dados.bd_buscar_dados('tbl_sensor'))
# print(((dados_comodo[1])[i])[2])
dados_comodo = banco_de_dados.bd_buscar_dados('tbl_comodo')
dados_sensor = banco_de_dados.bd_buscar_dados('tbl_sensor')
nome_sensor = ''
porta_sensor = ''

for i in range(len(dados_comodo[1])):
    if ((dados_comodo[1])[i])[5] == 1:
        sensor = [banco_de_dados.bd_verificar_mostrar_banco('tbl_sensor', 'id_comodo', (((dados_comodo[1])[i])[0]), 0)]
        if None is not sensor[0]:
            if ((sensor[0])[5]) == 1:
                nome_sensor = (sensor[0])[2]
                porta_sensor = (sensor[0])[3]

print(nome_sensor, porta_sensor)
"""

"""
while True:
    op = input("> ")

    if op == 'A':
        som.tocar()
    else:
        som.parar()
"""
"""
if __name__ == "__main__":

    try:
        while True:
            resultado = ler_sensor(2)

            for i, resultado in enumerate(resultado):
                portas = zonas(resultado)
                if portas:
                    print(f"Zona: {i + 1}: {portas}")
                else:
                    print('Nenhuma porta ou zona ativa')
            time.sleep(1)
    except KeyboardInterrupt:
        gpio.cleanup()
"""

import sensores
import alarme

portas = []
contagem = {}
valores_anteriores = {}
ativar_alarme = False

zona = int(input('Zona: '))

while True:
    porta = input('Porta: ')

    if porta != '0':
        portas.append(f'Porta {porta}')
    else:
        break

while True:
    sensor = sensores.verificar_sensores(zona)

    for i in range(len(portas)):
        if portas[i] not in sensor:
            if portas[i] in valores_anteriores:
                contagem[portas[i]] += 1
                if contagem[portas[i]] >= 4 and str(zona) in sensor:
                    print(f"ALARME FOI ACIONADO NA Zona {zona} e {portas[i]}")
                    if contagem[portas[i]] < 4:
                        contagem[portas[i]] = 1


            else:
                contagem[portas[i]] = 1
            valores_anteriores[portas[i]] = portas[i]
        else:
            contagem[portas[i]] = 1

