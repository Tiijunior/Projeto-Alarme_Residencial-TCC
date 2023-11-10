var numero = 2;

// Garante que o input criado dinamicamente vai receber valores do teclado virtual
function attachKeyboardToInput(inputElement) {
    inputElement.addEventListener("focus", () => {
        Keyboard.open(inputElement.value, (currentValue) => {
            inputElement.value = currentValue;
        });
    });
}

function attachNumericKeyboardToInput(inputElement) {
    inputElement.addEventListener("focus", () => {
        NumericKeyboard.open(inputElement.value, (currentValue) => {
            inputElement.value = currentValue;
        });
    });
}
/*
if(document.getElementById('nome').value === '') {
            
    document.getElementById('btn_novoperfil').disabled = true;
}
else {
    document.getElementById('btn_novoperfil').disabled = false;
}
*/


function adicionar_novoperfil() {
    
    document.getElementById('btn_anterior').style.transition = '1s';
    document.getElementById('btn_anterior').style.marginTop = '85px';
    document.getElementById('btn_novoperfil').style.transition = '1s';
    document.getElementById('btn_novoperfil').style.marginTop = '85px';
    document.getElementById('btn_pularpasso').style.transition = '1s';
    document.getElementById('btn_pularpasso').style.marginTop = '85px';
    document.getElementById('btn_entrar').style.transition = '1s';
    document.getElementById('btn_entrar').style.marginTop = '85px';
    
    // Seleciona o elemento do formulário
    var form = document.querySelector("#formulario");

    // Cria os elementos
    var inputNome = document.createElement("input");
    var inputEmail = document.createElement("input");
    var inputSenha = document.createElement("input");
    var inputConfSenha = document.createElement("input");
    var selectFuncao = document.createElement("select");
    var linha = document.createElement("hr");
    var spanSenha = document.createElement("span");
    var spanConfSenha = document.createElement("span");
    var spanError = document.createElement("span");
    var spanCheck = document.createElement("span");



    // Configura os atributos do inputNome
    inputNome.setAttribute("id", "nome" + numero);
    inputNome.classList.add("nome", "use-keyboard-input");
    inputNome.setAttribute("type", "text");
    inputNome.setAttribute("placeholder", "Nome");

    // Configura os atributos do inputEmail
    inputEmail.setAttribute("id", "email" + numero);
    inputEmail.classList.add("email", "use-keyboard-input");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("placeholder", "E-mail");

    // Configura os atributos do inputSenha
    inputSenha.setAttribute("id", "senha" + numero);
    inputSenha.classList.add("senha", "use-numerico-input");
    inputSenha.setAttribute("type", "password");
    inputSenha.setAttribute("placeholder", "Senha");

    // Configura os atributos do inputConfSenha
    inputConfSenha.setAttribute("id", "conf_senha" + numero);
    inputConfSenha.classList.add("conf_senha", "use-numerico-input");
    inputConfSenha.setAttribute("type", "password");
    inputConfSenha.setAttribute("placeholder", "Confirmação de senha");

    // Configura os atributos do spanSenha
    spanSenha.setAttribute("id", "exibir_senha" + numero);
    spanSenha.classList.add("icon");
    spanSenha.style.marginTop = "-50px";
    spanSenha.style.marginLeft = "400px";
    spanSenha.innerHTML = '<img style="width: 35px; height: 35px;" src="../../icons/ant-design_eye-invisible-filled.svg">';
    spanSenha.onclick = function() { exibir(this.id);};

    // Configura os atributos do spanConfSenha
    spanConfSenha.setAttribute("id", "exibir_conf_senha" + numero);
    spanConfSenha.classList.add("icon");
    spanConfSenha.style.marginLeft = "850px";
    spanConfSenha.innerHTML = '<img style="width: 35px; height: 35px;" src="../../icons/ant-design_eye-invisible-filled.svg">';
    spanConfSenha.onclick = function() { exibir(this.id);};

    // Configura as opções do selectFuncao
    var optionsFuncao = ["Função", "Administrador", "Usuário Comum"];
    optionsFuncao.forEach(function(item) {
        var option = document.createElement("option");
        option.text = item;
        if (item === "Função") {
            option.setAttribute("selected", true);
            option.setAttribute("disabled", true);
        } else {
            option.setAttribute("value", item.toLowerCase().replace(/ /g, "_"));
        }
        selectFuncao.appendChild(option);
    });
    selectFuncao.setAttribute("id", "funcao" + numero);
    selectFuncao.classList.add("funcao");

    setTimeout(function() {
        // Adiciona os elementos criados ao início do formulário
        form.insertBefore(linha,  form.firstChild);
        form.insertBefore(selectFuncao, form.firstChild);
        form.insertBefore(spanConfSenha, form.firstChild);
        form.insertBefore(inputConfSenha, form.firstChild);
        form.insertBefore(spanSenha, form.firstChild);
        form.insertBefore(inputSenha, form.firstChild);
        form.insertBefore(inputEmail, form.firstChild);
        form.insertBefore(inputNome, form.firstChild);
    }, 1000);

    
    // Anexe o teclado virtual ao campo de entrada criado dinamicamente
    attachKeyboardToInput(inputNome);
    attachKeyboardToInput(inputEmail);
    attachNumericKeyboardToInput(inputSenha);
    attachNumericKeyboardToInput(inputConfSenha);

    numero ++;
}


function passoAnterior() {
    window.location.href='../../telas/primeiro_passos/cadastro_zona.html';

}

function pularpasso() {
    modal('Configurações concluídas com sucesso!' +
    ' Agora, você seu sistema já está pronto para ser utilizado.', '../../modal/html/modal_sucesso.html', 5000, '75px');
}

function concluir() {
    modal('Configurações concluídas com sucesso!' +
    ' Agora, você seu sistema já está pronto para ser utilizado.', '../../modal/html/modal_sucesso.html', 5000, '75px');
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