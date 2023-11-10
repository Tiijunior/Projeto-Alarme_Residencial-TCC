var flag_menu_esquerdo = false
var flag_menu_direito = false

function chamar_wifi() {
    if(!(window.location.pathname).includes('wifi.html')) {
        document.getElementById('relogio').style.transition = '1s';
        for(var i = 0; i < document.getElementsByClassName('texto_meio').length; i++) {
            document.getElementsByClassName('texto_meio')[i].style.display = 'none';
        }
        document.getElementById('relogio').style.top = '8px';
        document.getElementById('relogio').style.left = '597px';
        document.getElementById('relogio').style.fontSize = '32px';
        setTimeout(function() {
            window.location.href = './wifi.html';
        }, 900);
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
    if((window.location.pathname).includes('wifi.html')) {
        document.getElementById('lista_wifi').style.transition = '1s';
        document.getElementById('lista_wifi').style.zIndex = '-10';
        document.getElementById('lista_wifi').style.top = '-380px'
        document.getElementById('t_wifi').style.top = '-380px';
        document.getElementById('switch_ligarwifi').style.top = '-380px';
        
        setTimeout(function() {
            document.getElementById('switch_ligarwifi').style.display = 'none';
            document.getElementById('t_wifi').style.display = 'none';
            document.getElementById('lista_wifi').style.display = 'none';
            document.getElementById('relogio').style.transition = '1s';
            document.getElementById('relogio').style.top = '320px';
            document.getElementById('relogio').style.left = '511px';
            document.getElementById('relogio').style.fontSize = '96px';
            for(var i = 0; i < document.getElementsByClassName('texto_meio').length; i++) {
                document.getElementsByClassName('texto_meio')[i].style.display = 'flex';
            }
        }, 500);

        setTimeout(function() {
            window.location.href = './home.html'
        }, 1500);
    }
    else {
        window.location.href = './home.html'
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

function bloquear() {
    window.location.href = './bloqueio.html';
}