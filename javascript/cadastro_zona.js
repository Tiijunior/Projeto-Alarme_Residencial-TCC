var numero = 2;

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
            modal('Não será possivel adicionar um sensor com o local em branco.', '../../modal/html/modal_notifica.html', 3000);
            document.getElementById('nome_sensor').disabled = true;
            document.getElementById('tipo_sensor').disabled = true;
            document.getElementById('porta_sensor').disabled = true;              
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
            if(document.getElementById('porta_sensor').value === 'Porta') {
                modal('Inicialmente o cômodo está inativo, mas você poderá ativá-los assim que concluir as configurações.', '../../modal/html/modal_notifica.html', 5000);
            }
            else{
                modal('inicialmente os sensores estão inativos, mas você poderá ativá-los assim que concluir as configurações.', '../../modal/html/modal_notifica.html', 7000);
                setTimeout(function () {
                    modal('Seu local e sensores foram configurado com sucesso.', '../../modal/html/modal_sucesso.html', 5000);
                    window.location.replace('./cadastro_user.html');
                }, 7000);
            }
        }
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

        if(document.getElementById('nome_sensor').disabled === true){
            document.getElementById('nome_sensor').disabled = false;
            document.getElementById('tipo_sensor').disabled = false;
            document.getElementById('porta_sensor').disabled = false;   
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
            input.setAttribute("onfocus", "verificar_teclado()");
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

            // Configura as opções do segundo select
            var options2 = ["Porta", "Porta 1", "Porta 2", "Porta 3", "Porta 4", "Porta 5", "Porta 6", "Porta 7", "Porta 8"];
            options2.forEach(function(item) {
                var option = document.createElement("option");
                option.text = item;
                if (item === "Porta") {
                    option.setAttribute("selected", true);
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
    
            numero += 1;

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


function verificar_teclado() {
    if (Keyboard.elements.main.classList.contains('keyboard--hidden')) {
        setTimeout(function() {
            document.getElementById('nome_zona').style.display = 'none';
            document.getElementById('tipo_comodo').style.display = 'none';
            document.getElementById('zona').style.display = 'none';
            document.querySelector('span').style.display = 'none';
            document.getElementById('texto_comodo').style.display = 'none';           
            document.getElementById('texto_sensor').style.top = '140px';
            document.getElementById('formulario').style.height = '300px';
            document.getElementById('formulario').style.top = '140px';            
        }, 300);
    }
}


const camposDeEntrada = document.querySelectorAll(".use-keyboard-input");

camposDeEntrada.forEach(input => {
    input.addEventListener("focusout", function () {
        
        document.getElementById('nome_zona').style.display = '';
        document.getElementById('tipo_comodo').style.display = '';
        document.getElementById('zona').style.display = '';
        document.querySelector('span').style.display = '';
        document.getElementById('texto_comodo').style.display = '';
        
        document.getElementById('texto_sensor').style.top = '330px';
        document.getElementById('formulario').style.height = '90px';
        document.getElementById('formulario').style.top = '330px';
    });
});