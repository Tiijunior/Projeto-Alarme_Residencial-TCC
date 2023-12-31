var { PythonShell } = require('python-shell');
var path = require('path');
let path_python = localStorage.pythonPath;
var resposta = '';

function cadastro() {
    
    var funcao_python = 'primeiro_acesso'

    // Recebe os valores do Input da página Cadastro.html
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var tipo_usuario = 'administrador'
    var foto_user = imagem_user.name;
    var telefone = document.getElementById('telefone').value;
    var tipo_telefone = document.getElementById('tipo_telefone').value;


    var opcoes_python = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../../_engine/'),
        args: [funcao_python,
               nome, 
               email, 
               senha, 
               tipo_usuario,
               foto_user,
               telefone, 
               tipo_telefone]
    }

    var cadastro = new PythonShell('primeiro_passos.py', opcoes_python)

    cadastro.on('message', function (message) {
                
        if(message.includes('encerrada com sucesso')) {
            resposta = message;
            sucesso();
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