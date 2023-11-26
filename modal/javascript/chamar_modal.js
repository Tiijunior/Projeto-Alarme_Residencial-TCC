// Chama o modal
function modal(str, src, tempo, tamanho) {
    sessionStorage.setItem('minhaString', str); // Armazene a string no sessionStorage
    sessionStorage.setItem('tamanho', tamanho); // Armazene a string no sessionStorage

    var iframe = document.createElement('iframe');

    iframe.src = src;
    iframe.style.position = 'fixed';
    iframe.style.top = '-2px';
    iframe.style.left = '-2px';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.zIndex = '99';

    document.body.appendChild(iframe);
    
    setTimeout(function () {
        if (iframe && iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
        }
    }, tempo);
}

function modal_comodo() {
    var iframe = document.createElement('iframe');

    iframe.src = "../modal/html/modal_comodo.html";
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    document.body.appendChild(iframe);
}
