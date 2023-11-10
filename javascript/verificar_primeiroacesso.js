var { PythonShell } = require('python-shell');
    var path = require('path');

    var funcao_python = 'verificar_admin'

    var opcoes_python = {
        pythonPath: 'C:/Users/tj_an/Programação/Envs/Projeto_TCC(Em_Desenvolvimento)/Scripts/python.exe',
        scriptPath: path.join(__dirname, '../../../BackEnd/Python/Projeto_TCC/'),
        args: [funcao_python]
    }

    var buscar_admin = new PythonShell('cadastrar.py', opcoes_python)
    
    buscar_admin.on('message', function(message){
        if(message === 'True'){
            setTimeout(function() {
                window.location.href='./telas/home.html';
            }, 4000)
        }
        else {
            setTimeout(function() {
                window.location.href='./telas/primeiro_passos/cadastro_admin.html';;
            }, 4000)
        };
    });
