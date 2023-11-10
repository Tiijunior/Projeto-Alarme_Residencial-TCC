
// Carregar Imagem
document.getElementById('btn_imagem').addEventListener('click', function() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
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
function verificar_campos(frase) {
    var campo_nome = document.getElementById("nome").value;
    var campo_email = document.getElementById("email").value;
    var campo_telefone = document.getElementById("telefone").value;
    var campo_tipo = document.getElementById("tipo_telefone").value;
    var campo_senha = document.getElementById("senha").value;
    var campo_conferir = document.getElementById("conf_senha").value;

    if(campo_nome === '' || campo_email === '' || campo_telefone === '' || (campo_tipo !== "Celular" && campo_tipo !== "Fixo") || campo_senha === '' || campo_conferir === '') {
        modal('Não pode haver campos em branco!', '../../modal/html/modal_error.html', 3000);
    }
    else {
        modal(frase, '../../modal/html/modal_sucesso.html', 5000);
        setTimeout(function() {
            window.location.replace('./primeiro_acesso.html');
        }, 1000);
    }
}
