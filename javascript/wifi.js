var flag_ativarwifi = false;

function animacao_wifi(){
    setTimeout(function() {
        document.getElementById('lista_wifi').style.transition = '1s';
        document.getElementById('lista_wifi').style.top = '210px';
        document.getElementById('lista_wifi').style.zIndex = '0';
    }, 100);
}
animacao_wifi();

function ativar_wifi() {
    if(!flag_ativarwifi) {
        document.getElementById('switch_ligarwifi').style.backgroundImage = 'url(../icons/mdi_toggle-switch-on.svg)';
        document.getElementById('fundo_wifi').style.background = '#FFF';
        document.getElementById('fundo_listawifi').style.background = '#FFF';
        document.getElementById('icon_wifi').style.backgroundImage = 'url(../icons/mdi_wifi-lock.svg)'
        document.getElementById('texto_velocidade').style.color = '#707070';
        document.getElementById('texto_seguranca').style.color = '#707070';
        document.getElementById('velocidade').style.color = '#707070';
        document.getElementById('seguranca').style.color = '#707070';
        document.getElementById('nome_wifi').style.color = '#707070';
        document.getElementById('texto_reconexao').style.color = '#707070';
        document.getElementById('status_wifi').style.left = '1000px';
        document.getElementById('status_wifi').style.color = '#1F9B00';
        document.getElementById('status_wifi').textContent = 'Conectado';
        for(var i = 0; i < (document.getElementsByClassName('texto_wifi')).length; i++) {
            document.getElementsByClassName('texto_wifi')[i].style.color = '#707070';
        }
        for(var i= 0; i < (document.getElementsByClassName('itens_wifi')).length; i++) {
            document.getElementsByClassName('itens_wifi')[i].style.backgroundImage = 'url(../icons/mdi_wifi-lock.svg)';
        }

        flag_ativarwifi = true;
    } else {
        document.getElementById('switch_ligarwifi').style.backgroundImage = 'url(../icons/mdi_toggle-switch-off.svg)';
        document.getElementById('fundo_wifi').style.background = '#7070705b';
        document.getElementById('fundo_listawifi').style.background = '#7070705b';
        document.getElementById('icon_wifi').style.backgroundImage = 'url(../icons/mdi_wifi-lock-branco.svg)'
        document.getElementById('texto_velocidade').style.color = '#FFF';
        document.getElementById('texto_seguranca').style.color = '#FFF';
        document.getElementById('velocidade').style.color = '#c5c4c4';
        document.getElementById('seguranca').style.color = '#c5c4c4';
        document.getElementById('nome_wifi').style.color = '#c5c4c4';
        document.getElementById('texto_reconexao').style.color = '#FFF';
        document.getElementById('status_wifi').style.left = '950px';
        document.getElementById('status_wifi').style.color = '#707070';
        document.getElementById('status_wifi').textContent = 'Desconecatado';
        for(var i = 0; i < (document.getElementsByClassName('texto_wifi')).length; i++) {
            document.getElementsByClassName('texto_wifi')[i].style.color = '#c5c4c4';
        }
        for(var i= 0; i < (document.getElementsByClassName('itens_wifi')).length; i++) {
            document.getElementsByClassName('itens_wifi')[i].style.backgroundImage = 'url(../icons/mdi_wifi-lock-branco.svg)';
        }
        
        flag_ativarwifi = false;
    }
}
ativar_wifi();

function criarElementos(quantidade) {
    var fundo_listawifi = document.getElementById("fundo_listawifi");

    for (var i = 1; i < quantidade; i++) {
        var div = document.createElement("div");
        div.className = "itens_wifi";
        
        var p = document.createElement("p");
        p.className = "texto_wifi";
        p.id = "nome_wifi" + i;
        
        div.appendChild(p);
        fundo_listawifi.appendChild(div);
    }
}
