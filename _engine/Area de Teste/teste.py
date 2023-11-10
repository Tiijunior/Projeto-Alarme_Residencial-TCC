"""

import sensores
import time

try:
    while True:
        resultados = sensores.ler_sensor(1)
        for i, result in enumerate(resultados):
            portas = sensores.zonas(result)
            if portas:
                print(f"Zona {i+1}: {', '.join(portas)}")
            else:
                print(f"Zona {i+1}: Nenhuma porta ativa")
        time.sleep(1)  # Leitura a cada segundo

except KeyboardInterrupt:
     GPIO.cleanup()



# Exemplo de uso
senha_original = "senha_do_usuario"
senha_codificada = codificar_senha(senha_original)

# Verificação de senha posterior
senha_inserida_pelo_usuario = "senha_inserida_pelo_usuario"
verificar_senha(senha_inserida_pelo_usuario, senha_codificada)

"""
import banco_de_dados
import metodo_teste


def caso_1():
    while True:
        cadastro = metodo_teste.menu_cadastrar()
        if cadastro == '1':
            metodo_teste.cadastrar_usuario()
        elif cadastro == '2':
            metodo_teste.cadastrar_equipamento()
        elif cadastro == '3':
            metodo_teste.adicionar_comodos()
        elif cadastro == '4':
            metodo_teste.adicionar_sensores()
        elif cadastro == '5':
            caso_4()
        elif cadastro == '0':
            caso_padrao()
        else:
            print('Opção inválida!')


def caso_2():
    while True:
        adicionar = metodo_teste.menu_vincular()
        if adicionar == '1':
            metodo_teste.vincular_usuario_equipamento()
        elif adicionar == '2':
            metodo_teste.remover_vinculo()
        elif adicionar == '3':
            metodo_teste.vincular_comodo_sensor()
        elif adicionar == '4':
            print('EM CONTRUÇÃO!')
        elif adicionar == '0':
            caso_padrao()
        else:
            print('Opção inválida!')


def caso_3():
    while True:
        ativar = metodo_teste.menu_ativar()
        if ativar == '1':
            metodo_teste.ativar_comodo()
        elif ativar == '2':
            metodo_teste.desativar_comodo()
        elif ativar == '3':
            print('EM CONTRUÇÃO!')
        elif ativar == '4':
            print('EM CONTRUÇÃO!')
        elif ativar == '0':
            caso_padrao()
        else:
            print('Opção inválida!')


def caso_4():
    opcao = metodo_teste.menu_excluir()
    if '0' < opcao <= '4':
        metodo_teste.excluir_dados(opcao)
    elif opcao == 0:
        caso_padrao()
    else:
        print('Opção inválida!')


def caso_padrao():
    while True:
        op = metodo_teste.menu_inicial()
        if op in casos:
            casos[op]()
        elif op == '0':
            exit()
        else:
            print('Opção inválida!')


# Mapeamento de casos para funções
casos = {
    '1': caso_1,
    '2': caso_2,
    '3': caso_3,
    '4': caso_4,
}

bancodedados = banco_de_dados.bd_conectar()

if bancodedados is True:
    caso_padrao()
else:
    print(bancodedados)
