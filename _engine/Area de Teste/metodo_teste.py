from mysql.connector import Error
import banco_de_dados
import codificador_senha


def cadastrar_usuario():
    id_user = 1
    indice, dados = banco_de_dados.bd_buscar_dados('tbl_usuario')
    ultimo_id = 0 if indice == 0 else (dados[indice - 1][0])

    if banco_de_dados.bd_conectar():
        banco_de_dados.tbl_usuario['id_user'] = id_user if ultimo_id < 1 else ultimo_id + 1
        nome = input('Nome completo: ').split()
        banco_de_dados.tbl_usuario['nome'] = nome[0]
        banco_de_dados.tbl_usuario['sobrenome'] = ' '.join(nome[1:])
        banco_de_dados.tbl_usuario['email'] = input('Email: ')
        banco_de_dados.tbl_usuario['senha'] = codificador_senha.codificar_senha(input('Senha: '))

        nivel = {
            '1': 'Administrador',
            '2': 'Comum'
        }

        while True:
            op = input('Escolha o nivel: '
                       '\n1 - Administrador'
                       '\n2 - Usuário Comum'
                       '\n> ')
            if op in nivel:
                banco_de_dados.tbl_usuario['funcao'] = nivel[op]
                break
            else:
                print('Opção inválida!')

        banco_de_dados.tbl_telefone['id_user'] = banco_de_dados.tbl_usuario['id_user']
        banco_de_dados.tbl_telefone['numero_telefone'] = input('Número de Telefone: ')

        tipo = {
            '1': 'Fixo',
            '2': 'Celular'
        }

        while True:
            celular = input('Escolha o Tipo de Telefone: '
                            '\n1 - Fixo'
                            '\n2 - Celular'
                            '\n> ')
            if op in nivel:
                banco_de_dados.tbl_telefone['tipo_telefone'] = tipo[celular]
                break
            else:
                print('Opção inválida!')

        print(banco_de_dados.bd_inserir_usuario())


def cadastrar_equipamento():
    if banco_de_dados.bd_conectar():
        banco_de_dados.tbl_equipamento['nome_equipamento'] = input('Digite o Nome do Equipamento: ')
        banco_de_dados.tbl_equipamento['logradouro'] = input('logradouro: ')
        banco_de_dados.tbl_equipamento['numero'] = input('Numero: ')
        banco_de_dados.tbl_equipamento['cidade'] = input('Cidade: ')
        banco_de_dados.tbl_equipamento['cep'] = input('CEP: ')

        print(banco_de_dados.bd_inserir_equipamento())


def adicionar_comodos():
    try:
        if banco_de_dados.bd_conectar():
            if banco_de_dados.bd_verificar_mostrar_banco('tbl_equipamento', 'id_equipamento', '1', 1) is True:
                banco_de_dados.tbl_comodo['id_equipamento'] = '1' \
                    if banco_de_dados.bd_verificar_mostrar_banco('tbl_equipamento', 'id_user',
                                                         '1', 1) != '1' else print(
                    'Adicione primeiro um equipamento') or cadastrar_equipamento()
                banco_de_dados.tbl_comodo['nome_comodo'] = input('Nome do Cômodo: ')
                banco_de_dados.tbl_comodo['zona_comodo'] = input('Define a Zona do Cômodo: ')
                while True:
                    res = input('Recomenda-se nessa etapa deixar desligado.'
                                '\nDeseja Ligar o Cômodo?'
                                '\n1 - SIM'
                                '\n2 - Não'
                                '\n> ')
                    if res == '1':
                        banco_de_dados.tbl_comodo['status_comodo'] = 1
                        break
                    elif res == '2':
                        banco_de_dados.tbl_comodo['status_comodo'] = 0
                        break
                    else:
                        print('Opção Invalida!')

                print(banco_de_dados.bd_inserir_comodo())
            else:
                print(
                    'Não é possivel cadastrar um Cômodo sem preencher o cadastro de equipamento.') or cadastrar_equipamento()

    except Error as error:
        return f'Erro ao se conectar ao banco de dados: {error}'


