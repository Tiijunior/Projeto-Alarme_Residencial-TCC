let numero = 2;
let dados_do_comodo = [];
let lista_de_sensores = [];
let localref = sessionStorage.localref;
dados_do_comodo = sessionStorage.comodo.split(',');

for(let i = 0; i < (sessionStorage.lista_de_sensores.split(',')).length; i+= 6) {
    let linha_sensor = (sessionStorage.lista_de_sensores.split(',')).slice(i, i + 6);
    lista_de_sensores.push(linha_sensor);
}
sessionStorage.clear();

if(localref !== 'home'){
    document.getElementById('editar_local').style.display = 'none';
    document.getElementById('adicionar_sensores').style.display = 'none';
    if(numero < 3) {
        document.getElementById('editar_sensor1').style.display = 'none';
    } else {
        document.getElementById('editar_sensor' + numero).style.display = 'none';
    }
}

// Garante que o input criado dinamicamente vai receber valores do teclado virtual
function attachKeyboardToInput(inputElement) {
    inputElement.addEventListener("focus", () => {
        Keyboard.open(inputElement.value, (currentValue) => {
            inputElement.value = currentValue;
        });
    });
}

function carregar_valores() {
    // Comodo
    let id_comodo = dados_do_comodo[0];
    let nome_comodo = dados_do_comodo[2];
    let tipo_comodo = dados_do_comodo[3];
    let zona_comodo = dados_do_comodo[4];

    let nome_local = document.getElementById('nome_local');
    let tipo_local = document.getElementById('tipo_comodo');
    let zona = document.getElementById('zona');
    let status_comodo = document.getElementById('ativar_comodo');
    
    nome_local.value = nome_comodo;
    zona.value = zona_comodo.replace(/ /g, '');
    if((tipo_comodo.replace(/ /g, '')).includes('quarto')){tipo_local.click(selecionar_comodo((tipo_comodo.replace(/ /g, '')), '../icons/Quarto.svg'));}
    if((tipo_comodo.replace(/ /g, '')).includes('cozinha')){tipo_local.click(selecionar_comodo((tipo_comodo.replace(/ /g, '')), '../icons/Cozinha.svg'));}
    if((tipo_comodo.replace(/ /g, '')).includes('sala')){tipo_local.click(selecionar_comodo((tipo_comodo.replace(/ /g, '')), '../icons/Sala.svg'));}
    if((tipo_comodo.replace(/ /g, '')).includes('banheiro')){tipo_local.click(selecionar_comodo((tipo_comodo.replace(/ /g, '')), '../icons/Banheiro.svg'));}
    if((tipo_comodo.replace(/ /g, '')).includes('externo')){tipo_local.click(selecionar_comodo((tipo_comodo.replace(/ /g, '')), '../icons/Externo.svg'));}
    
    if(dados_do_comodo[5].includes('1')) {
        status_comodo.style.scale = '1'
        status_comodo.style.background = "url(../icons/mdi_toggle-switch-on.svg)";
        status_comodo.style.backgroundRepeat = "no-repeat";
        status_comodo.style.backgroundSize = "cover";
    } else {
        status_comodo.style.scale = '0.90'
        status_comodo.style.background = "url(../icons/mdi_toggle-switch-desativado-off.svg)";
        status_comodo.style.backgroundRepeat = "no-repeat";
        status_comodo.style.backgroundSize = "cover";
    }

    if(lista_de_sensores.length > 1){
        
        for(let i = 1; i < lista_de_sensores.length; i++) {adicionar_sensor();}
        for(let i = 0; i < lista_de_sensores.length; i++) {
            document.getElementById('nome_sensor' + (i + 1)).value = lista_de_sensores[i][2];
            document.getElementById('porta_sensor' + (i + 1)).value = lista_de_sensores[i][3].replace(/ /g, '');
            document.getElementById('tipo_sensor' + (i + 1)).value = lista_de_sensores[i][4].replace(/ /g, '');
            
            if(lista_de_sensores[i][5].includes('1')) {
                document.getElementById('switch_sensor' + (i + 1)).style.scale = '1';
                document.getElementById('switch_sensor' + (i + 1)).style.background = "url(../icons/mdi_toggle-switch-on.svg)";
                document.getElementById('switch_sensor' + (i + 1)).style.backgroundRepeat = "no-repeat";
                document.getElementById('switch_sensor' + (i + 1)).style.backgroundSize = "cover";
                document.getElementById('switch_sensor' + (i + 1)).id = lista_de_sensores[i][0];
            } else {
                document.getElementById('switch_sensor' + (i + 1)).style.scale = '1';
                document.getElementById('switch_sensor' + (i + 1)).style.background = "url(../icons/mdi_toggle-switch-desativado-off.svg)";
                document.getElementById('switch_sensor' + (i + 1)).style.backgroundRepeat = "no-repeat";
                document.getElementById('switch_sensor' + (i + 1)).style.backgroundSize = "cover";
                document.getElementById('switch_sensor' + (i + 1)).id = lista_de_sensores[i][0];
            }
        }
    } else {
        if(!(lista_de_sensores[0]).includes('')) {
            document.getElementById('nome_sensor1').value = lista_de_sensores[0][2];
            document.getElementById('porta_sensor1').value = lista_de_sensores[0][3].replace(/ /g, '');
            document.getElementById('tipo_sensor1').value = lista_de_sensores[0][4].replace(/ /g, '');
            if(lista_de_sensores[0][5].includes('1')) {
                document.getElementById('switch_sensor1').style.scale = '1';
                document.getElementById('switch_sensor1').style.background = "url(../icons/mdi_toggle-switch-on.svg)";
                document.getElementById('switch_sensor1').style.backgroundRepeat = "no-repeat";
                document.getElementById('switch_sensor1').style.backgroundSize = "cover";
            } else {
                document.getElementById('switch_sensor1').style.scale = '1';
                document.getElementById('switch_sensor1').style.background = "url(../icons/mdi_toggle-switch-desativado-off.svg)";
                document.getElementById('switch_sensor1').style.backgroundRepeat = "no-repeat";
                document.getElementById('switch_sensor1').style.backgroundSize = "cover";
            }
        }
    }
}
carregar_valores();

