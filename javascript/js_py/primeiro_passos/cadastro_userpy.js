var { PythonShell } = require('python-shell');
var path = require('path');
let path_python = localStorage.path_python;

function cadastro() {
    
    var funcao_python = 'cadastrar_usuario_primeiro_passos'

    var opcoes_python = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../../_engine/'),
        args: [funcao_python,
               gnome,
               gemail,
               gsenha,
               gfuncao,
               gtelefone,
               gtipotelefone]
    }

    var cadastro = new PythonShell('primeiro_passos.py', opcoes_python)

    cadastro.on('message', function (message) {
        console.log(message);
        if(message.includes('encerrada com sucesso')) {
            sucesso('sucesso');
        }
    });

    // Manipulação de erros
    cadastro.on('error', function (error) {
        console.error('Erro ao executar Python: ' + error);
        modal('Erro ao processar a solicitação. Verifique o console para mais informações.', '../../../modal/html/modal_error.html', 5000, '75px');
    });

    cadastro.end(function (err) {
        if (err) {
            console.log(err)
            modal('Erro ao encerrar PythonShell: ', '../../../modal/html/modal_error.html', 5000);
        }
    });
};