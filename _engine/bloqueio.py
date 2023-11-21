import sys
import banco_de_dados as banco
import codificador_senha as cod


def quantidade_user():
    print((banco.bd_buscar_dados('tbl_usuario'))[0])


def lista_users():
    dados_user = banco.bd_buscar_dados('tbl_usuario')[1]
    lista_usuario = []

    for usuario in dados_user:
        # Cria uma nova lista com os dados relevantes do usuário
        usuario_info = [usuario[0], usuario[1], usuario[5], usuario[6]]
        # Adiciona a lista de informações do usuário à lista de usuários
        lista_usuario.append(usuario_info)

    # Imprime cada usuário em uma nova linha
    for usuario in lista_usuario:
        print(', '.join(str(info) for info in usuario))


def verificar_senha():
    usuario = (sys.argv[2]).replace(" ", '')
    senha = sys.argv[3]

    if usuario == 'Tiago' and senha == '123':
        print('true ')
    else:
        print('false ')


funcoes = {
    "quantidade_user": quantidade_user,
    "lista_users": lista_users,
    "verificar_senha": verificar_senha
}

if sys.argv[1] in funcoes:
    funcao = funcoes[sys.argv[1]]
    funcao()
