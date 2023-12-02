import subprocess

def scan_wifi():
    command = "nmcli dev wifi list"  
    networks = subprocess.run(command, shell=True, capture_output=True, text=True)
    return networks.stdout

def parse_wifi_info(info):
    lines = info.splitlines()
    wifi_data = []
    # Ignorando as duas primeiras linhas (cabeçalho)
    for line in lines[2:]:
        data = line.split()
        # Se a linha tiver todos os campos esperados
        if len(data) >= 9:
            if data[0] == '*':
                # Adicionando os dados à matriz
                use = data[0]
                bssid = data[1]
                ssid = data[2] + ' ' + data[3]
                chan = data[5]
                rate = data[6] + ' ' + data[7]
                signal = data[8]
                security = data[10] if data[10] != 'WPA1' else data[10] + ' ' + data[11]
                wifi_data.append([use, bssid, ssid, chan, rate, signal, security])
            else:
                bssid = data[0]
                ssid = data[1]
                chan = data[3]
                rate = data[4] + ' ' + data[5]
                signal = data[6]
                security = data[8] if data[8] != 'WPA1' else data[8] + ' ' + data[9]
                wifi_data.append([bssid, ssid, chan, rate, signal, security])
    return wifi_data

wifi_info = scan_wifi()
parsed_wifi_info = parse_wifi_info(wifi_info)

# print(wifi_info)

for wifi in parsed_wifi_info:
    print(wifi)
    print()
