function digitar_senha() {
    var senha = document.getElementById('senha');
    var relogio = document.getElementById('relogio_bloqueio');
    var ico = document.getElementById('senha_ico');
    var botao = document.getElementById('botao_senha');
    var botaoDesbloquear = document.getElementById('desbloquear');

    if (botaoDesbloquear.style.display === 'none') {
        relogio.style.top = '20%';
        relogio.style.left = '-10%';
        senha.style.display = 'block';
        ico.style.display = 'block';
        ico.style.position = 'absolute';
        ico.style.left = '23%';
        ico.style.top = '49%';
        botao.style.display = 'block';
        botao.style.marginTop = '1%';
        botao.style.marginLeft = '33%';
    }
}
