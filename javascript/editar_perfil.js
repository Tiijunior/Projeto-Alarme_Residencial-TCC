var imagemcarregada;
var modal_sucesso = document.getElementById('modal_sucesso').classList.value; 
var modal_erro = document.getElementById('modal_error').classList.value;

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
    if(document.getElementById('editar').style.background.includes('check-circle')) {
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
        modal('Suas alterações foram salvas com sucesso!', modal_sucesso, 3000);
        
    } else {
        

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
    }
}

function excluir() {
    document.querySelectorAll('p')[0].style.transition = '1s';
    document.querySelectorAll('p')[1].style.transition = '1s';
    document.querySelector('label').style.transition = '1s';
    document.getElementById('foto_perfil').style.transition = '1s';
    document.getElementById('btn_imagem').style.transition = '1s';
    document.getElementById('nome_user').style.transition = '1s';
    document.getElementById('email').style.transition = '1s';
    document.getElementById('telefone').style.transition = '1s';
    document.getElementById('tipo_telefone').style.transition = '1s';
    document.getElementById('senha').style.transition = '1s';
    document.getElementById('exibir_senha').style.transition = '1s';
    document.getElementById('conf_senha').style.transition = '1s';
    document.getElementById('exibir_conf_senha').style.transition = '1s';
    document.getElementById('funcao').style.transition = '1s';

    document.querySelectorAll('p')[0].style.top = '-1000px';
    document.querySelectorAll('p')[1].style.top = '-1000px';
    document.querySelector('label').style.top = '-1000px';
    document.getElementById('foto_perfil').style.top = '-1000px';
    document.getElementById('btn_imagem').style.top = '-1000px';
    document.getElementById('nome_user').style.top = '-1000px';
    document.getElementById('email').style.top = '-1000px';
    document.getElementById('telefone').style.top = '-1000px';
    document.getElementById('tipo_telefone').style.top = '-1000px';
    document.getElementById('senha').style.top = '-1000px';
    document.getElementById('exibir_senha').style.top = '-1000px';
    document.getElementById('conf_senha').style.top = '-1000px';
    document.getElementById('exibir_conf_senha').style.top = '-1000px';
    document.getElementById('funcao').style.top = '-1000px';
    modal('Perfil removido com sucesso!', modal_sucesso, 3000);
    setTimeout(function() {parent.document.getElementById('btn_home').click();}, 3500);
}