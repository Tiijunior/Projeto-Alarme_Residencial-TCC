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
