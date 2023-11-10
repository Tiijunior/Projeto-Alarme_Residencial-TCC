import sys
import banco_de_dados as banco
import codificador_senha as cod


def buscar_usuario(elemento):
    usuario = ((banco.bd_buscar_dados('tbl_usuario')[1])[elemento])[1]
    print(usuario)


def buscar_comodo():
    print('Em Construção')


def buscar_sensor():
    print('Em Construção')


def verificar_login(verificador):
    usuario = sys.argv[3]
    senha = sys.argv[4]
    dado_banco = banco.bd_verificar_mostrar_banco('tbl_usuario', 'nome', usuario, verificador)

    if cod.verificar_senha(senha, str.encode(dado_banco[4])):
        print('Acesso Liberado!')
    else:
        print('Acesso Negado!')


def verificar_sensor():
    banco.bd_verificar_mostrar_banco('tbl_comodo', 'status_comodo', 'True', 0)
    print('EM CONTRUÇÂO')


funcoes = {
    "buscar_usuario": buscar_usuario,
    "buscar_comodo": buscar_comodo,
    "buscar_sensor": buscar_sensor,
    "verificar_login": verificar_login
}


for i in range(len(sys.argv[1])):
    if sys.argv[2] in funcoes:
        funcao = funcoes[sys.argv[2]]
        funcao(i)
