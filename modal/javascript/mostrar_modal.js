document.addEventListener( "DOMContentLoaded", function() {
    var modal = document.getElementById("modal");
    var fade = document.getElementById("fade");

    var minhaString = sessionStorage.getItem('minhaString'); // Recupere a string do sessionStorage
    var tamanho = sessionStorage.getItem('tamanho');
    mensagem_texto(minhaString); // Passe a string para a função mensagem_texto
    document.getElementById('modal_imagem').style.marginTop = tamanho;

   setTimeout(function() {
    modal.classList.add('mostrar')
    fade.classList.add('mostrar')
   }, 400);
});
