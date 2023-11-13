var flag_menu_esquerdo = false
var flag_menu_direito = false
var timer;
var clicked = false;


function chamar_wifi() {
    if(!(document.getElementById('telas').src).includes('wifi.html')) {
        document.getElementById('relogio').style.transition = '1s';
        for(var i = 0; i < document.getElementsByClassName('texto_meio').length; i++) {
            document.getElementsByClassName('texto_meio')[i].style.display = 'none';
        }
        document.getElementById('relogio').style.top = '8px';
        document.getElementById('relogio').style.left = '597px';
        document.getElementById('relogio').style.fontSize = '32px';
        document.getElementById('relogio').style.zIndex = 2;
        setTimeout(function() {
            var iframe = document.getElementById('telas');
            iframe.src = './wifi.html';
        }, 900);

        document.getElementById('barra_main').style.zIndex = 3;
        document.getElementById('btn_home').style.zIndex = 4;
    }
}

function chamar_comodos() {
    var menu_esquerdo = document.getElementById('menu_esquerdo');
    
    if(!flag_menu_esquerdo)
    {
        menu_esquerdo.style.transition = '1s';
        menu_esquerdo.style.display = 'flex';
        menu_esquerdo.style.left = '0';
        flag_menu_esquerdo = true;
    }
    else {
        menu_esquerdo.style.transition = '1s';
        menu_esquerdo.style.left = '-330px';
        menu_esquerdo.style.display = '0';
        flag_menu_esquerdo = false
    }

}

function chamar_home(){
    if(!(document.getElementById('telas').src === '')) {
        document.getElementById('telas').style.transition = '1s';
        document.getElementById('telas').style.top = '-700px';
        setTimeout(function() {
            var iframe = document.getElementById('telas');
            iframe.parentNode.removeChild(iframe);
        }, 500);
        
        setTimeout(function() {
            document.getElementById('relogio').style.transition = '1s';
            document.getElementById('relogio').style.top = '320px';
            document.getElementById('relogio').style.left = '511px';
            document.getElementById('relogio').style.fontSize = '96px';
            for(var i = 0; i < document.getElementsByClassName('texto_meio').length; i++) {
                document.getElementsByClassName('texto_meio')[i].style.display = 'flex';
            }
        }, 700);
        var novoiframe = document.createElement('iframe');
        novoiframe.id = 'telas';
        novoiframe.frameBorder = '0';
        novoiframe.style.position = 'fixed';
        novoiframe.style.height = '100%';
        novoiframe.style.width = '100%';
        novoiframe.style.top = '0';
        novoiframe.style.left = '0';

        document.getElementById('meio').appendChild(novoiframe);
    }
    else {
        if((window.location.pathname).includes('home_user')) {
            window.location.href = './home_user.html';
        }
        else {
            window.location.href = './home.html';
        }
    }
}

function chamar_perfis() {
    var menu_direito = document.getElementById('menu_direito');
    
    if(!flag_menu_direito)
    {
        menu_direito.style.transition = '1s';
        menu_direito.style.display = 'flex';
        menu_direito.style.right = '0';
        flag_menu_direito = true;
    }
    else {
        menu_direito.style.transition = '1s';
        menu_direito.style.right = '-230px';
        menu_direito.style.display = '0';
        flag_menu_direito = false
    }
}

function adicionar_perfis() {
    if(!(document.getElementById('telas').src).includes('novo_perfil.html')) {
        document.getElementById('relogio').style.transition = '1s';
        for(var i = 0; i < document.getElementsByClassName('texto_meio').length; i++) {
            document.getElementsByClassName('texto_meio')[i].style.display = 'none';
        }
        document.getElementById('relogio').style.top = '8px';
        document.getElementById('relogio').style.left = '597px';
        document.getElementById('relogio').style.fontSize = '32px';
        document.getElementById('relogio').style.zIndex = 2;
        setTimeout(function() {
            var iframe = document.getElementById('telas');
            iframe.style.left = '1280px';
            
            setTimeout( function() {
                iframe.src = './novo_perfil.html';
                iframe.style.transition = '2s';
                iframe.style.left = '0';

                setTimeout( function() {
                    var menu_direito = document.getElementById('menu_direito');
                    menu_direito.style.transition = '1s';
                    menu_direito.style.right = '-330px';
                    menu_direito.style.display = '0';
                    flag_menu_direito = false
                }, 1000);
            }, 200);
            
        }, 900);

        document.getElementById('barra_main').style.zIndex = 3;
        document.getElementById('btn_home').style.zIndex = 4;
    }   
}

function bloquear() {
    window.location.href = './bloqueio.html';
}

function adicionar_comodo(){
    if(!(document.getElementById('telas').src).includes('novo_local.html')) {
        document.getElementById('relogio').style.transition = '1s';
        for(var i = 0; i < document.getElementsByClassName('texto_meio').length; i++) {
            document.getElementsByClassName('texto_meio')[i].style.display = 'none';
        }
        document.getElementById('relogio').style.top = '8px';
        document.getElementById('relogio').style.left = '597px';
        document.getElementById('relogio').style.fontSize = '32px';
        document.getElementById('relogio').style.zIndex = 2;
        setTimeout(function() {
            var iframe = document.getElementById('telas');
            iframe.style.left = '-1280px';
            
            setTimeout( function() {
                iframe.src = './novo_local.html';
                iframe.style.transition = '2s';
                iframe.style.left = '0';

                setTimeout( function() {
                    var menu_esquerdo = document.getElementById('menu_esquerdo');
                    menu_esquerdo.style.transition = '1s';
                    menu_esquerdo.style.left = '-330px';
                    menu_esquerdo.style.display = '0';
                    flag_menu_esquerdo = false
                }, 1000);
            }, 200);
            
        }, 900);

        document.getElementById('barra_main').style.zIndex = 3;
        document.getElementById('btn_home').style.zIndex = 4;
    }   
}


// Função para verificar se houve click na tela. 
document.onclick = function() {
  clicked = true;
}

// Função para chamar a tela de bloqueio quando não houver atividade.
function noClick() {
  bloquear();
}

// Verifica a cada 5 minutos se houve um clique
setInterval(function() {
  if (clicked) {
    clicked = false;
  } else {
    noClick();
  }
}, 5 * 60 * 1000);
