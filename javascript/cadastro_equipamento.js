function proximo() {
    if (document.getElementById('endereco').value === '') {
        modal('Não pode haver campos em branco!', '../../modal/html/modal_error.html', 3000);
    } else {
        setTimeout(function() {
            window.location.replace('./cadastro_zona.html');
        }, 1000);
    }
}