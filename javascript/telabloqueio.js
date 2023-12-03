var ultimoBotaoClicado = null;
var verificado;
let opacity = 0;
var clicked = false;
var lista = false;
var nome = []


function usuarios() {
    var j = 1
    //Coloca os administradores em primeiro
    for(var i = 0; i <= qtd_user; i++) {
        if((usuario[i][2]).includes('administrador')){
            document.getElementById('nome' + j).textContent = usuario[i][1];
            if(!(usuario[i][3]).includes('vazio')){
                imagens((usuario[i][3]).replace(/ /g, ''), (j - 1))
            }
            j++
        } 
    }
    // Coloca os usuários abaixo do administradores na lista
    for(var i = 0; i <= qtd_user; i++) {
        if((usuario[i][2]).includes('usuario')){
            document.getElementById('nome' + j).textContent = usuario[i][1];
            imagens((usuario[i][3]).replace(/ /g, ''), (j-1))
            j++
        } 
    }
}


function imagens(nomeImagem, posicao){

    if(nomeImagem.includes('vazio')){
        if(posicao === 0) {
            document.getElementById('admin').style.background = 'url(../icons/img/mdi_account-circle.svg)';
            document.getElementById('admin').style.backgroundRepeat = 'no-repeat';
            document.getElementById('admin').style.backgroundSize = 'cover';
            document.getElementById('admin').style.borderRadius = '50%';
        } else {
            document.getElementById('user' + posicao).style.background = 'url(../icons/img/mdi_account-circle.svg)';
            document.getElementById('user' + posicao).style.backgroundRepeat = 'no-repeat';
            document.getElementById('user' + posicao).style.backgroundSize = 'cover';
            document.getElementById('user' + posicao).style.borderRadius = '50%';
        }
    } else {
        if(posicao === 0) {
            document.getElementById('admin').style.background = 'url(../foto/'+ nomeImagem +')';
            document.getElementById('admin').style.backgroundRepeat = 'no-repeat';
            document.getElementById('admin').style.backgroundSize = 'cover';
            document.getElementById('admin').style.borderRadius = '50%';
        } else {
            document.getElementById('user' + posicao).style.background = 'url(../foto/'+ nomeImagem +')';
            document.getElementById('user' + posicao).style.backgroundRepeat = 'no-repeat';
            document.getElementById('user' + posicao).style.backgroundSize = 'cover';
            document.getElementById('user' + posicao).style.borderRadius = '50%';
        }
    }    
}

function animacao_bloqueio(){
    setTimeout(() => {
        document.getElementById('fade').style.transition = '3s';
        document.getElementById('fade').style.top = '0';
        document.getElementById('fade').style.bottom = '740px';

        document.getElementById('relogio').style.transition = '2s';
        document.getElementById('relogio').style.top = '214px';  
    }, 200);

    setInterval(() => {
        
        document.getElementById('cadeado').style.top = '400px';
        document.getElementById('cadeado').style.zIndex = '-10';
    }, 3000);
    
}
animacao_bloqueio();

document.getElementById('fade').addEventListener('click', () =>  {
    if(document.getElementById('cadeado').style.display === 'none' && document.getElementById('lista_user').style.top !== '55px') {
        document.getElementById('cadeado').style.background = 'url(../icons/mdi_lock.svg)';
        document.getElementById('cadeado').style.backgroundRepeat = 'no-repeat';
        document.getElementById('cadeado').style.backgroundSize = 'cover';
        document.getElementById('cadeado').style.display = '';
        document.getElementById('fade').style.background = 'rgba(0, 0, 0,0.6)';
        document.getElementById('relogio').style.transition = '0.8s';
        document.getElementById('relogio').style.top = '214px';
        document.getElementById('relogio').style.left = '461px';
        
    } else if (document.getElementById('lista_user').style.top === '55px') {
        bloquear();
    }
});


function desbloquear() {
    if(document.getElementById('cadeado').style.display !== 'none') {
        document.getElementById('cadeado').style.transition = '0.5s';
        document.getElementById('cadeado').style.background = 'url(../icons/lock-open-outline.svg)';
        document.getElementById('cadeado').style.backgroundRepeat = 'no-repeat';
        document.getElementById('cadeado').style.backgroundSize = 'cover';
        
        setTimeout(function() {
            document.getElementById('cadeado').style.display = 'none';
            document.getElementById('relogio').style.transition = '0.8s';
            document.getElementById('relogio').style.top = '290px';
            document.getElementById('relogio').style.left = '336px';
        
            document.getElementById('lista_user').style.transition = '0.8s';
            document.getElementById('lista_user').style.display = 'list-item';
            document.getElementById('lista_user').style.top = '55px';
        }, 1000);
    }
}


