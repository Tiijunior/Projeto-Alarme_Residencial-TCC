from wifi import Cell
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
