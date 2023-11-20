var numero = 2;
var inputs = document.querySelectorAll('.use-keyboard-input');
var ultimoInputFocado;

// Armazena qual é o ultimo input que entrou em focus.
inputs.forEach(function(input) {
    input.addEventListener('focus', function() {
        ultimoInputFocado = this;
    });
});


//declaração das variáveis para armazenar valores do sensores
var gnome_sensor = [];
var gtipo_sensor = [];
var gporta_sensor =[];

// função responsavel para inserir valores do teclado virtual nos inputs criado dinamicamente
function attachKeyboardToInput(inputElement) {
    inputElement.addEventListener("focus", () => {
        Keyboard.open(inputElement.value, (currentValue) => {
            inputElement.value = currentValue;
        });
    });
}

function adicionar_sensor() {
    if(document.getElementById('novo_sensor').className === 'ocultar') {
        var campo_nome = document.getElementById('nome_zona');
        var campo_tipo = document.getElementById('tipo_comodo');
        var campo_zona = document.getElementById('zona');
        var ocultar = document.getElementById('novo_sensor');
        var btn_anterior = document.getElementById('btn_anterior');
        var btn_novosensor = document.getElementById('btn_novosensor');
        var btn_proximo = document.getElementById('btn_proximo');
    
        campo_nome.disabled = true;
        campo_tipo.disabled = true;
        campo_zona.disabled = true;

            
        btn_anterior.style.transition = '1s';
        btn_anterior.style.marginTop = '270px';
        btn_proximo.style.transition = '1s';
        btn_proximo.style.marginTop = '270px';
        btn_novosensor.style.transition = '1s';
        btn_novosensor.style.marginTop = '270px';
        btn_novosensor.textContent = 'Novo sensor';
    

        setTimeout(function() {
            ocultar.classList.remove('ocultar');
            ocultar.classList.add('mostrar');
        }, 1000);

        if(document.getElementById('zona').value === '') {
            modal('Não será possivel adicionar um sensor com o local em branco.', '../../modal/html/modal_notifica.html', 5000, '45px');
            document.getElementById('nome_sensor1').disabled = true;
            document.getElementById('tipo_sensor1').disabled = true;
            document.getElementById('porta_sensor1').disabled = true;              
        } 
    }
    else {
        if(document.getElementById('zona').value === ''){
            modal('Configuração feita com Sucesso.', '../../modal/html/modal_sucesso.html', 4000);
            setTimeout(function () {
                window.location.replace('./cadastro_user.html');
            }, 4500);
        }
        else{
            if(document.getElementById('porta_sensor1').value === 'Porta') {
                cadastro_comodo(true, true);
            }
            else {
                mostrarAmbiente();
                gnome_sensor.push(document.getElementById('nome_sensor' + (numero - 1)).value);
                gtipo_sensor.push(document.getElementById('tipo_sensor' + (numero - 1)).value);
                gporta_sensor.push(document.getElementById('porta_sensor' + (numero - 1)).value);

                cadastro_comodo(true, false);
                cadastro_sensor(true);
            }
        }
    }
}

function sucesso(mensagem) {
    if(mensagem.includes('sucesso_comodo')){
        modal('inicialmente os sensores estão inativos, mas você poderá ativá-los assim que concluir as configurações.', '../../modal/html/modal_notifica.html', 6000, '53px');
        setTimeout(() => {
            modal('Seu Ambiente foi configurado com sucesso.', '../../modal/html/modal_sucesso.html', 5000);
            setTimeout(() => {
                window.location.replace('./cadastro_user.html');
            }, 9000);
        }, 6000);
    } else if(mensagem.includes('sucesso_sensor')) {
        modal('inicialmente os sensores estão inativos, mas você poderá ativá-los assim que concluir as configurações.', '../../modal/html/modal_notifica.html', 6000, '53px');
        setTimeout(() => {
            modal('Seu local e sensores foram configurado com sucesso.', '../../modal/html/modal_sucesso.html', 5000);            
            setTimeout(() => {
                window.location.replace('./cadastro_user.html');
            }, 9000);
        }, 6000);  
    }
}



function passoAnterior() {
    if(document.getElementById('novo_sensor').className === 'ocultar') {
        window.location.href='../../telas/primeiro_passos/cadastro_equipamento.html';
    }
    else {
        var campo_nome = document.getElementById('nome_zona');
        var campo_tipo = document.getElementById('tipo_comodo');
        var campo_zona = document.getElementById('zona');
        var ocultar = document.getElementById('novo_sensor');
        var btn_anterior = document.getElementById('btn_anterior');
        var btn_novosensor = document.getElementById('btn_novosensor');
        var btn_proximo = document.getElementById('btn_proximo');
    
        ocultar.classList.remove('mostrar');
        ocultar.classList.add('ocultar');

        if(document.getElementById('nome_sensor1').disabled === true){
            document.getElementById('nome_sensor1').disabled = false;
            document.getElementById('tipo_sensor1').disabled = false;
            document.getElementById('porta_sensor1').disabled = false;   
        }
    
        campo_nome.disabled = false;
        campo_tipo.disabled = false;
        campo_zona.disabled = false;
    
        btn_anterior.style.transition = '1s';
        btn_anterior.style.marginTop = '77px';
        btn_novosensor.style.transition = '1s';
        btn_novosensor.style.marginTop = '77px';
        btn_novosensor.textContent = 'Pular passo'
        btn_novosensor.disabled = false;
        btn_proximo.style.transition = '1s';
        btn_proximo.style.marginTop = '77px';

    }
}


