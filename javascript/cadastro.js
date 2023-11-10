function cadastro() {
    var { PythonShell } = require('python-shell');
    var path = require('path');

    var funcao_python = 'primeiro_acesso'

    // Recebe os valores do Input da página Cadastro.html
    var nome = document.getElementById('nome').value
    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value
    var conf_senha = document.getElementById('conf_senha').value
    var tipo_usuario = document.getElementById('tipo_usuario').value
    var telefone = document.getElementById('telefone').value
    var tipo_telefone = document.getElementById('tipo_telefone').value
    var nome_equipamento = document.getElementById('nome_equipamento').value
    var logradouro = document.getElementById('logradouro').value
    var numero = document.getElementById('numero').value
    var cidade = document.getElementById('cidade').value
    var cep = document.getElementById('cep').value

    // Limpa os valores do Input na página Cadastro.html (apagar depois)
    document.getElementById('nome').value = ''
    document.getElementById('email').value = ''
    document.getElementById('senha').value = ''
    document.getElementById('conf_senha').value = ''
    document.getElementById('tipo_usuario').value = ''
    document.getElementById('telefone').value = ''
    document.getElementById('tipo_telefone').value = ''
    document.getElementById('nome_equipamento').value = ''
    document.getElementById('logradouro').value = ''
    document.getElementById('numero').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('cep').value = ''
    

    var opcoes_python = {
        pythonPath: 'C:/Users/tj_an/Programação/Envs/Projeto_TCC(Em_Desenvolvimento)/Scripts/python.exe',
        scriptPath: path.join(__dirname, '../../../.././BackEnd/Python/Projeto_TCC/'),
        args: [funcao_python,
               nome, 
               email, 
               senha, 
               tipo_usuario, 
               telefone, 
               tipo_telefone, 
               nome_equipamento, 
               logradouro,
               numero,
               cidade,
               cep]
    }

    var cadastro = new PythonShell('cadastrar.py', opcoes_python)

    cadastro.on('message', function (message) {
        modal_sucesso();
    });

    // Manipulação de erros
    cadastro.on('error', function (error) {
        console.error('Erro ao executar Python: ' + error);
        alert('Erro ao processar a solicitação. Verifique o console para mais informações.');
    });

    cadastro.end(function (err) {
        if (err) {
            alert('Erro ao encerrar PythonShell: ' + err);
        }
    });

}