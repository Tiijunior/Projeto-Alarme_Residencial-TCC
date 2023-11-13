var imagemcarregada;

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


function editar() {
    if(document.getElementById('editar').style.background.includes('pencil')) {
        var editar = document.getElementById('editar');
        var excluir = document.getElementById('excluir');

        document.getElementById('btn_imagem').disabled = false;
        document.getElementById('nome_user').disabled = false;
        document.getElementById('email').disabled = false;
        document.getElementById('telefone').disabled = false;
        document.getElementById('tipo_telefone').disabled = false;
        document.getElementById('senha').disabled = false;
        document.getElementById('conf_senha').disabled = false;
        document.getElementById('funcao').disabled = false;

        editar.style.transition = '0.5s';
        editar.style.background = 'url(../icons/mdi_check-circle.svg)';
        editar.style.backgroundRepeat = 'no-repeat';
        editar.style.backgroundSize = 'cover';
        
        excluir.disabled = false;
        setTimeout(function() {
            excluir.style.display = 'flex';
        }, 300);
        
    } else {
        var editar = document.getElementById('editar');
        var excluir = document.getElementById('excluir');

        document.getElementById('btn_imagem').disabled = true;
        document.getElementById('nome_user').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('telefone').disabled = true;
        document.getElementById('tipo_telefone').disabled = true;
        document.getElementById('senha').disabled = true;
        document.getElementById('conf_senha').disabled = true;
        document.getElementById('funcao').disabled = true;

        editar.style.transition = '0.5s';
        editar.style.background = 'url(../icons/mdi_pencil.svg)';
        editar.style.backgroundRepeat = 'no-repeat';
        editar.style.backgroundSize = 'cover';

        excluir.disabled = true;
        excluir.style.display = 'none';
    }
}