var { PythonShell } = require('python-shell');
var path = require('path');

function senha_alarme(senha) {
    var funcao = 'verificar_senha';

    var opcoes_python = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../_engine/'),
        args: [funcao, senha]
    }

    var resultado = new PythonShell('alarme.py', opcoes_python);

    resultado.on('message', function(message) {
        if(message.includes('True')) {
            removerIframe();
        }
    });

    // Manipulação de erros
    resultado.on('error', function (error) {
        console.error('Erro ao executar Python: ' + error);
        modal('Erro ao processar a solicitação. Verifique o console para mais informações.', '../../../modal/html/modal_error.html', 5000, '75px');
    });
    
    resultado.end(function (err) {
        if (err) {
            console.log(err)
            modal('Erro ao encerrar PythonShell: ', '../../../modal/html/modal_error.html', 5000);
        }
    });
}

function verificar_alarme() {
    var funcao = 'teste';

    var opcoes_python = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../_engine/'),
        args: [funcao]
    }

    var resultado = new PythonShell('alarme.py', opcoes_python);

    resultado.on('message', function(message) {
        if(message.includes('foi acionado')) {
            console.log(message)
        }
    });

    // Manipulação de erros
    resultado.on('error', function (error) {
        console.error('Erro ao executar Python: ' + error);
        modal('Erro ao processar a solicitação. Verifique o console para mais informações.', '../../../modal/html/modal_error.html', 5000, '75px');
    });
    
    resultado.end(function (err) {
        if (err) {
            console.log(err)
            modal('Erro ao encerrar PythonShell: ', '../../../modal/html/modal_error.html', 5000);
        }
    });
}
