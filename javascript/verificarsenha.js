
//Exibir senha
var flag_senha = 0;
var flag_conferir = 0;

function exibir(str) {
    var campo;
    var remover = /exibir_/g;
    campo = str.replace(remover, "");

    if (campo === "senha") {
        var campo_senha = document.getElementById(campo);
        if (flag_senha === 0) {
            campo_senha.type = 'text';
            flag_senha = 1;
        } else {
            campo_senha.type = 'password';
            flag_senha = 0;
        }
    } else {
        var campo_conferir = document.getElementById(campo);
        if (flag_conferir === 0) {
            campo_conferir.type = 'text';
            flag_conferir = 1;
        } else {
            campo_conferir.type = 'password';
            flag_conferir = 0;
        }
    }
}


function verificarSenha() {
    var campo_senha = document.getElementById('senha').value;
    var campo_verificar = document.getElementById('conf_senha').value;
    var btn_entrar = document.getElementById('btn_entrar');

    if(campo_verificar.value !== "") {
        if (campo_senha === campo_verificar) {
            document.getElementById('conf_senha').style.borderColor = 'green';
            document.getElementById('error').style.display = 'none';
            document.getElementById('check').style.display = 'flex';
            btn_entrar.disabled = false;
        } else {
            modal('As senhas não são iguais!', '../../modal/html/modal_error.html', 3000);
            document.getElementById('conf_senha').style.borderColor = 'red';
            document.getElementById('check').style.display = 'none';
            document.getElementById('error').style.display = 'flex';
            document.getElementById('senha').value = '';
            document.getElementById('conf_senha').value = '';
            btn_entrar.disabled = true;
        }
    }

    
}


function verifcar_login() {
    var { PythonShell } = require('python-shell');
    var path = require('path');

    var verificador = 0;    
    var funcao_python = 'verificar_login';
    var usuario = document.querySelector('label[for="mensagemId2"]');
    var senha = document.getElementById('senha');
    

    usuario = usuario.textContent;

    var opcoes_python = {
        pythonPath: 'C:/Users/tj_an/Programação/Envs/Projeto_TCC(Em_Desenvolvimento)/Scripts/python.exe',
        scriptPath: path.join(__dirname, '../../../.././BackEnd/Python/Projeto_TCC/'),
        args: [verificador, funcao_python, usuario, senha.value]
    }

    var buscar_usuario = new PythonShell('home.py', opcoes_python)
    
    buscar_usuario.on('message', function(message){
        if (message === 'Acesso Liberado!'){
            desbloquear();
        }
        else{
            alert(message);
            document.getElementById('senha').value = '';
        }
    });
}
