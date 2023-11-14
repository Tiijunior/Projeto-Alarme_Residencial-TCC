var imagemcarregada;
var modal_error = document.getElementById('modal_error').classList.value;
var modal_sucesso = document.getElementById('modal_sucesso').classList.value;

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
            var img = document.getElementById('foto_perfil');
            img.src = result;
            img.style.borderRadius = '50%';
            imagemcarregada = result;
        };
        reader.readAsDataURL(file);
    };
    input.click();
});

function salvar(){
    modal('Novo perfil foi configurado com sucesso!', modal_sucesso, 3000);
    setTimeout(function() {parent.document.getElementById('btn_home').click();}, 3500);
}