function novo_sensor() {
    if(document.getElementById('btn_novosensor').textContent === 'Pular passo') {
        window.location.replace('./cadastro_user.html');
    }
    else {
        if((numero - 1) === 1) {
            gnome_sensor.push(document.getElementById('nome_sensor1').value);
            gtipo_sensor.push(document.getElementById('tipo_sensor1').value);
            gporta_sensor.push(document.getElementById('porta_sensor1').value);
        } else{
            gnome_sensor.push(document.getElementById('nome_sensor' + (numero - 1)).value);
            gtipo_sensor.push(document.getElementById('tipo_sensor' + (numero - 1)).value);
            gporta_sensor.push(document.getElementById('porta_sensor' + (numero - 1)).value);
        }

        if(document.getElementById('zona').value !== '') {
            // Seleciona o elemento do formulário
            var form = document.querySelector("#formulario");

            // Cria os elementos
            var input = document.createElement("input");
            var select1 = document.createElement("select");
            var select2 = document.createElement("select");

            // Configura os atributos do input
            input.setAttribute("id", "nome_sensor" + numero);
            input.classList.add("nome_sensor", "use-keyboard-input");
            input.style.marginBottom = '10px';
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", "Nome do sensor");
 
            // Configura as opções do primeiro select
            var options1 = ["Tipo", "Sensor Magnético (abertura de Janela)", "Sensor Switch (abertura de Porta)", "Sensor de Vibração (Janela)", "Sensor Infravermelho Passivo (Movimento Interno)", "Sensor Infravermelho Ativo (Movimento Externo)"];
            var options2 = ["", "magnetico", "switch", "vibracao", "infra_passivo", "infra_ativo"];

            for (var i = 0; i < options1.length; i++) {
                var option = document.createElement("option");
                option.text = options1[i];
                if (options1[i] === "Tipo") {
                    option.setAttribute("selected", true);
                    option.setAttribute("disabled", true);
                } else {
                    option.setAttribute("value", options2[i]);
                }
                select1.appendChild(option);
            }

            select1.setAttribute("id", "tipo_sensor" + numero);
            select1.setAttribute("class", "seletcion_sensor");

            // Configura as opções do segundo select
            var options3 = ["Porta", "Porta 1", "Porta 2", "Porta 3", "Porta 4", "Porta 5", "Porta 6", "Porta 7", "Porta 8"];
            var options4 = ["", "1", "2", "3", "4", "5", "6", "7", "8"];

            for (var i = 0; i < options3.length; i++) {
                var option = document.createElement("option");
                option.text = options3[i];
                if (options3[i] === "Porta") {
                    option.setAttribute("selected", true);
                    option.setAttribute("disabled", true);
                } else {
                    option.setAttribute("value", options4[i]);
                    // Verifica se o valor atual está no array gporta_sensor
                    if (gporta_sensor.includes(options4[i])) {
                        // Se estiver, desabilita a opção
                        option.setAttribute('disabled', true);
                    }
                }
                select2.appendChild(option);
            }
            select2.setAttribute("id", "porta_sensor" + numero);
            select2.setAttribute("class", "seletcion_sensor");            

            // Adiciona os elementos criados ao início do formulário
            form.insertBefore(select2, form.firstChild);
            form.insertBefore(select1, form.firstChild);
            form.insertBefore(input, form.firstChild);
    
            numero ++;

            if(numero === 9){
                document.getElementById('btn_novosensor').disabled = true
            }

            // Anexe o teclado virtual ao campo de entrada criado dinamicamente
            attachKeyboardToInput(input);
        }
        else {
            modal('Não é possivel adicionar novos sensores sem criar um local.', '../../modal/html/modal_error.html', 3000);
            document.getElementById('btn_novosensor').disabled = true
        }
    }
}


function moverInputs(mover) {
    if(mover === 'subir'){
        if(ultimoInputFocado !== undefined) {
            if(ultimoInputFocado.id.includes('nome_sensor')){
                document.getElementById('btn_anterior').textContent = 'Mostrar ambiente';
                document.getElementById('btn_anterior').removeAttribute('onclick', 'passoAnterior()');
                document.getElementById('btn_anterior').setAttribute('onclick', 'mostrarAmbiente()');
                setTimeout(function() {
                    document.getElementById('nome_zona').style.display = 'none';
                    document.getElementById('tipo_comodo').style.display = 'none';
                    document.getElementById('zona').style.display = 'none';
                    document.querySelector('span').style.display = 'none';
                    document.getElementById('texto_comodo').style.display = 'none';
          
                    document.getElementById('texto_sensor').style.top = '140px';

                    document.getElementById('formulario').style.transition = '0.5s';
                    document.getElementById('formulario').style.height = '300px';
                    document.getElementById('formulario').style.top = '140px';            
                }, 300);
            }
        }
    }
};

function mostrarAmbiente() {
    if(ultimoInputFocado !== undefined) {
        if(ultimoInputFocado.id.includes('nome_sensor')){
            document.getElementById('nome_zona').style.display = '';
            document.getElementById('tipo_comodo').style.display = '';
            document.getElementById('zona').style.display = '';
            document.querySelector('span').style.display = '';
            document.getElementById('texto_comodo').style.display = '';
        
            document.getElementById('texto_sensor').style.transition = '1s';
            document.getElementById('texto_sensor').style.top = '330px';

            document.getElementById('formulario').style.transition = '1s';
            document.getElementById('formulario').style.height = '90px';
            document.getElementById('formulario').style.top = '330px';

            document.getElementById('btn_anterior').textContent = 'Passo anterior'
            document.getElementById('btn_anterior').removeAttribute('onclick', 'mostrarAmbiente()');
            document.getElementById('btn_anterior').setAttribute('onclick', 'passoAnterior()');
        }
    }
}