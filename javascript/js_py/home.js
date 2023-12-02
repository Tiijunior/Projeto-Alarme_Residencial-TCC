var { PythonShell } = require('python-shell');
var path = require('path');
var quantidade_comodo;
var lista_comodo = [];
var usuario = [];
let lista_de_sensores = [];
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

// Função para ativar o comodo

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

function ativar_bloco_comodo(id, ativar) {
    let funcao_python = 'ativar_comodo'
    let id_comodo = id.replace(/ativar_comodo/g, '');
    let ativar_bloco = ativar;

    let argumento_python = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../_engine/'),
        args: [funcao_python, id_comodo, ativar_bloco]
    }

    new PythonShell('home.py', argumento_python);

}

function ativar_sensor(id, ativar) {
    let funcao_python = 'ativar_sensor'
    let id_sensor = id.replace(/ativar_comodo/g, '');
    let ativar_sensor = ativar;

    let argumento_python = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../_engine/'),
        args: [funcao_python, id_sensor, ativar_sensor]
    }

    new PythonShell('home.py', argumento_python);
}

// busca a lista de sensores relacionado ao comodo.
function listar_de_sensores(id_comodo) {
    let sensores = 'lista_sensor';
        
    var opcoes_listasensores = {
        pythonPath: path_python,
        scriptPath: path.join(__dirname, '../_engine/'),
        args: [sensores, id_comodo]
    };
    
    var resultado_listasensores = new PythonShell('home.py', opcoes_listasensores)

    resultado_listasensores.on('message', function (message) {
        var sensor = message.replace( /[\(\)']/g, '').split(',');
        lista_de_sensores.push(sensor);
        

    });
    // Manipulação de erros
    resultado_listasensores.on('error', function (error) {
        console.error('Erro ao executar Python: ' + error);
        modal('Erro ao processar a solicitação. Verifique o console para mais informações.', '../../../modal/html/modal_error.html', 5000, '75px');
    });
    
    resultado_listasensores.end(function (err) {
        if (err) {
            console.log(err)
            modal('Erro ao encerrar PythonShell: ', '../../../modal/html/modal_error.html', 5000);
        }
    });
}