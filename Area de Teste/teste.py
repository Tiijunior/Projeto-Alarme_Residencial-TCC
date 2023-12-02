print('teste ok')

"""
Processo Javascript para chamar o python, nesse script ele faz o teste

    <script>
        function teste() {
            var { PythonShell } = require('python-shell');
            var path = require('path');

            var opcao = {
                pythonPath: 'C:/Users/tj_an/Programação/Envs/Projeto_TCC(Em_Desenvolvimento)/Scripts/python.exe',
                scriptPath: path.join(__dirname, '../../../.././BackEnd/Python/Projeto_TCC/'),
                args: []
            }

            var teste = new PythonShell('home.py', opcao);

            teste.on('message', function(message) {
                alert(message)
            })
        }
    </script>



# WIFI
import subprocess

def scan_wifi():
    command = "nmcli dev wifi list"  # Comando para listar redes Wi-Fi (pode variar de acordo com o sistema)
    networks = subprocess.run(command, shell=True, capture_output=True, text=True)
    return networks.stdout

wifi_info = scan_wifi()
print(wifi_info)
"""
import wifi


def scan():
    cells = wifi.Cell.all('wlan0')
    matrix = []
    for cell in cells:
        matrix.append([cell.ssid, cell.signal, cell.quality, cell.frequency, cell.bitrates])
    return matrix


def print_matrix(matrix):
    for row in matrix:
        print(row)


wifi_list = scan()
print_matrix(wifi_list)
