var alarme_sonoro = new Audio('../_engine/Audio/Alarme.mp3');

function alarme(local) {
    alarme_sonoro.play();
    
    window.addEventListener('message', (event) => {
        senha_alarme(event.data.senha);
    })

    var iframe = document.createElement('iframe');
    var local = local;

    if((window.location.pathname).includes('home')){
        sessionStorage.setItem('local', local.toUpperCase());
        iframe.src = '../modal/html/modal_alarme.html';
        iframe.style.position = 'fixed';
        iframe.style.top = '-2px';
        iframe.style.left = '-2px';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.zIndex = '99';
    
        document.body.appendChild(iframe);

        
    } else {
        sessionStorage.setItem('local', local.toUpperCase());
        iframe.src = '../modal/html/modal_alarme.html';
        iframe.style.position = 'fixed';
        iframe.style.top = '-2px';
        iframe.style.left = '-2px';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.zIndex = '99';
    
        document.body.appendChild(iframe);
        
        clearInterval(protetor_tela);
        document.getElementById('cadeado').style.display = 'none';
        document.getElementById('fade').style.background = 'rgba(0, 0, 0,0.6)';
        document.getElementById('relogio').style.transition = '0.8s';
        document.getElementById('relogio').style.top = '214px';
        document.getElementById('relogio').style.left = '461px';
        document.getElementById('lista_user').style.transition = '0.8s';
        document.getElementById('lista_user').style.display = 'list-item';
        document.getElementById('lista_user').style.top = '830px';
    }
}

function removerIframe() {
    // Seleciona o iframe pelo atributo src
    var iframe = document.querySelector("iframe[src='../modal/html/modal_alarme.html']");
    if (iframe) {
        // Remove o iframe do DOM
        document.body.removeChild(iframe);
        alarme_sonoro.pause();
        alarme_sonoro.currentTime = 0;
        bloquear();
    }
}