def adicionar_sensores():
    try:
        id_sensor = 1
        verificar_num = 1
        if banco_de_dados.bd_conectar():
            if banco_de_dados.bd_verificar_mostrar_banco('tbl_comodo', 'id_comodo', verificar_num, 1) is True:
                banco_de_dados.tbl_sensor['id_sensor'] = id_sensor \
                    if not banco_de_dados.bd_verificar_mostrar_banco('tbl_sensor', 'id_sensor',
                                                                     id_sensor, 1) else (id_sensor + 1)
                banco_de_dados.tbl_sensor['nome_sensor'] = input('Nome do Sensor: ')

                portas = {
                    '1': 1,
                    '2': 2,
                    '3': 4,
                    '4': 8,
                    '5': 16
                }

                while True:
                    porta = input('Escolha a porta: '
                                  '\n1 - Porta 1'
                                  '\n2 - Porta 2'
                                  '\n3 - Porta 3'
                                  '\n4 - Porta 4'
                                  '\n5 - Porta 5'
                                  '\n> ')
                    if porta in portas:
                        banco_de_dados.tbl_sensor['porta_sensor'] = portas[porta]
                        break
                    else:
                        print('Opção inválida!')

                while True:
                    res = input('Recomenda-se nessa etapa deixar desligado.'
                                '\nDeseja Ligar o Sensor?'
                                '\n1 - SIM'
                                '\n2 - Não'
                                '\n> ')
                    if res == '1':
                        banco_de_dados.tbl_sensor['status_sensor'] = 1
                        break
                    elif res == '2':
                        banco_de_dados.tbl_sensor['status_sensor'] = 0
                        break
                    else:
                        print('Opção Invalida!')

                print(banco_de_dados.bd_inserir_sensor())
            else:
                verificar_num += 1

    except Error as error:
        return f'Erro ao se conectar ao banco de dados: {error}'


def excluir_dados(opcao):
    if banco_de_dados.bd_conectar():
        if opcao == '1':
            nome_usuario = input('Digite o Nome do Usuário: ')
            nome = nome_usuario.split()

            banco_de_dados.bd_excluir('tbl_usuario', 'nome', nome[0])

        elif opcao == '2':
            nome_comodo = input('Digite o Nome do Cômodo: ')
            banco_de_dados.bd_excluir('tbl_comodo', 'nome_comodo', nome_comodo)

        elif opcao == '3':
            nome_sensor = input('Digite o Nome do Sensor: ')
            banco_de_dados.bd_excluir('tbl_sensor', 'nome_sensor', nome_sensor)

        elif opcao == '4':
            banco_de_dados.bd_modo_fabrica()

        else:
            print('Opção Invalida!')


def vincular_usuario_equipamento():
    if banco_de_dados.bd_conectar():
        dado_usuario = banco_de_dados.bd_buscar_dados('tbl_usuario')
        dado_equipamento = banco_de_dados.bd_buscar_dados('tbl_equipamento')
        print('Escolha o Usuário que deseja vincular ao Equipamento!')
        for i in range(dado_usuario[0]):
            print(f'{i + 1}', ((dado_usuario[1])[i])[1])
        opcao = int(input('> '))

        banco_de_dados.tbl_usuario_equipamento['id_usuario'] = ((dado_usuario[1])[opcao-1])[0]

        print('Escolha o Equipamento ao qual será vinculado!')
        for i in range(dado_equipamento[0]):
            print(f'{i+1}', ((dado_equipamento[1])[i])[1])
        opcao = int(input('> '))

        banco_de_dados.tbl_usuario_equipamento['id_equipamento'] = ((dado_equipamento[1])[opcao-1][0])

        print(banco_de_dados.bd_vincular_intermediaria())


def remover_vinculo():
    if banco_de_dados.bd_conectar():
        print('Escolha o numero do usuario que deseja desvincular:')
        dados_intermediaria = banco_de_dados.bd_buscar_dados('tbl_usuario_equipamento')
        for registro in range(dados_intermediaria[0]):
            dado_usuario = banco_de_dados.bd_verificar_mostrar_banco('tbl_usuario', 'id_user', ((dados_intermediaria[1])[registro])[0], 0)
            print(dado_usuario[0], dado_usuario[1])
        opcao_usuario = input('> ')

        print('Escolha o numero de qual Equipamento deseja remover o vinculo')
        for registro in range(dados_intermediaria[0]):
            dado_equipamento = banco_de_dados.bd_verificar_mostrar_banco('tbl_equipamento', 'id_equipamento', ((dados_intermediaria[1])[registro])[1], 0)

            if ((dados_intermediaria[1])[registro])[1] == ((dados_intermediaria[1])[registro+1])[1]:
                print(dado_equipamento[0], dado_equipamento[1])
                break
            else:
                print(dado_equipamento[0], dado_equipamento[1])
        opcao_equipamento = input('> ')

        print(banco_de_dados.bd_remover_intermediaria(opcao_usuario, opcao_equipamento))


