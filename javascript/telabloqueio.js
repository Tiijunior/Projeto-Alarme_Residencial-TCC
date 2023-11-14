function animacao_bloqueio(){
    setTimeout(function() {
        document.getElementById('fade').style.transition = '3s';
        document.getElementById('fade').style.top = '0';
        document.getElementById('fade').style.bottom = '740px';

        document.getElementById('relogio').style.transition = '2s';
        document.getElementById('relogio').style.top = '214px';  
    
        document.getElementById('cadeado').style.transition = '2s';
        document.getElementById('cadeado').style.top = '400px';
        document.getElementById('cadeado').style.zIndex = '-10';
    }, 200);
    
}
animacao_bloqueio();


function desbloquear() {
    document.getElementById('cadeado').style.transition = '0.5s';
    document.getElementById('cadeado').style.background = 'url(../icons/lock-open-outline.svg)';
    document.getElementById('cadeado').style.backgroundRepeat = 'no-repeat';
    document.getElementById('cadeado').style.backgroundSize = 'cover';
    
    setTimeout(function() {
        document.getElementById('cadeado').style.display = 'none';
        document.getElementById('relogio').style.transition = '1s';
        document.getElementById('relogio').style.top = '310px';
        document.getElementById('relogio').style.left = '336px';
    
        document.getElementById('lista_user').style.transition = '1s';
        document.getElementById('lista_user').style.display = 'list-item';
        document.getElementById('lista_user').style.top = '55px';
    }, 1000);
}

function lista_user(numerodeusuarios){
    var listaUser = document.getElementById('lista_user');
    
    for (var i = 1; i <= numerodeusuarios; i++) {
        var novoUsuario = document.createElement('div');
        novoUsuario.id = 'user' + i;
        novoUsuario.className = 'imag_user';
        novoUsuario.style.marginTop = (i * 110) + 'px';
        novoUsuario.style.marginBottom = '30px';
        novoUsuario.setAttribute('onclick', 'chamar_senha(this.id)');
        var novoParagrafo = document.createElement('p');
        novoParagrafo.className = 'nome_principal';
        novoParagrafo.textContent = 'Usuário ' + i;
        novoUsuario.appendChild(novoParagrafo);
        listaUser.appendChild(novoUsuario);
    }
}

function chamar_senha(usuario) {
    document.getElementById('relogio').style.transition = '1s';
    document.getElementById('relogio').style.top = '140px';

    setTimeout(function() {
        document.getElementById('bloco_senha').style.transition = '1s';
        document.getElementById('bloco_senha').style.display = 'flex';
    }, 500);
    
    if(usuario === 'admin') {
        document.getElementById('botao_senha').addEventListener('click', function () {
            console.log(document.getElementById(usuario).textContent)
            document.getElementById('relogio').style.transition = '1s';
            document.getElementById('relogio').style.top = '-600px';

            document.getElementById('lista_user').style.transition = '1s';
            document.getElementById('lista_user').style.top = '-600px';
            document.getElementById('lista_user').style.zIndex = '-10';
            
            document.getElementById('senha').style.transition = '1s';
            document.getElementById('senha').style.top = '-600px';
            document.getElementById('senha').style.zIndex = '-10';
            
            document.getElementById('botao_senha').style.transition = '1s';
            document.getElementById('botao_senha').style.top = '-600px';
            document.getElementById('botao_senha').style.zIndex = '-10';
            
            document.getElementById('exibir_senha').style.transition = '1s';
            document.getElementById('exibir_senha').style.top = '-600px';
            document.getElementById('exibir_senha').style.zIndex = '-10';
            
            document.getElementById('fade').style.transition = '1s';
            document.getElementById('fade').style.top = '-600px';
            

            setTimeout(function() {
                
                document.getElementById('lista_user').style.display = 'none';
                document.getElementById('senha').style.display = 'none';
                document.getElementById('botao_senha').style.display = 'none';
                document.getElementById('exibir_senha').style.display = 'none';
                document.getElementById('fade').style.display = 'none';
                window.location.href = './home.html' ;
            }, 1000);
            
        });
    } else {
        document.getElementById('botao_senha').addEventListener('click', function () {
            console.log(document.getElementById(usuario).textContent)
            document.getElementById('relogio').style.transition = '1s';
            document.getElementById('relogio').style.top = '-600px';

            document.getElementById('lista_user').style.transition = '1s';
            document.getElementById('lista_user').style.top = '-600px';
            document.getElementById('lista_user').style.zIndex = '-10';
            
            document.getElementById('senha').style.transition = '1s';
            document.getElementById('senha').style.top = '-600px';
            document.getElementById('senha').style.zIndex = '-10';
            
            document.getElementById('botao_senha').style.transition = '1s';
            document.getElementById('botao_senha').style.top = '-600px';
            document.getElementById('botao_senha').style.zIndex = '-10';
            
            document.getElementById('exibir_senha').style.transition = '1s';
            document.getElementById('exibir_senha').style.top = '-600px';
            document.getElementById('exibir_senha').style.zIndex = '-10';
            
            document.getElementById('fade').style.transition = '1s';
            document.getElementById('fade').style.top = '-600px';
            

            setTimeout(function() {
                
                document.getElementById('lista_user').style.display = 'none';
                document.getElementById('senha').style.display = 'none';
                document.getElementById('botao_senha').style.display = 'none';
                document.getElementById('exibir_senha').style.display = 'none';
                document.getElementById('fade').style.display = 'none';
                window.location.href = './home_user.html' ;
            }, 1000);
        });
    }
}
