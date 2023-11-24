var resposta;

var { PythonShell } = require('python-shell');
var path = require('path');
let path_python = localStorage.pythonPath;

function buscar_admin() {
    var funcao_python = 'buscar_admin'

    var opcoes_python = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../../_engine/'),
        args: [funcao_python]}

    var resultado = new PythonShell('primeiro_passos.py', opcoes_python)

    resultado.on('message', function (message) {
        document.getElementById('messagemId').textContent = message;
        localStorage.setItem('nome_admin', message);
    })
}

function cadastro() {
    var funcao_python = 'cadastrar_equipamento'

    // Recebe os valores do Input da página Cadastro.html
    var nome_equipamento = document.getElementById('nome_equipamento').value;
    var endereço = document.getElementById('endereco').value;
    var numero = document.getElementById('numero').value;
    var cep = document.getElementById('cep').value;
    var cidade = document.getElementById('cidade').value;
    var estados = document.getElementById('estados').value;
    

    // Limpa os valores do Input na página Cadastro.html (apagar depois)
    document.getElementById('nome_equipamento').value = ''
    document.getElementById('endereco').value = ''
    document.getElementById('numero').value = ''
    document.getElementById('cep').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estados').value = ''

    

    var opcoes_python = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../../_engine/'),
        args: [funcao_python,
               nome_equipamento, 
               endereço, 
               numero, 
               cep,
               cidade,
               estados]
    }

    var cadastro = new PythonShell('primeiro_passos.py', opcoes_python)

    cadastro.on('message', function (message) {
        
        if(message.includes('Vinculado com Sucesso')) {
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