function lista_user(numerodeusuarios){
    var listaUser = document.getElementById('lista_user');
    
    if(!lista) {
        for (var i = 1; i <= numerodeusuarios; i++) {
            var novoUsuario = document.createElement('div');
            novoUsuario.id = 'user' + i;
            novoUsuario.className = 'imag_user';
            novoUsuario.style.marginTop = (i * 120) + 'px';
            novoUsuario.style.marginBottom = '30px';
            novoUsuario.setAttribute('onclick', 'chamar_senha(this.id)');
            var novoParagrafo = document.createElement('p');
            novoParagrafo.setAttribute('id', 'nome' + (i + 1))
            novoParagrafo.className = 'nome_principal';
            novoParagrafo.textContent = 'Usuário ' + i;
            novoUsuario.appendChild(novoParagrafo);
            listaUser.appendChild(novoUsuario);
        }
    }
    lista = true;
}


function chamar_senha(usuario) {
    document.getElementById('relogio').style.transition = '0.8s';
    document.getElementById('relogio').style.top = '140px';
    document.querySelector('.numeric').style.left = '68%';
    
    if(ultimoBotaoClicado !== null) {
        
        document.getElementById(ultimoBotaoClicado).style.width = '80px';
        document.getElementById(ultimoBotaoClicado).style.height = '80px';
        document.getElementById(usuario).style.width = '90px';
        document.getElementById(usuario).style.height = '90px';
    } else {
        document.getElementById(usuario).style.width = '90px';
        document.getElementById(usuario).style.height = '90px';
    }

    setTimeout(function() {
        document.getElementById('bloco_senha').style.transition = '0.8s';
        document.getElementById('bloco_senha').style.display = 'flex';
        document.getElementById('senha').value = '';
    }, 500);

    ultimoBotaoClicado = usuario;
}

document.getElementById('botao_senha').addEventListener('click', function () {
    if (ultimoBotaoClicado !== null) {
       verificar_user((document.getElementById(ultimoBotaoClicado).textContent), (document.getElementById('senha').value))
        document.getElementById('senha').value = '';
    }

    setTimeout(() => {
        
        if(verificado[0].includes('True')) {
            document.getElementById('relogio').style.transition = '0.8s';
            document.getElementById('relogio').style.top = '-600px';
        
            document.getElementById('lista_user').style.transition = '0.8s';
            document.getElementById('lista_user').style.top = '-600px';
            document.getElementById('lista_user').style.zIndex = '-10';
            
            document.getElementById('senha').style.transition = '0.8s';
            document.getElementById('senha').style.top = '-600px';
            document.getElementById('senha').style.zIndex = '-10';
            
            document.getElementById('botao_senha').style.transition = '0.8s';
            document.getElementById('botao_senha').style.top = '-600px';
            document.getElementById('botao_senha').style.zIndex = '-10';
            
            document.getElementById('exibir_senha').style.transition = '0.8s';
            document.getElementById('exibir_senha').style.top = '-600px';
            document.getElementById('exibir_senha').style.zIndex = '-10';
            
            document.getElementById('fade').style.transition = '0.8s';
            document.getElementById('fade').style.top = '-600px';

            for(var i = 0; i <= qtd_user; i++) {
                if((document.getElementById(ultimoBotaoClicado).textContent) === (usuario[i][1])) {
                    nome[0] = usuario[i][0]
                    nome[1] = document.getElementById(ultimoBotaoClicado).textContent;
                    nome[2] = usuario[i][3]
                    localStorage.setItem('nome', nome);
                    if(usuario[i][2].includes('administrador')) {
                        
                        setTimeout(function() {
                
                            document.getElementById('lista_user').style.display = 'none';
                            document.getElementById('senha').style.display = 'none';
                            document.getElementById('botao_senha').style.display = 'none';
                            document.getElementById('exibir_senha').style.display = 'none';
                            document.getElementById('fade').style.display = 'none';
            
                            window.location.href = './home.html' ;                       
                        }, 1000);
                    } else {
                        setTimeout(function() {
                            
                            
                            document.getElementById('lista_user').style.display = 'none';
                            document.getElementById('senha').style.display = 'none';
                            document.getElementById('botao_senha').style.display = 'none';
                            document.getElementById('exibir_senha').style.display = 'none';
                            document.getElementById('fade').style.display = 'none';
            
                            window.location.href = './home_user.html' ;                                                      
                        }, 1000);
                    }
                }
            }
        
        } else {
            modal('Senha incorreta. Tente novamente.', '../modal/html/modal_error.html', 5000);
        }
    }, 1500);
});


