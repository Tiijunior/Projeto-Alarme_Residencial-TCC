var { PythonShell } = require('python-shell');
    var path = require('path');

    var opcoes_python = {
        //Mudar o PythonPath no linux.
        pythonPath: 'C:/Users/tj_an/Programação/Envs/Projeto_TCC(Em_Desenvolvimento)/Scripts/python.exe',
        scriptPath: path.join(__dirname, './_engine/'),
        args: ['verificar_admin']
        
    }

    var buscar_admin = new PythonShell('cadastrar.py', opcoes_python)
    
    buscar_admin.on('message', function(message){
        
        if(message === 'True'){
            setTimeout(function() {
                home()
                setTimeout(function() {
                    window.location.href='./telas/bloqueio.html';
                }, 1100)
            }, 2000)
        }
        else {
            setTimeout(function() {
                primeiro_acesso()
                setTimeout(function() {
                    window.location.href='./telas/primeiro_passos/cadastro_admin.html';
                }, 1500)
            }, 3000)
        };
    });