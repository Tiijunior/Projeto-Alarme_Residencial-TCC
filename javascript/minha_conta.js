var imagemcarregada;
var modal_sucesso = document.getElementById('modal_sucesso').classList.value; 
var modal_erro = document.getElementById('modal_error').classList.value;
var minha_conta_dados = sessionStorage.dados_usuario.split(',');

// Carrega dados
function carregar_dados() {
    if(!minha_conta_dados[5].includes('None')) {
        document.getElementById('nome_user').value = minha_conta_dados[0];
        img_perfil = document.getElementById('foto_perfil');
        document.getElementById('email').value = minha_conta_dados[2];
        document.getElementById('telefone').value = minha_conta_dados[3];
        document.getElementById('tipo_telefone').value = minha_conta_dados[4].replace(/ /g, '');
        document.getElementById('equipamento').value = minha_conta_dados[6];
        document.getElementById('endereco').value = minha_conta_dados[7];
        document.getElementById('numero').value = minha_conta_dados[8];
        document.getElementById('cep').value = minha_conta_dados[9];
        document.getElementById('cidade').value = minha_conta_dados[10];
        document.getElementById('estados').value = minha_conta_dados[11].replace(/ /g, '');
    } else {
        document.getElementById('nome_user').value = minha_conta_dados[0];
        img_perfil = document.getElementById('foto_perfil');
        document.getElementById('email').value = minha_conta_dados[2];
        document.getElementById('telefone').value = minha_conta_dados[3];
        document.getElementById('tipo_telefone').value = minha_conta_dados[4].replace(/ /g, '');
    }

    if(!minha_conta_dados[1].includes('vazio')){
        img_perfil.style.background = 'url(../foto/'+ (minha_conta_dados[1]).replace(/ /g, '') +')';
        img_perfil.style.backgroundRepeat = 'no-repeat';
        img_perfil.style.backgroundSize = 'cover';
        img_perfil.style.borderRadius = '50%';
    } else {
        img_perfil.style.background = 'url(../icons/mdi_account-circle.svg)';
        img_perfil.style.backgroundRepeat = 'no-repeat';
        img_perfil.style.backgroundSize = 'cover';
        img_perfil.style.borderRadius = '50%';
    }
}
carregar_dados();

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
    var editar = document.getElementById('editar');
    var adicionar = document.getElementById('adicionar');

    if(parent.document.querySelector('body').id.includes('home')) {
        if(document.getElementById('editar').style.background.includes('check-circle')) {

            document.getElementById('btn_imagem').disabled = true;
            document.getElementById('nome_user').disabled = true;
            document.getElementById('email').disabled = true;
            document.getElementById('telefone').disabled = true;
            document.getElementById('tipo_telefone').disabled = true;
            document.getElementById('senha').disabled = true;
            document.getElementById('conf_senha').disabled = true;
            document.getElementById('equipamento').disabled = true;
            document.getElementById('endereco').disabled = true;
            document.getElementById('numero').disabled = true;
            document.getElementById('cep').disabled = true;
            document.getElementById('cidade').disabled = true;
            document.getElementById('estados').disabled = true;
                    
            editar.style.transition = '0.5s';
            editar.style.background = 'url(../icons/mdi_pencil.svg)';
            editar.style.backgroundRepeat = 'no-repeat';
            editar.style.backgroundSize = 'cover';
    
            adicionar.disabled = true;
            adicionar.style.display = 'none';
    
            modal('Suas alterações foram salvas com sucesso!', modal_sucesso, 3000);
            
        } else {
    
            document.getElementById('btn_imagem').disabled = false;
            document.getElementById('nome_user').disabled = false;
            document.getElementById('email').disabled = false;
            document.getElementById('telefone').disabled = false;
            document.getElementById('tipo_telefone').disabled = false;
            document.getElementById('senha').disabled = false;
            document.getElementById('conf_senha').disabled = false;
            document.getElementById('equipamento').disabled = false;
            document.getElementById('endereco').disabled = false;
            document.getElementById('numero').disabled = false;
            document.getElementById('cep').disabled = false;
            document.getElementById('cidade').disabled = false;
            document.getElementById('estados').disabled = false;
                    
    
            editar.style.transition = '0.5s';
            editar.style.background = 'url(../icons/mdi_check-circle.svg)';
            editar.style.backgroundRepeat = 'no-repeat';
            editar.style.backgroundSize = 'cover';
            
            adicionar.disabled = false;
            setTimeout(function() {
                adicionar.style.display = 'flex';
            }, 300);
        }    
    } else {
        if(document.getElementById('editar').style.background.includes('check-circle')) {

            document.getElementById('btn_imagem').disabled = true;
            document.getElementById('nome_user').disabled = true;
            document.getElementById('email').disabled = true;
            document.getElementById('telefone').disabled = true;
            document.getElementById('tipo_telefone').disabled = true;
            document.getElementById('senha').disabled = true;
            document.getElementById('conf_senha').disabled = true;
                   
            editar.style.transition = '0.5s';
            editar.style.background = 'url(../icons/mdi_pencil.svg)';
            editar.style.backgroundRepeat = 'no-repeat';
            editar.style.backgroundSize = 'cover';
        
            modal('Suas alterações foram salvas com sucesso!', modal_sucesso, 3000);
            
        } else {
    
            document.getElementById('btn_imagem').disabled = false;
            document.getElementById('nome_user').disabled = false;
            document.getElementById('email').disabled = false;
            document.getElementById('telefone').disabled = false;
            document.getElementById('tipo_telefone').disabled = false;
            document.getElementById('senha').disabled = false;
            document.getElementById('conf_senha').disabled = false;
            
            editar.style.transition = '0.5s';
            editar.style.background = 'url(../icons/mdi_check-circle.svg)';
            editar.style.backgroundRepeat = 'no-repeat';
            editar.style.backgroundSize = 'cover';
        }
    }
}
