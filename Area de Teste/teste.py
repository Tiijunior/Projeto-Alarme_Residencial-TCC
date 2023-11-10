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


"""
WIFI
import NetworkManager

for dev in NetworkManager.NetworkManager.GetDevices():
    if dev.DeviceType != NetworkManager.NM_DEVICE_TYPE_WIFI:
        continue
    aps = [ap for ap in dev.SpecificDevice().GetAccessPoints()]
    for ap in sorted(aps, key=lambda ap: ap.Ssid):
        print("%s:: %s" % (ap.Ssid, ap.Strength))
