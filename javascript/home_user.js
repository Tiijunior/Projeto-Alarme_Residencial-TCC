var flag_menu_esquerdo = false
var flag_menu_direito = false
var timer;
var clicked = false;
var comodo = 1;
var status_todos = 0;
var nome = localStorage.nome;

document.getElementById('mensagemId').textContent = 'Olá, '+ nome +'';

//fechar menus
var fechar_menu = [document.getElementById('fundo'), document.getElementById('meio')];

fechar_menu.forEach(function(elemento) {
    elemento.addEventListener('click', function() {
        if(flag_menu_esquerdo === true) {
            chamar_comodos();
        }
    });
});


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
        document.getElementById('fundo').style.zIndex = 0;
        setTimeout(function() {
            var iframe = document.getElementById('telas');
            iframe.src = './wifi.html';
        }, 900);

        document.getElementById('barra_main').style.zIndex = 3;
        document.getElementById('btn_home').style.zIndex = 4;
    }
};


function chamar_comodos() {
    var menu_esquerdo = document.getElementById('menu_esquerdo');
    
    if(!flag_menu_esquerdo)
    {
        menu_esquerdo.style.transition = '1s';
        menu_esquerdo.style.display = 'flex';
        menu_esquerdo.style.left = '0';
        flag_menu_esquerdo = true;
        
    } else {
        menu_esquerdo.style.transition = '1s';
        menu_esquerdo.style.left = '-330px';
        menu_esquerdo.style.display = '0';
        flag_menu_esquerdo = false

    }
};


function todos_comodos(elemento) {
    var botao = document.getElementById('switch_comodo');
    
    if(botao.style.background.includes('switch-on') && elemento === undefined) {
        botao.style.width = '48px';
        botao.style.height = '24px';
        botao.style.marginTop = '130px';
        botao.style.background = 'url(../icons/mdi_toggle-switch-desativado-off.svg)';
        botao.style.backgroundRepeat = 'no-repeat';
        botao.style.backgroundSize = 'cover';

        for(var i = 1; i < comodo; i++) {
            if(window.getComputedStyle(document.getElementById('ativar_comodo' + i)).backgroundImage.includes('mdi_toggle-switch-on')) {
                ativar_comodo('ativar_comodo' + i);
            };
        };

    } else if(elemento === 'ativar') {
        botao.style.width = '50px';
        botao.style.height = '28px';
        botao.style.marginTop = '128px';
        botao.style.background = 'url(../icons/mdi_toggle-switch-on.svg)';
        botao.style.backgroundRepeat = 'no-repeat';
        botao.style.backgroundSize = 'cover';
    } else if(elemento === 'desativar') {
        botao.style.width = '48px';
        botao.style.height = '24px';
        botao.style.marginTop = '130px';
        botao.style.background = 'url(../icons/mdi_toggle-switch-desativado-off.svg)';
        botao.style.backgroundRepeat = 'no-repeat';
        botao.style.backgroundSize = 'cover';
    } else {
        botao.style.width = '50px';
        botao.style.height = '28px';
        botao.style.marginTop = '128px';
        botao.style.background = 'url(../icons/mdi_toggle-switch-on.svg)';
        botao.style.backgroundRepeat = 'no-repeat';
        botao.style.backgroundSize = 'cover';
        for(var i = 1; i < comodo; i++) {
            if(window.getComputedStyle(document.getElementById('ativar_comodo' + i)).backgroundImage.includes('mdi_toggle-switch-desativado-off.svg')) {
                ativar_comodo('ativar_comodo' + i);
            }
        };        
    }
};


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
            document.getElementById('fundo').style.zIndex = 1;
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
};

function chamar_conta() {
    if(!(document.getElementById('telas').src).includes('novo_perfil.html')) {
        document.getElementById('relogio').style.transition = '1s';
        for(var i = 0; i < document.getElementsByClassName('texto_meio').length; i++) {
            document.getElementsByClassName('texto_meio')[i].style.display = 'none';
        }
        document.getElementById('relogio').style.top = '8px';
        document.getElementById('relogio').style.left = '597px';
        document.getElementById('relogio').style.fontSize = '32px';
        document.getElementById('relogio').style.zIndex = 2;
        document.getElementById('fundo').style.zIndex = 0;

        setTimeout(function() {
            var iframe = document.getElementById('telas');
            iframe.style.left = '1280px';
            
            setTimeout( function() {
                iframe.src = './minha_conta.html';
                iframe.style.transition = '2s';
                iframe.style.left = '0';

                setTimeout( function() {
                    if(window.location.pathname.includes('home.html')) {chamar_perfis();}
                }, 1000);
            }, 200);
            
        }, 900);

        document.getElementById('barra_main').style.zIndex = 3;
        document.getElementById('btn_home').style.zIndex = 4;
    }   
};


