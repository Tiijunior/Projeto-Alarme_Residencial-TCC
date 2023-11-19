function primeiro_acesso() {
    var logo = document.querySelector('.logo');
    for(var i = 1; i < 35; i++) {
        logo.style.transition = '1s';
        logo.style.top = 330 - (i * 10) + 'px';
        logo.style.left = '560px';
        logo.style.width = 450 - (i * 10) + 'px';
        logo.style.height = 450 - (i * 10) + 'px';
    };
};

function home(){
    var logo = document.querySelector('.logo');
    
    for(var i = 1; i < 35; i++) {
        logo.style.transition = '1s';
        logo.style.top = 300 - (i * 10) + 'px';
        logo.style.width = 500 - (i * 10) + 'px';
        logo.style.height = 500 - (i * 10) + 'px';
        logo.style.left = 220 + (i * 10) + 'px';
    }
    
    if(logo.style.top === '-40px') {
        setTimeout(() => {
            logo.style.transition = '1s';
            logo.src =  './icons/Logo\ 3\ -\ Algiz\ -\ Branco.svg';
        }, 1000)
    }
}