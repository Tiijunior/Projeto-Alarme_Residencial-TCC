var { PythonShell } = require('python-shell');
var path = require('path');
var usuario = [];
let path_python = localStorage.path_python;

function mostrar_usuarios() {
    // busca quantos usuarios tem cadastrado.
    var quantidade = 'quantidade_user';
    var qtd_user;

    var opcoes_quantidade = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../_engine/'),
        args: [quantidade]
    }
    
    var resultado_quantidade = new PythonShell('bloqueio.py', opcoes_quantidade)

    resultado_quantidade.on('message', function (message) {
        qtd_user = (message - 1);
        localStorage.setItem('qtd_user', qtd_user);
        lista_user(message - 1);
    });
    // Manipulação de erros
    resultado_quantidade.on('error', function (error) {
        console.error('Erro ao executar Python: ' + error);
        modal('Erro ao processar a solicitação. Verifique o console para mais informações.', '../../../modal/html/modal_error.html', 5000, '75px');
    });
    
    resultado_quantidade.end(function (err) {
        if (err) {
            console.log(err)
            modal('Erro ao encerrar PythonShell: ', '../../../modal/html/modal_error.html', 5000);
        }
    });



    // Busca o nome do administrador.
    
    var administrador = 'lista_users';
    var user;
    
    var opcoes_administrador = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../_engine/'),
        args: [administrador]
    }
    
    var resultado_usuarios = new PythonShell('bloqueio.py', opcoes_administrador)
    
    resultado_usuarios.on('message', function (lista_users) {
        user = lista_users.split(',');
        usuario.push(user)
        localStorage.setItem('usuario', usuario);
    });

    // Manipulação de erros
    resultado_usuarios.on('error', function (error) {
        console.error('Erro ao executar Python: ' + error);
        modal('Erro ao processar a solicitação. Verifique o console para mais informações.', '../../../modal/html/modal_error.html', 5000, '75px');
    });
    
    resultado_usuarios.end(function (err) {
        if (err) {
            console.log(err)
            modal('Erro ao encerrar PythonShell: ', '../../../modal/html/modal_error.html', 2000);
        }
    });

    setTimeout(() => {
        usuarios()
    }, 1000);
}

function verificar_user(nome, senha) {
    var usuario = 'verificar_senha';
    
    var opcoes_verificar = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../_engine/'),
        args: [usuario, nome, senha]
    }

    var resultado_user = new PythonShell('bloqueio.py', opcoes_verificar)

    resultado_user.on('message', function(message) {
        verificado = message.split(',');
    });
    
}