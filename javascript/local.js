numero = 2;

// Garante que o input criado dinamicamente vai receber valores do teclado virtual
function attachKeyboardToInput(inputElement) {
    inputElement.addEventListener("focus", () => {
        Keyboard.open(inputElement.value, (currentValue) => {
            inputElement.value = currentValue;
        });
    });
}

function adicionar_sensor() {
    if(document.getElementById('nome_local').value !== '') {
        if(document.querySelector('.nome_sensor').value !== '') {
            var form = document.querySelector('#sensores');
            
            // Cria os elementos
            var div = document.createElement('div');
            var input = document.createElement('input');
            var select1 = document.createElement('select');
            var select2 = document.createElement('select');
            var btn_editar = document.createElement('button');
            var btn_switch = document.createElement('div');

            // Configura o div
            div.setAttribute("id", "id_sensor" + numero);

            // Configura os atributos do input
            input.setAttribute("id", "nome_sensor" + numero);
            input.classList.add("nome_sensor", "use-keyboard-input");
            input.setAttribute("type", "text");
            //input.setAttribute("onfocus", "verificar_teclado()");
            input.setAttribute("placeholder", "Nome do sensor");

            // Configura as opções do primeiro select
            var options1 = ["Tipo", "Sensor Magnético (abertura de Janela)", "Sensor Switch (abertura de Porta)", "Sensor de Vibração (Janela)", "Sensor Infravermelho Passivo (Movimento Interno)", "Sensor Infravermelho Ativo (Movimento Externo)"];
            options1.forEach(function(item) {
                var option = document.createElement("option");
                option.text = item;
                if (item === "Tipo") {
                    option.setAttribute("selected", true);
                    option.setAttribute("disabled", true);
                } else {
                    option.setAttribute("value", item.toLowerCase().replace(/ /g, "_"));
                }
                select1.appendChild(option);
            });

            select1.setAttribute("id", "tipo_sensor" + numero);
            select1.setAttribute("class", "seletcion_sensor");

            var opcao_selecionada = document.getElementById('porta_sensor' + (numero - 1)).value;

            // Configura as opções do segundo select
            var options2 = ["Porta", "Porta 1", "Porta 2", "Porta 3", "Porta 4", "Porta 5", "Porta 6", "Porta 7", "Porta 8"];
            options2.forEach(function(item) {
                var option = document.createElement("option");
                option.text = item;
                if (item === "Porta") {
                    option.setAttribute("selected", true);
                    option.setAttribute("disabled", true);
                } else if (item === opcao_selecionada) {
                    option.setAttribute("disabled", true);
                } else {
                    option.setAttribute("value", item);
                }
                select2.appendChild(option);
            });
            select2.setAttribute("id", "porta_sensor" + numero);
            select2.setAttribute("class", "seletcion_sensor");

            // Configura o botão editar
            btn_editar.setAttribute('class', 'editar');
            btn_editar.setAttribute('id', 'editar_sensor' + numero);
            btn_editar.style.position = 'relative';
            btn_editar.style.top = '10px';
            btn_editar.style.marginLeft = '10px';
            btn_editar.setAttribute('onclick', 'editar_sensores("'+numero+'")');

            // Configura o Switch para ativar sensor
            btn_switch.setAttribute('class', 'switch');
            btn_switch.setAttribute('id', 'switch_sensor' + numero);
            btn_switch.style.position = 'relative';
            btn_switch.style.top = '-55px';
            btn_switch.style.marginLeft = '1101px';

            // Adiciona os elementos criados ao início do formulário
            form.insertBefore(btn_switch, form.firstChild);
            form.insertBefore(btn_editar, form.firstChild);
            form.insertBefore(select2, form.firstChild);
            form.insertBefore(select1, form.firstChild);
            form.insertBefore(input, form.firstChild);
            
            input.disabled = true;
            select1.disabled = true;
            select2.disabled = true;

            attachKeyboardToInput(input);

            numero ++;
        }

        if(numero === 9) {
            document.getElementById('adicionar_sensores').disabled = true;
        }
        else {
            document.getElementById('adicionar_sensores').disabled = false;
        }

    }
}

function editar_ambiente() {
    if(!document.getElementById('editar_local').style.background.includes('mdi_check-circle.svg')) {
        var input_local = document.getElementById('nome_local');
        var select_comodo = document.getElementById('tipo_comodo');
        var select_zona = document.getElementById('zona');

        document.getElementById('editar_local').style.background = 'url(../icons/mdi_check-circle.svg)';
        input_local.disabled = false;
        select_comodo.disabled = false;
        select_zona.disabled = false;

        input_local.style.background = '#FFF';
        select_comodo.style.background = '#FFF';
        select_zona.style.background = '#FFF';
    } else {
        var input_local = document.getElementById('nome_local');
        var select_comodo = document.getElementById('tipo_comodo');
        var select_zona = document.getElementById('zona');

        document.getElementById('editar_local').style.background = 'url(../icons/mdi_pencil.svg)';
        input_local.disabled = true;
        select_comodo.disabled = true;
        select_zona.disabled = true;

        input_local.style.background = ' rgba(255, 255, 255, 0.7)';
        select_comodo.style.background = ' rgba(255, 255, 255, 0.7)';
        select_zona.style.background = ' rgba(255, 255, 255, 0.7)';

        modal('Suas alterações foram salvas com sucesso!', '../modal/html/modal_sucesso.html', 5000);
    }

}

function editar_sensores(identificador) {
    if(!document.getElementById('editar_sensor' + identificador).style.background.includes('mdi_check-circle.svg')) {
        var input_local = document.getElementById('nome_sensor' + identificador);
        var select_comodo = document.getElementById('tipo_sensor' + identificador);
        var select_zona = document.getElementById('porta_sensor' + identificador);

        document.getElementById('editar_sensor' + identificador).style.background = 'url(../icons/mdi_check-circle.svg)';
        input_local.disabled = false;
        select_comodo.disabled = false;
        select_zona.disabled = false;

        input_local.style.background = '#FFF';
        select_comodo.style.background = '#FFF';
        select_zona.style.background = '#FFF';
    } else {
        var input_local = document.getElementById('nome_sensor' + identificador);
        var select_comodo = document.getElementById('tipo_sensor' + identificador);
        var select_zona = document.getElementById('porta_sensor' + identificador);

        document.getElementById('editar_sensor' + identificador).style.background = 'url(../icons/mdi_pencil.svg)';
        input_local.disabled = true;
        select_comodo.disabled = true;
        select_zona.disabled = true;

        input_local.style.background = ' rgba(255, 255, 255, 0.7)';
        select_comodo.style.background = ' rgba(255, 255, 255, 0.7)';
        select_zona.style.background = ' rgba(255, 255, 255, 0.7)';

        modal('Suas alterações foram salvas com sucesso!', '../modal/html/modal_sucesso.html', 5000);
    }
}