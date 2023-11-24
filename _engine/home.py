import sys
import banco_de_dados as banco


def qtd_comodo():
    qtd = (banco.bd_buscar_dados('tbl_comodo'))[0]
    print(qtd)


def lista_comodo():
    qtd = (banco.bd_buscar_dados('tbl_comodo'))[0]

    for num in range(qtd):
        print(banco.bd_buscar_dados('tbl_comodo')[1][num])


funcoes = {
    "qtd_comodo": qtd_comodo,
    "lista_comodo": lista_comodo
}


if sys.argv[1] in funcoes:
    funcao = funcoes[sys.argv[1]]
    funcao()
