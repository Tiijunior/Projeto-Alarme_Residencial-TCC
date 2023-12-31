//Exibir senha
var flag_senha = 0;
var flag_conferir = 0;
var path_icon = document.getElementById('path').classList.value;
var path_icon2 = document.getElementById('path2').classList.value;
var path_check = document.getElementById('path_check').classList.value;
var path_error = document.getElementById('path_error').classList.value;
var modal_erro = document.getElementById('modal_error').classList.value;

function exibir(str) {
    var campo;
    var remover = /exibir_/g;
    campo = str.replace(remover, "");

    if (campo === "senha") {
        var campo_senha = document.getElementById(campo);
        document.getElementById(str).style.background = path_icon;
        document.getElementById(str).style.backgroundRepeat = 'no-repeat';
        document.getElementById(str).style.backgroundSize = 'cover';
        if (flag_senha === 0) {
            campo_senha.type = 'text';
            flag_senha = 1;
        } else {
            document.getElementById(str).style.background = path_icon2;
            campo_senha.type = 'password';
            flag_senha = 0;
        }
    } else {
        var campo_conferir = document.getElementById(campo);
        document.getElementById(str).style.background = path_icon;
        document.getElementById(str).style.backgroundRepeat = 'no-repeat';
        document.getElementById(str).style.backgroundSize = 'cover';
        if (flag_conferir === 0) {
            campo_conferir.type = 'text';
            flag_conferir = 1;
        } else {
            document.getElementById(str).style.background =  path_icon2;
            campo_conferir.type = 'password';
            flag_conferir = 0;
        }
    }
}


function verificarSenha(valor) {
    
    if(/\d/.test(valor)){
        var numero;
        var remover = /conf_senha/g;
        numero = valor.replace(remover, "");
        

        var campo_senha = document.getElementById('senha' + numero).value;
        var campo_verificar = document.getElementById('conf_senha' + numero).value;
        var btn_entrar = document.getElementById('btn_entrar');

        if(campo_verificar.value !== "") {
            if (campo_senha === campo_verificar) {
                document.getElementById('check' + numero).style.display = 'flex';
                document.getElementById('check'  + numero).style.background = path_check;
                document.getElementById('check' + numero).style.backgroundRepeat = 'no-repeat';
                document.getElementById('check' + numero).style.backgroundSize = 'cover';
                document.getElementById('conf_senha' + numero).style.borderColor = 'green';
                btn_entrar.disabled = false;
            } else {
                modal('As senhas não são iguais!', modal_erro, 3000);
                document.getElementById('conf_senha' + numero).style.borderColor = 'red';
                document.getElementById('check'  + numero).style.display = 'flex';
                document.getElementById('check'  + numero).style.background = path_error;
                document.getElementById('check' + numero).style.backgroundRepeat = 'no-repeat';
                document.getElementById('check' + numero).style.backgroundSize = 'cover';
                document.getElementById('senha' + numero).value = '';
                document.getElementById('conf_senha' + numero).value = '';
                btn_entrar.disabled = true;
            }
        }
    } else {
        var campo_senha = document.getElementById('senha').value;
        var campo_verificar = document.getElementById('conf_senha').value;
        var btn_entrar = document.getElementById('btn_entrar');

        if(campo_verificar.value !== "") {
            if (campo_senha === campo_verificar) {
                document.getElementById('check').style.display = 'flex';
                document.getElementById('check').style.background = path_check;
                document.getElementById('check').style.backgroundRepeat = 'no-repeat';
                document.getElementById('check').style.backgroundSize = 'cover';
                document.getElementById('conf_senha').style.borderColor = 'green';
                btn_entrar.disabled = false;
            } else {
                modal('As senhas não são iguais!', modal_erro, 3000);
                document.getElementById('conf_senha').style.borderColor = 'red';
                document.getElementById('check').style.display = 'flex';
                document.getElementById('check').style.background = path_error;
                document.getElementById('check').style.backgroundRepeat = 'no-repeat';
                document.getElementById('check').style.backgroundSize = 'cover';
                document.getElementById('senha').value = '';
                document.getElementById('conf_senha').value = '';
                btn_entrar.disabled = true;
            }
        }
    }
}


function verifcar_login() {
    var { PythonShell } = require('python-shell');
    var path_icon = require('path_icon');

    var verificador = 0;    
    var funcao_python = 'verificar_login';
    var usuario = document.querySelector('label[for="mensagemId2"]');
    var senha = document.getElementById('senha');
    

    usuario = usuario.textContent;

    var opcoes_python = {
        pythonpath_icon: 'C:/Users/tj_an/Programação/Envs/Projeto_TCC(Em_Desenvolvimento)/Scripts/python.exe',
        scriptpath_icon: path_icon.join(__dirname, '../../../.././BackEnd/Python/Projeto_TCC/'),
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
