var { PythonShell } = require('python-shell');
var path = require('path');
var quantidade_comodo;
var lista_comodo = [];
var usuario = [];
var qtd_user;
let path_python = localStorage.path_python;

function mostrar_usuarios() {
    // busca quantos usuarios tem cadastrado.
    var quantidade = 'quantidade_user';
    
    var opcoes_quantidade = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../_engine/'),
        args: [quantidade]
    }
    
    var resultado_quantidade = new PythonShell('bloqueio.py', opcoes_quantidade)

    resultado_quantidade.on('message', function (message) {
        qtd_user = (message - 1);
        lista_user(qtd_user)

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

}



function buscar_qtd_comodo() {
    let funcao_python = 'qtd_comodo';
    
    let argumento_python = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../_engine/'),
        args: [funcao_python]
    }

    let lista = new PythonShell('home.py', argumento_python);

    lista.on('message', function(message) {
        quantidade_comodo = message;
    })
}

function buscar_lista_comodo() {
    let funcao_python = 'lista_comodo';
    let resultado_python = [];

    let argumento_python = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../_engine/'),
        args: [funcao_python]
    }

    let lista = new PythonShell('home.py', argumento_python);

    lista.on('message', function(message) {
        resultado_python = ((message.replace(/�/g, 'ç')).replace( /[\(\)']/g, '')).split(',');
        lista_comodo.push(resultado_python);
    })
    
}