def vincular_comodo_sensor():
    if banco_de_dados.bd_conectar():
        dados_comodo = banco_de_dados.bd_buscar_dados('tbl_comodo')
        dados_sensor = banco_de_dados.bd_buscar_dados('tbl_sensor')

        print('Escolha o comodo:')
        for registro in range(dados_comodo[0]):
            print(registro + 1, ((dados_comodo[1])[registro])[2])
        opcao_comodo = int(input('> '))

        for registro in range(dados_sensor[0]):
            print(registro + 1, ((dados_sensor[1])[registro])[2])
        opcao_sensor = int(input('> '))

        print(banco_de_dados.bd_atualizar_dados('tbl_sensor', 'id_comodo', opcao_comodo, 'id_sensor', opcao_sensor))


def ativar_comodo():
    comodos = banco_de_dados.bd_buscar_dados('tbl_comodo')
    cont = 0
    print("Escolha o Comodo que deseja Ativar: ",
          '\n  Nome do Comodo   Tipo do Comodo')
    for lista_comodo in range(len(comodos[1])):
        if ((comodos[1])[lista_comodo])[5] == 0:
            cont += 1
            print((lista_comodo + 1), '    ' + ((comodos[1])[lista_comodo])[2],
                  '       ' + ((comodos[1])[lista_comodo])[3])

    if cont > 0:
        opcao = int(input('> '))
        banco_de_dados.bd_atualizar_dados('tbl_comodo', 'status_comodo', 1, 'id_comodo', opcao)

        for listar_sensor in (banco_de_dados.bd_buscar_dados('tbl_sensor'))[1]:
            if opcao is listar_sensor[1]:
                banco_de_dados.bd_atualizar_dados('tbl_sensor', 'status_sensor', 1, 'id_comodo', listar_sensor[1])

    else:
        print('Todos os sensores já estão ativados.')


def desativar_comodo():
    comodos = banco_de_dados.bd_buscar_dados('tbl_comodo')
    cont = 0
    print("Escolha o Comodo que deseja Ativar: ",
          '\n  Nome do Comodo   Tipo do Comodo')
    for lista_comodo in range(len(comodos[1])):
        if ((comodos[1])[lista_comodo])[5] == 1:
            cont += 1
            print((lista_comodo + 1), '    ' + ((comodos[1])[lista_comodo])[2],
                  '       ' + ((comodos[1])[lista_comodo])[3])

    if cont > 0:
        opcao = int(input('> '))
        banco_de_dados.bd_atualizar_dados('tbl_comodo', 'status_comodo', 0, 'id_comodo', opcao)

        for listar_sensor in (banco_de_dados.bd_buscar_dados('tbl_sensor'))[1]:
            if opcao is listar_sensor[1]:
                banco_de_dados.bd_atualizar_dados('tbl_sensor', 'status_sensor', 0, 'id_comodo', listar_sensor[1])

    else:
        print('Todos os sensores já estão desativaos.')


def menu_inicial():
    op = input('Digite a opção que deseja realizar!'
               '\n1 - Cadastrar'
               '\n2 - Associar'
               '\n3 - Ativar/Desativar Alarme'
               '\n0 - Sair' + '\n> ')
    return op


def menu_cadastrar():
    op = input('Digite a opção que deseja realizar!'
               '\n1 - Cadastrar Usuário'
               '\n2 - Cadastrar Equipamento'
               '\n3 - Adicionar Cômodos'
               '\n4 - Adicionar Sensores'
               '\n5 - Excluir'
               '\n0 - Voltar' + '\n> ')
    return op


def menu_vincular():
    op = input('Digite a opção que deseja realizar!'
               '\n1 - Vincular Usuário ao Equipamento'
               '\n2 - Remover Usuário do Equipamento'
               '\n3 - Vincular Sensores ao Cômodo'
               '\n4 - Remover Sensores do Cômodo'
               '\n0 - Voltar' + '\n> ')
    return op


def menu_ativar():
    op = input('Digite a opção que deseja realizar!'
               '\n1 - Ativar Cômodo'
               '\n2 - Desativar Cômodo'
               '\n3 - Ativar Sensores'
               '\n4 - Desativar Sensores'
               '\n0 - Voltar' + '\n> ')
    return op


def menu_excluir():
    while True:
        opcao = input('Digite uma das opções abaixo.'
                      '\n1 - Excluir Usuário'
                      '\n2 - Excluir Cômodo'
                      '\n3 - Excluir Sensor'
                      '\n4 - Modo Padrão de Fábrica'
                      '\n0 - Voltar'
                      '\n> ')
        return opcao
