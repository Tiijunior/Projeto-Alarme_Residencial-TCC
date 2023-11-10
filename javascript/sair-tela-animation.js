var logo = document.querySelector('.logo');
var screenHeight = window.innerHeight;

// Adicione um evento de rolagem para verificar quando o elemento está fora da tela
window.addEventListener('scroll', function() {
    var logoRect = logo.getBoundingClientRect();

    // Verifique se a parte inferior do elemento é maior que a altura da tela
    if (logoRect.bottom < 0) {
        // Quando estiver fora da tela, adicione a classe com o animation-delay ajustado
        logo.classList.add('animate-exit');
    }
});
window.addEventListener('scroll', function() {
    var logoRect = logo.getBoundingClientRect();

    // Verifique se o elemento está de volta na tela (ou a parte inferior dele está acima da parte superior da tela)
    if (logoRect.bottom >= 0) {
        // Quando estiver de volta à tela, remova a classe da animação
        logo.classList.remove('animate-exit');
    }
});
