var { PythonShell } = require('python-shell');
    var path = require('path');

    const path_windows = 'C:/Users/tj_an/Programação/Envs/Projeto_TCC(Em_Desenvolvimento)/Scripts/python.exe';
    //const path_linux = '/home/tcc/.virtualenvs/Projeto_TCC(x64)/bin/python';

    var opcoes_python = {
        //Mudar o PythonPath no linux.
        pythonPath: path_windows,
        scriptPath: path.join(__dirname, './_engine/'),
        args: ['verificar_admin']
        
    }

    var buscar_admin = new PythonShell('primeiro_passos.py', opcoes_python)
    
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

    // Manipulação de erros
    buscar_admin.on('error', function (error) {
        console.error('Erro ao executar Python: ' + error);
        modal('Erro ao processar a solicitação. Verifique o console para mais informações.', '../../../modal/html/modal_error.html', 5000, '75px');
    });

    buscar_admin.end(function (err) {
        if (err) {
            console.log(err)
            modal('Erro ao encerrar PythonShell: ', '../../../modal/html/modal_error.html', 5000);
        }
    });