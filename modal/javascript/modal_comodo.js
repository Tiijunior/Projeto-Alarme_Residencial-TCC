var aberto = true

function mostrar_tipocomodo() {

    var mostrar = document.getElementById('modal_tipocomodo');

    if (aberto === true) {
        mostrar.classList.add('mostrar');
        aberto = false
    }
    else{
        mostrar.classList.remove('mostrar');
        aberto = true
    }

}


function selecionar_comodo(comodo, icone) {
    var botao_tipocomodo = document.getElementById('tipo_comodo');

    if (comodo === 'quarto') {
        botao_tipocomodo.className = 'modal_tipocomodo_button';
        botao_tipocomodo.innerHTML = '<img src="'+ icone + '" alt="" style="width: 50px; height: 35px; margin-right: 10px">Quarto';
        botao_tipocomodo.onclick = function() {
            mostrar_tipocomodo();
        };
        botao_tipocomodo.className = 'tipo_zona';
    } else if (comodo === 'cozinha') {
        botao_tipocomodo.className = 'modal_tipocomodo_button';
        botao_tipocomodo.innerHTML = '<img src="'+ icone + '" alt="" style="width: 50px; height: 35px; margin-right: 10px">Cozinha';
        botao_tipocomodo.onclick = function() {
            mostrar_tipocomodo();
        };
        botao_tipocomodo.className = 'tipo_zona';
    } else if (comodo === 'sala') {
        botao_tipocomodo.className = 'modal_tipocomodo_button';
        botao_tipocomodo.innerHTML = '<img src="'+ icone + '" alt="" style="width: 50px; height: 35px; margin-right: 10px">Sala';
        botao_tipocomodo.onclick = function() {
            mostrar_tipocomodo();
        };
        botao_tipocomodo.className = 'tipo_zona';
    } else if (comodo === 'banheiro') {
        botao_tipocomodo.className = 'modal_tipocomodo_button';
        botao_tipocomodo.innerHTML = '<img src="'+ icone + '" alt="" style="width: 50px; height: 35px; margin-right: 10px">Banheiro';
        botao_tipocomodo.onclick = function() {
            mostrar_tipocomodo();
        };
        botao_tipocomodo.className = 'tipo_zona';
    } else if (comodo === 'externo') {
        botao_tipocomodo.className = 'modal_tipocomodo_button';
        botao_tipocomodo.innerHTML = '<img src="'+ icone + '" alt="" style="width: 50px; height: 35px; margin-right: 10px">Externo';
        botao_tipocomodo.onclick = function() {
            mostrar_tipocomodo();
        };
        botao_tipocomodo.className = 'tipo_zona';
    }
}
