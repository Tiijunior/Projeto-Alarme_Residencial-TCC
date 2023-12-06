var { PythonShell } = require('python-shell');
var path = require('path');
let alarme_acionado = false;

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

function verificando_alarme() {
    
    var opcoes_python = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../_engine/'),
    }

    var resultado = new PythonShell('sensores.py', opcoes_python);

    resultado.on('message', function(message) {
        if(message.includes('foi acionado') && alarme_acionado === false) {
           if(message.includes('sala')) {
            setTimeout(() => {
                alarme(message.replace(/.sala./g, ""));
                alarme_acionado = true;
            }, 30 * 1000);
           } else {
            alarme(message);
            alarme_acionado = true;
           }
        }

        setTimeout(() => {
            alarme_acionado = false;
            verificando_alarme();
        }, 60 * 1000)
        
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
