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
            animacao_btn();
            var form = document.querySelector('#sensores');
            
            // Cria os elementos
            var div = document.createElement('div');
            var input = document.createElement('input');
            var select1 = document.createElement('select');
            var select2 = document.createElement('select');

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

            // Adiciona os elementos criados ao início do formulário
            form.insertBefore(select2, form.firstChild);
            form.insertBefore(select1, form.firstChild);
            form.insertBefore(input, form.firstChild);

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

function animacao_btn() {
    if(document.getElementById('btn_salvar').getBoundingClientRect().top === 500) {
        document.getElementById('sensores').style.height = '220px';
        document.getElementById('btn_salvar').style.top = '550px';
    } else if (document.getElementById('btn_salvar').getBoundingClientRect().top === 550) {
        document.getElementById('btn_salvar').style.top = '600px';
    }
}

function btn_salvar() {
    modal('inicialmente os sensores estão inativos, mas você poderá ativá-los assim que deixar essa página.', '../modal/html/modal_notifica.html', 5000, '75px');
    setTimeout(function() {
        modal('Seu local foi configurado com sucesso!', '../modal/html/modal_sucesso.html', 5000, '75px')
    }, 3500);
}