function lista_user(numerodeusuarios){
    var listaUser = document.getElementById('lista_user');
    
    for (var i = 1; i <= numerodeusuarios; i++) {
        var novoUsuario = document.createElement('div');
        novoUsuario.id = 'user' + i;
        novoUsuario.className = 'imag_user';
        novoUsuario.style.marginTop = (i * 70) + 'px';
        novoUsuario.setAttribute('onclick', 'perfil()');
        var novoParagrafo = document.createElement('p');
        novoParagrafo.className = 'nome_principal';
        novoParagrafo.textContent = 'Usuário ' + i;
        novoUsuario.appendChild(novoParagrafo);
        listaUser.appendChild(novoUsuario);
    }
};

function criarComodo(imagem, nome) {
    
    let listaComodos = document.getElementById('lista_comodos');

    for (let i = 1; i < 2; i++) {
        let bloco = document.createElement('div');
        bloco.id = 'bloco' + comodo;
        bloco.className = 'bloco_comodo';
        bloco.style.top = (comodo - 1) * 20 + 'px';
        //bloco.setAttribute('onclick', 'local(this.id)');

        let img = document.createElement('img');
        img.id = 'img_comodo' + comodo;
        img.className = 'img_comodos';
        img.src = '../icons/' + imagem + '.svg';
        img.alt = '';
        bloco.appendChild(img);

        let ativar = document.createElement('div');
        ativar.id = 'ativar_comodo' + comodo;
        ativar.className = 'ativar_comodos';
        ativar.setAttribute('onclick', 'ativar_comodo(this.id)');
        bloco.appendChild(ativar);

        let texto = document.createElement('p');
        texto.id = 'texto_comodo' + comodo;
        texto.className = 'texto_comodos';
        texto.textContent = nome;
        bloco.appendChild(texto);

        listaComodos.appendChild(bloco);
    }
    comodo++;
};

criarComodo('Quarto', 'Quarto Casal');
criarComodo('Cozinha', 'Cozinha');

function ativar_comodo(elemento){
    var status_comodo = document.getElementById(elemento);

    if(!status_comodo.style.background.includes('switch-on')) {
        status_comodo.style.width = '50px';
        status_comodo.style.height = '28px';
        status_comodo.style.marginTop = '19px';
        status_comodo.style.background = 'url(../icons/mdi_toggle-switch-on.svg)';
        status_comodo.style.backgroundRepeat = 'no-repeat';
        status_comodo.style.backgroundSize = 'cover';
    } else {
        status_comodo.style.width = '48px';
        status_comodo.style.height = '24px';
        status_comodo.style.marginTop = '21px';
        status_comodo.style.background = 'url(../icons/mdi_toggle-switch-desativado-off.svg)';
        status_comodo.style.backgroundRepeat = 'no-repeat';
        status_comodo.style.backgroundSize = 'cover';
    }

    for(var i = 1; i < comodo; i++) {
        if(window.getComputedStyle(document.getElementById('ativar_comodo' + i)).backgroundImage.includes('mdi_toggle-switch-on.svg')) {
            status_todos++;
        } else {
            status_todos = 0;
        }
    };
    
    if(status_todos === (comodo - 1)){
        todos_comodos('ativar');
    } else if (status_todos === 0) {
        todos_comodos('desativar');
    }
}

function local(elemento){
    if(!(document.getElementById('telas').src).includes('novo_local.html')) {
        document.getElementById('relogio').style.transition = '1s';
        for(var i = 0; i < document.getElementsByClassName('texto_meio').length; i++) {
            document.getElementsByClassName('texto_meio')[i].style.display = 'none';
        }
        document.getElementById('relogio').style.top = '8px';
        document.getElementById('relogio').style.left = '597px';
        document.getElementById('relogio').style.fontSize = '32px';
        document.getElementById('relogio').style.zIndex = 2;
        document.getElementById('fundo').style.zIndex = 0;

        setTimeout(function() {
            var iframe = document.getElementById('telas');
            iframe.style.left = '-1280px';
            
            setTimeout( function() {
                iframe.src = './local.html';
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
};


function bloquear() {
    window.location.href = './bloqueio.html';
};

// Função para verificar se houve click na tela. 
document.onclick = function() {
  clicked = true;
};

// Função para chamar a tela de bloqueio quando não houver atividade.
function noClick() {
  bloquear();
};

// Verifica a cada 5 minutos se houve um clique
setInterval(function() {
  if (clicked) {
    clicked = false;
  } else {
    noClick();
  }
}, 5 * 60 * 1000);