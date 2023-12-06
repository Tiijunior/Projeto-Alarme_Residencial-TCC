from wifi import Cell
import sys
import os


def listar_wifi():
    # Obter todas as redes Wi-Fi disponíveis
    cells = Cell.all('wlan0')
    wifi_info = {}

    for cell in cells:
        wifi_info[cell.ssid] = {
            'quality': cell.quality,
            'frequency': cell.frequency,
            'encrypted': cell.encryption_type,
            'channel': cell.channel,
            'address': cell.address
        }

    return wifi_info


def desativar_wifi():
    # Desativar a interface Wi-Fi (isso requer permissões de root)
    os.system('sudo ifconfig wlan0 down')


def ssid_wifi():
    lista = listar_wifi()
    num_ssid = len(lista)
    ssid = []
    for chave, valor in lista.items():
        if num_ssid > 1:
            ssid.append(chave)
            print(f"{num_ssid},{ssid}")
        else:
            print(f"{num_ssid},{chave}")


funcoes = {
    "listar_wifi": listar_wifi,
    "desativar_wifi": desativar_wifi,
    "ssid_wifi": ssid_wifi
}


if sys.argv[1] in funcoes:
    funcao = funcoes[sys.argv[1]]
    funcao()
