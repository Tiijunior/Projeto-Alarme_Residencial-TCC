var nome_admin;
var ultimoInputFocado;
var inputs = document.querySelectorAll('.use-keyboard-input');

// Armazena qual é o ultimo input que entrou em focus.
inputs.forEach(function(input) {
    input.addEventListener('focus', function() {
        ultimoInputFocado = this;
    });
});

// Move o input para cima, facilitando para digitar.
function moverInputs(mover) {
    if(mover === 'subir'){
        if(ultimoInputFocado !== undefined) {
            if(ultimoInputFocado.id.includes('cep') || ultimoInputFocado.id.includes('cidade')){
                document.getElementById('cep').style.transition = '0.5s';
                document.getElementById('cidade').style.transition = '0.5s';
                document.getElementById('estados').style.transition = '0.5s';
                document.getElementById('cep').style.top = '272px';
                document.getElementById('cidade').style.top = '272px';
                document.getElementById('estados').style.top = '272px';
                
                setTimeout(() => {
                    document.getElementById('linha1').style.display = 'none';
                }, 100)
            }
        }
    } else if(mover === 'descer') {
        if(ultimoInputFocado !== undefined) {
            if(ultimoInputFocado.id.includes('cep') || ultimoInputFocado.id.includes('cidade')){
                document.getElementById('linha1').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('cep').style.transition = '0.5s';
                    document.getElementById('cidade').style.transition = '0.5s';
                    document.getElementById('estados').style.transition = '0.5s';
                    document.getElementById('cep').style.top = '362px';
                    document.getElementById('cidade').style.top = '362px';
                    document.getElementById('estados').style.top = '362px';
                }, 100)
            }
        }
    }
};


function proximo() {
    if (document.getElementById('endereco').value === '') {
        modal('Não pode haver campos em branco!', '../../modal/html/modal_error.html', 3000);
    } else {
        cadastro();
    }
};

function sucesso() {
    if(resposta.includes('Sucesso')) {
        modal('Cadastro concluído com sucesso!', '../../modal/html/modal_sucesso.html', 4000);
        setTimeout(() => {
            window.location.replace('./cadastro_zona.html');
        }, 5000);
    }
};
