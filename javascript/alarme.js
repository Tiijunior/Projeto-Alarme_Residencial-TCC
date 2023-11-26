function alarme(local) {
    var iframe = document.createElement('iframe');
    var local = 'local';
    
    sessionStorage.setItem('local', local.toUpperCase());
    iframe.src = '../modal/html/modal_alarme.html';
    iframe.style.position = 'fixed';
    iframe.style.top = '-2px';
    iframe.style.left = '-2px';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.zIndex = '99';

    document.body.appendChild(iframe);

    /*setTimeout(function () {
        if (iframe && iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
        }
    }, 10000);*/
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