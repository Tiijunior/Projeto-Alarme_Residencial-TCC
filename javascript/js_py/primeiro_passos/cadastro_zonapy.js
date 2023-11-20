var { PythonShell } = require('python-shell');
var path = require('path');

function cadastro_comodo(comodo, mensagem) {
    
    if(comodo) {
        var nome_ambiente = document.getElementById('nome_zona').value;
        var ambiente = document.getElementById('tipo_comodo').value;
        var zona = document.getElementById('zona').value;

        var funcao = 'cadastrar_comodo';

        var opcoes_python_comodo = {
            pythonPath: 'C:/Users/tj_an/Programação/Envs/Projeto_TCC(Em_Desenvolvimento)/Scripts/python.exe',
            scriptPath: path.join(__dirname, '../../../_engine/'),
            args: [funcao,
                   '',
                   nome_ambiente,
                   ambiente,
                   zona]
        };

        var cadastro = new PythonShell('primeiro_passos.py', opcoes_python_comodo);

        cadastro.on('message', function (message) {
            if(mensagem) {
                sucesso('sucesso_comodo');
            }
        });
    };
};


function cadastro_sensor(sensor) {
    if(sensor) {
        var nome_ambiente = document.getElementById('nome_zona').value;
        var funcao = 'cadastrar_sensores_primeiro_passos';

        var opcoes_python_comodo = {
            pythonPath: 'C:/Users/tj_an/Programação/Envs/Projeto_TCC(Em_Desenvolvimento)/Scripts/python.exe',
            scriptPath: path.join(__dirname, '../../../_engine/'),
            args: [funcao,
                   '',
                   nome_ambiente,
                   gnome_sensor,
                   gtipo_sensor,
                   gporta_sensor]
        };

        var cadastro = new PythonShell('primeiro_passos.py', opcoes_python_comodo);
        cadastro.on('message', function (message) {
            console.log(message);
            if(message.includes('sucesso')) {
                sucesso('sucesso_sensor');
            }
        });
    }
}