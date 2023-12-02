var { PythonShell } = require('python-shell');
var path = require('path');


// busca a lista de sensores relacionado ao comodo.
function teste() {
    let sensores = 'teste';
        
    var opcoes_listasensores = {
        pythonPath: 'C:/Users/tj_an/Programação/Envs/Projeto_TCC(Em_Desenvolvimento)/Scripts/python.exe',
        scriptPath: path.join(__dirname, '../_engine/'),
        args: [sensores]
    };
    
    var resultado_listasensores = new PythonShell('home.py', opcoes_listasensores)

    resultado_listasensores.on('message', function (message) {
        console.log(message)
        

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