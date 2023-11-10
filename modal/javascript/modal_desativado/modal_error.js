function modal_error() {
    var iframe = document.createElement('iframe');

    iframe.src = "../modal/html/modal_error.html";
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    document.body.appendChild(iframe);

    setTimeout(function () {
        if (iframe && iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
        }
    }, 2500)
}