function bloquear() {
    NumericKeyboard.close();
    var cadeado = document.getElementById('cadeado');
    var lista_user = document.getElementById('lista_user');
    var ocultar_senha = document.getElementById('bloco_senha');

    if(cadeado.style.display === 'none' && lista_user.style.top === '55px' && ocultar_senha.style.display === 'flex') {
        ocultar_senha.style.display = 'none';
        document.getElementById('relogio').style.transition = '0.8s';
        document.getElementById('relogio').style.top = '214px';
        document.getElementById('relogio').style.left = '461px';
        cadeado.style.display = '';
        cadeado.style.background = 'url(../icons/mdi_lock.svg)';
        cadeado.style.backgroundRepeat = 'no-repeat';
        cadeado.style.backgroundSize = 'cover';
        ultimoBotaoClicado = null;

        lista_user.style.transition = '0.8s';
        lista_user.style.display = 'list-item';
        lista_user.style.top = '830px';

    } else if(cadeado.style.display === 'none' && lista_user.style.top === '55px') {
        document.getElementById('relogio').style.transition = '0.8s';
        document.getElementById('relogio').style.top = '214px';
        document.getElementById('relogio').style.left = '461px';
        cadeado.style.display = '';
        cadeado.style.background = 'url(../icons/mdi_lock.svg)';
        cadeado.style.backgroundRepeat = 'no-repeat';
        cadeado.style.backgroundSize = 'cover';
        ultimoBotaoClicado = null;

        lista_user.style.transition = '0.8s';
        lista_user.style.display = 'list-item';
        lista_user.style.top = '830px';

    } else if (!clicked && cadeado.style.display === 'none') {
        let intervalId = setInterval(function() {
            opacity += 0.01; // Aumenta a opacidade em 0.01 a cada 50ms
            document.getElementById('fade').style.background = 'rgba(0, 0, 0,' + opacity + ')';
            if(opacity >= 1) clearInterval(intervalId); // Para o setInterval quando a opacidade chega a 1
        }, 100);

        var relogio = document.getElementById('relogio');
        do {
            setTimeout(() => {
                var x = Math.floor(Math.random() * 1000); // Gera um número aleatório entre 0 e 1000
                var y = Math.floor(Math.random() * 680); // Gera um número aleatório entre 0 e 680

                if(y > 505){
                    relogio.style.transition = '5s';
                    relogio.style.left = x + 'px'; // Define a posição left do relógio
                    relogio.style.top = 500 + 'px'; // Define a posição top do relógio
                } else if(x > 800) {
                    relogio.style.transition = '5s';
                    relogio.style.left = 790 + 'px';
                    relogio.style.top = y + 'px';
                } else if (y < 30) {
                    relogio.style.transition = '5s';
                    relogio.style.left = x + 'px';
                    relogio.style.top = 35 + 'px';
                } else if (x < 26) {
                    relogio.style.transition = '5s';
                    relogio.style.left = 30 + 'px';
                    relogio.style.top = y + 'px';
                } else {
                    relogio.style.transition = '5s';
                    relogio.style.left = x + 'px';
                    relogio.style.top = y + 'px';
                }
            }, 50);
        } while(document.getElementById('fade').addEventListener('click', () =>{}))
    }  else {
        cadeado.style.display = 'none';
        ultimoBotaoClicado = null;
    }
};

// Função para verificar se houve click na tela. 
document.onclick = function() {
  clicked = true;
};

// Função para chamar a tela de bloqueio quando não houver atividade.
function noClick() {
  bloquear();
};

// Verifica a cada 40 segundos se houve um clique
var protetor_tela = setInterval(function() {
  if (clicked) {
    clicked = false;
  } else {
    noClick();
  }
}, 10 * 1000);