var ativa_comodo;
function ativar(elemento){
    var status_comodo = document.getElementById(elemento);
    if(!status_comodo.style.background.includes('switch-on')) {
        status_comodo.style.scale = '1';
        status_comodo.style.background = "url(../icons/mdi_toggle-switch-on.svg)";
        status_comodo.style.backgroundRepeat = "no-repeat";
        status_comodo.style.backgroundSize = "cover";
        ativa_comodo = 1    
    } else {
        status_comodo.style.scale = '0.90'
        status_comodo.style.background = "url(../icons/mdi_toggle-switch-desativado-off.svg)";
        status_comodo.style.backgroundRepeat = "no-repeat";
        status_comodo.style.backgroundSize = "cover";       
        ativa_comodo = 0     
    }
};


// Adiciona ouvintes de eventos a todos os elementos com a classe 'switch'
document.querySelectorAll('.switch').forEach(function(element) {
    element.addEventListener('click', function() {
        window.parent.postMessage({sensor: 'ativar', nome_elemento: this.id, ativa_sensor: ativa_comodo}, '*');
    });
});


document.getElementById('ativar_comodo').addEventListener('click', () => {
    window.parent.postMessage({ambiente: 'ativar', id_do_comodo: dados_do_comodo[0], status_comodo: ativa_comodo}, '*');

    if((document.getElementById('ativar_comodo').style.background).includes('switch-on')) {
        for(var i = 0; i < lista_de_sensores.length; i++) {
            document.getElementById('switch_sensor' + (i + 1)).style.scale = '1';
            document.getElementById('switch_sensor' + (i + 1)).style.background = "url(../icons/mdi_toggle-switch-on.svg)";
            document.getElementById('switch_sensor' + (i + 1)).style.backgroundRepeat = "no-repeat";
            document.getElementById('switch_sensor' + (i + 1)).style.backgroundSize = "cover";
        }
    } else {
        for(var i = 0; i < lista_de_sensores.length; i++) {
            document.getElementById('switch_sensor' + (i + 1)).style.scale = '1';
            document.getElementById('switch_sensor' + (i + 1)).style.background = "url(../icons/mdi_toggle-switch-desativado-off.svg)";
            document.getElementById('switch_sensor' + (i + 1)).style.backgroundRepeat = "no-repeat";
            document.getElementById('switch_sensor' + (i + 1)).style.backgroundSize = "cover";
        }
    }
});


