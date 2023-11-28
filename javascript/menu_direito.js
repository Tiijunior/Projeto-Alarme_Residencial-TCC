// recebe o nome do usuário armazenado no Storage
nome = localStorage.nome.split(',');


document.getElementById('mensagemId').textContent = 'Olá, '+ nome[1] +'';

// Carrega a foto da minha conta do administrador.
function imagens(){   
    var img_perfil = document.getElementById('img_perfil');

    if(nome[2].includes('vazio')) {
        img_perfil.style.background = 'url(../icons/img/mdi_account-circle.svg)';
        img_perfil.style.backgroundRepeat = 'no-repeat';
        img_perfil.style.backgroundSize = 'cover';
        img_perfil.style.borderRadius = '50%';
    } else {
        img_perfil.style.background = 'url(../foto/'+ (nome[2]).replace(/ /g, '') +')';
        img_perfil.style.backgroundRepeat = 'no-repeat';
        img_perfil.style.backgroundSize = 'cover';
        img_perfil.style.borderRadius = '50%';
    }
}
imagens();

function carrega_lista_user(){
    var posicao = 1;
    // Percorre a lista de usuários
    for(let i = 0; i <= qtd_user; i++) {
        // Verifica se o usuário atual não é o mesmo que nome[0]
        if(usuario[i][0] !== nome[0]) {
            // Altera o textContent do elemento com a classe 'nome_principal'
                if((usuario[i][3]).includes('vazio')){
                    document.getElementById('user' + posicao).getElementsByClassName('nome_principal')[0].textContent = usuario[i][1];
                    document.getElementById('user' + posicao).style.background = 'url(../icons/img/mdi_account-circle.svg)';
                    document.getElementById('user' + posicao).style.backgroundRepeat = 'no-repeat';
                    document.getElementById('user' + posicao).style.backgroundSize = 'cover';
                    document.getElementById('user' + posicao).style.borderRadius = '50%';
                } else {
                    document.getElementById('user' + posicao).getElementsByClassName('nome_principal')[0].textContent = usuario[i][1];
                    document.getElementById('user' + posicao).style.background = 'url(../foto/'+(usuario[i][3]).replace(/ /g, '')+')';
                    document.getElementById('user' + posicao).style.backgroundRepeat = 'no-repeat';
                    document.getElementById('user' + posicao).style.backgroundSize = 'cover';
                    document.getElementById('user' + posicao).style.borderRadius = '50%';
                }
                posicao ++;
        }
    }
}
carrega_lista_user();



function lista_user(numerodeusuarios){
    var listaUser = document.getElementById('lista_user');
    
    for (var i = 1; i <= numerodeusuarios; i++) {
        var novoUsuario = document.createElement('div');
        novoUsuario.id = 'user' + i;
        novoUsuario.className = 'imag_user';
        novoUsuario.style.marginTop = (i * 70) + 'px';
        novoUsuario.setAttribute('onclick', 'perfil(this.id)');
        var novoParagrafo = document.createElement('p');
        novoParagrafo.className = 'nome_principal';
        novoParagrafo.textContent = 'Usuário ' + i;
        novoUsuario.appendChild(novoParagrafo);
        listaUser.appendChild(novoUsuario);
    }
};

