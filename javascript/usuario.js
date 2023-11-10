function buscarUsuario() {
    var { PythonShell } = require('python-shell');
    var path = require('path');
    
    var elementos = 1
    var funcao_python = 'buscar_usuario'

    var opcoes_python = {
        pythonPath: 'C:/Users/tj_an/Programação/Envs/Projeto_TCC(Em_Desenvolvimento)/Scripts/python.exe',
        scriptPath: path.join(__dirname, '../../../.././BackEnd/Python/Projeto_TCC/'),
        args: [elementos, funcao_python]
    }

    var buscar_usuario = new PythonShell('home.py', opcoes_python)
    
    buscar_usuario.on('message', function(message){
        var mensagem = document.getElementById("mensagemId");
        var mensagem2 = document.getElementById("mensagemId2");
        var nova_mensagem = message;
        
        mensagem.textContent = nova_mensagem;
        mensagem2.textContent = nova_mensagem;
    });
}