function adicionar_sensor() {
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
                    var value = item.toLowerCase().replace(/ /g, "_");
                    switch(value) {
                        case "sensor_magnético_(abertura_de_janela)":
                        value = "magnetico";
                        break;
                        case "sensor_switch_(abertura_de_porta)":
                        value = "switch";
                        break;
                        case "sensor_de_vibração_(janela)":
                        value = "vibracao";
                        break;
                        case "sensor_infravermelho_passivo_(movimento_interno)":
                        value = "infra_passivo";
                        break;
                        case "sensor_infravermelho_ativo_(movimento_externo)":
                        value = "infra_ativo";
                        break;
                    }
                    option.setAttribute("value", value);
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
                    option.setAttribute("value", item.replace(/Porta /g, ''));
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
            btn_switch.setAttribute('onclick', 'ativar(this.id)');
            
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

        if(numero === 9) {
            document.getElementById('adicionar_sensores').disabled = true;
        }
        else {
            document.getElementById('adicionar_sensores').disabled = false;
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

function selecionar_comodo(comodo, icone) {
    var botao_tipocomodo = document.getElementById('tipo_comodo');

    if (comodo === 'quarto') {
        botao_tipocomodo.className = 'modal_tipocomodo_button';
        botao_tipocomodo.innerHTML = '<img src="'+ icone + '" alt="" style="width: 50px; height: 35px; margin-right: 10px">Quarto';
        botao_tipocomodo.onclick = function() {
            mostrar_tipocomodo();
        };
        tipo_comodo.value = 'quarto';
        botao_tipocomodo.className = 'tipo_zona';

    } else if (comodo === 'cozinha') {
        botao_tipocomodo.className = 'modal_tipocomodo_button';
        botao_tipocomodo.innerHTML = '<img src="'+ icone + '" alt="" style="width: 50px; height: 35px; margin-right: 10px">Cozinha';
        botao_tipocomodo.onclick = function() {
            mostrar_tipocomodo();
        };
        tipo_comodo.value = 'cozinha';
        botao_tipocomodo.className = 'tipo_zona';

    } else if (comodo === 'sala') {
        botao_tipocomodo.className = 'modal_tipocomodo_button';
        botao_tipocomodo.innerHTML = '<img src="'+ icone + '" alt="" style="width: 50px; height: 35px; margin-right: 10px">Sala';
        botao_tipocomodo.onclick = function() {
            mostrar_tipocomodo();
        };
        tipo_comodo.value = 'sala';
        botao_tipocomodo.className = 'tipo_zona';

    } else if (comodo === 'banheiro') {
        botao_tipocomodo.className = 'modal_tipocomodo_button';
        botao_tipocomodo.innerHTML = '<img src="'+ icone + '" alt="" style="width: 50px; height: 35px; margin-right: 10px">Banheiro';
        botao_tipocomodo.onclick = function() {
            mostrar_tipocomodo();
        };
        tipo_comodo.value = 'banheiro';
        botao_tipocomodo.className = 'tipo_zona';

    } else if (comodo === 'externo') {
        botao_tipocomodo.className = 'modal_tipocomodo_button';
        botao_tipocomodo.innerHTML = '<img src="'+ icone + '" alt="" style="width: 50px; height: 35px; margin-right: 10px">Externo';
        botao_tipocomodo.onclick = function() {
            mostrar_tipocomodo();
        };
        tipo_comodo.value = 'externo';
        botao_tipocomodo.className = 'tipo_zona';
    }
}
