var { PythonShell } = require('python-shell');
var path = require('path');
var quantidade_comodo;
var lista_comodo = [];

let path_python = localStorage.path_python;


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
        sessionStorage.setItem('quantidade_comodo', quantidade_comodo);
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
        sessionStorage.setItem('lista_comodo', JSON.stringify(lista_comodo));
    })
    
}