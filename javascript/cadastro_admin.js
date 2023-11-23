var imagemcarregada;
var imagem_user;
var inputs = document.querySelectorAll('.use-keyboard-input');
var ultimoInputFocado;

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
            if(ultimoInputFocado.id.includes('telefone')){
                document.getElementById('linha1').style.display = 'none';
                document.getElementById('linha3').style.display = 'none';
                setTimeout(() => {
                    document.getElementById('linha2').style.transition = '0.5s';
                    document.getElementById('linha2').style.marginTop = '-150px';
                }, 100)
            }
        }
    } else if(mover === 'descer') {
        if(ultimoInputFocado !== undefined) {
            if(ultimoInputFocado.id.includes('telefone')){
                document.getElementById('linha1').style.display = 'block';
                document.getElementById('linha3').style.display = 'block';
                document.getElementById('linha1').style.top = '241px';
                setTimeout(() => {
                    document.getElementById('linha2').style.transition = '0.5s';
                    document.getElementById('linha2').style.marginTop = '0';
                }, 100)
            }
        }
    }
};

var elementos = document.querySelectorAll('#conf_senha, #senha');

elementos.forEach(function(elemento) {
    elemento.addEventListener('focus', function() {
        if (this.id === 'conf_senha') {
            document.querySelector('.numeric').style.left = '45%';
        } else if (this.id === 'senha') {
            document.querySelector('.numeric').style.left = '60%';
        }
    });
});



// Carregar Imagem.
document.getElementById('btn_imagem').addEventListener('click', function() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        // Armazena o objeto File na variável global
        imagem_user = event.target.files[0];
        reader.onload = function() {
            var result = reader.result;
            var img = document.createElement('img');
            img.src = result;
            img.style.position = 'fixed';
            img.style.top = '490px';
            img.style.left = '52px';
            img.style.width = '150px';
            img.style.height = '150px';
            img.style.flexShrink = '0';
            img.style.borderRadius = '50%'
            var fotoDiv = document.getElementById('foto');
            fotoDiv.innerHTML = '';
            fotoDiv.appendChild(img);

            imagemcarregada = result;
        };
        reader.readAsDataURL(file);
    };
    input.click();
});

//Maskara Telefone
function telefone(event) {
    var e = event.target;
    var x = e.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
}

document.getElementById('telefone').onkeyup = telefone;

//Verificar Campos
function verificar_campos() {
    var campo_nome = document.getElementById("nome").value;
    var campo_email = document.getElementById("email").value;
    var campo_telefone = document.getElementById("telefone").value;
    var campo_tipo = document.getElementById("tipo_telefone").value;
    var campo_senha = document.getElementById("senha").value;
    var campo_conferir = document.getElementById("conf_senha").value;

    if(campo_nome === '' || campo_email === '' || campo_telefone === '' || campo_tipo === 'Tipo de Telefone' || campo_senha === '' || campo_conferir === '') {
        modal('Não pode haver campos em branco!', '../../modal/html/modal_error.html', 3000);
    }
};

function sucesso() {
    if(resposta.includes('sucesso')) {
        modal('Cadastro concluído com sucesso!', '../../modal/html/modal_sucesso.html', 4000);
        setTimeout(() => {
            window.location.replace('./primeiro_acesso.html');
        }, 5000);
    }
};