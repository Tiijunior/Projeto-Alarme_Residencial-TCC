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


funcoes = {
    "verificar_senha": verificar_senha
}


if sys.argv[1] in funcoes:
    funcao = funcoes[sys.argv[1]]
    funcao()
