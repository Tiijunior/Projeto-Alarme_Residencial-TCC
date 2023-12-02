# import banco_de_dados
from _engine import codificador_senha
# import teste_som as som

from _engine import banco_de_dados

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
"""
"""valor = ['', '', '']

teste = valor[2] if valor[2] not in '' else ((banco_de_dados.bd_buscar_dados('tbl_equipamento')[1])[0])[0]
print(teste)

id_sensor = 1
indice, dados = banco_de_dados.bd_buscar_dados('tbl_comodo')
ultimo_id = (dados[indice - 1])[0] if indice > 0 else indice
valor = id_sensor if ultimo_id < 1 else ultimo_id + 1

print(ultimo_id)
print(valor)

nome = "Teste,Teste 2"
separar = nome.split(",")

print(len(separar))
"""
"""
banco_de_dados.bd_verificar_mostrar_banco('tbl_usuario', 'funcao', 'administrador', 0)
print((banco_de_dados.bd_verificar_mostrar_banco('tbl_usuario', 'funcao', 'administrador', 0))[1])
"""
"""
nome = []
sobrenome = []
nome_completo = 'Matheus Andrade, Julia Andrade'.split(",")

for i in range(len(nome_completo)):
    # Separa o Nome do Sobrenome
    nome.append(((nome_completo[i]).split())[0])
    sobrenome = ((nome_completo[i]).split())[1:]
    sobrenome.append(' '.join(sobrenome))

print("Nome: " + nom" e[0], "Sobrenome: " + sobrenome[0], "\n",  "Nome: " + nome[1], "Sobrenome: " + sobrenome[1])
"""
"""
senha_codificada = banco_de_dados.bd_verificar_mostrar_banco('tbl_usuario', 'nome', 'Tiago', 0)
senha_codificada = senha_codificada[4].encode()
senha = codificador_senha.verificar_senha('123456', senha_codificada)
tipo_user = banco_de_dados.bd_verificar_mostrar_banco('tbl_usuario', 'nome', 'Tiago', 0)
print(tipo_user[5])
print(senha)
"""
sensores = []
id_comodo = 4
numero_sensores = banco_de_dados.bd_buscar_dados('tbl_sensor')[0]
dados_sensor = banco_de_dados.bd_buscar_dados('tbl_sensor')[1]

for numero in range(numero_sensores):
    if dados_sensor[numero][1] == id_comodo:
        sensores.append(banco_de_dados.bd_verificar_mostrar_banco('tbl_sensor', 'id_sensor', numero+1, 0))

for numero in range(len(sensores)):
    print(sensores[numero])
