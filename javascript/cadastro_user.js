var numero = 2;
var ultimoInputFocado;
var nome_admin = localStorage.getItem('nome_admin');

//declaração das variáveis para armazenar valores do sensores
var gnome = [];
var gemail = [];
var gtelefone = [];
var gtipotelefone = [];
var gsenha = [];
var gfuncao = [];


// Armazena qual é o ultimo input que entrou em focus.
function atualizarInputs() {
    var inputs = document.querySelectorAll('.use-keyboard-input');

    // Armazena qual é o ultimo input que entrou em focus.
    inputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            ultimoInputFocado = this;
        });
    });
}
atualizarInputs();


// Garante que o input criado dinamicamente vai receber valores do teclado virtual
function attachKeyboardToInput(inputElement) {
    inputElement.addEventListener("focus", () => {
        Keyboard.open(inputElement.value, (currentValue) => {
            inputElement.value = currentValue;
        });
    });
}

// Garante que o input criado dinamicamente vai receber valores do teclado numerico virtual
function attachNumericKeyboardToInput(inputElement) {
    inputElement.addEventListener("focus", () => {
        NumericKeyboard.open(inputElement.value, (currentValue) => {
            inputElement.value = currentValue;
        });
    });
}




function adicionar_novoperfil() {

    if((numero - 1) === 1) {
        gnome.push(document.getElementById("nome1").value);
        gemail.push(document.getElementById("email1").value);
        gtelefone.push(document.getElementById("telefone1").value);
        gtipotelefone.push(document.getElementById("tipo_telefone1").value);
        gsenha.push(document.getElementById("senha").value);
        gfuncao.push(document.getElementById("funcao1").value);
    } else {
        gnome.push(document.getElementById("nome" + (numero - 1)).value);
        gemail.push(document.getElementById("email" + (numero - 1)).value);
        gtelefone.push(document.getElementById("telefone" + (numero - 1)).value);
        gtipotelefone.push(document.getElementById("tipo_telefone" + (numero - 1)).value);
        gsenha.push(document.getElementById("senha" + (numero - 1)).value);
        gfuncao.push(document.getElementById("funcao" + (numero - 1)).value);
    }
        
    document.getElementById('btn_anterior').style.transition = '1s';
    document.getElementById('btn_anterior').textContent = "Remover perfil";
    document.getElementById('btn_anterior').style.marginTop = '25px';
    document.getElementById('btn_novoperfil').style.transition = '1s';
    document.getElementById('btn_novoperfil').style.marginTop = '25px';
    document.getElementById('btn_pularpasso').style.transition = '1s';
    document.getElementById('btn_pularpasso').style.marginTop = '25px';
    document.getElementById('btn_entrar').style.transition = '1s';
    document.getElementById('btn_entrar').style.marginTop = '25px';
    
    // Seleciona o elemento do formulário
    var form = document.querySelector("#formulario");

    // Cria os elementos
    var inputNome = document.createElement("input");
    var inputEmail = document.createElement("input");
    var inputSenha = document.createElement("input");
    var inputConfSenha = document.createElement("input");
    var inputTelefone = document.createElement("input");
    var selecTipo = document.createElement("select");
    var selectFuncao = document.createElement("select");
    var linha = document.createElement("hr");
    var spanSenha = document.createElement("span");
    var spanConfSenha = document.createElement("span");
    var spanCheck = document.createElement("span");

    // Configura os atributos do inputNome
    inputNome.setAttribute("id", "nome" + numero);
    inputNome.classList.add("nome", "use-keyboard-input");
    inputNome.setAttribute("type", "text");
    inputNome.setAttribute("placeholder", "Nome");
    inputNome.setAttribute("onclick", "moverInputs('subir')");
    
    // Configura os atributos do inputEmail
    inputEmail.setAttribute("id", "email" + numero);
    inputEmail.classList.add("email", "use-keyboard-input");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("placeholder", "E-mail");

    // Configura os atributos do inputTelefone
    inputTelefone.setAttribute("id", "telefone" + numero);
    inputTelefone.classList.add("telefone", "use-keyboard-input");
    inputTelefone.setAttribute("type", "text");
    inputTelefone.setAttribute("placeholder", "Telefone");

    // Configura os atributos do selectTipo_Telefone
    var optionsTelefone = ["", "Fixo", "Celular"];
    optionsTelefone.forEach(function(item) {
        var option = document.createElement("option");
        if (item === "") {
            option.text = "Tipo de Telefone";
            option.setAttribute("selected", true);
            option.setAttribute("disabled", true);
        } else {
            option.text = item;
            option.setAttribute("value", item.toLowerCase().replace(/ /g, "_"));
        }
        selecTipo.appendChild(option);
    });
    selecTipo.setAttribute("id", "tipo_telefone" + numero);
    selecTipo.classList.add("tipo_telefone", "input");
    
    // Configura os atributos do inputSenha
    inputSenha.setAttribute("id", "senha" + numero);
    inputSenha.classList.add("senha", "use-numerico-input");
    inputSenha.setAttribute("type", "password");
    inputSenha.setAttribute("placeholder", "Senha");
    inputSenha.setAttribute("onclick", "moverNumericKeyboard()");

    // Configura os atributos do inputConfSenha
    inputConfSenha.setAttribute("id", "conf_senha" + numero);
    inputConfSenha.classList.add("conf_senha", "use-numerico-input");
    inputConfSenha.setAttribute("type", "password");
    inputConfSenha.setAttribute("placeholder", "Confirmação de senha");    

    // Configura os atributos do spanSenha
    spanSenha.setAttribute("id", "exibir_senha" + numero);
    spanSenha.classList.add("icon", "exibir");
    spanSenha.style.top = '54px';
    spanSenha.style.left = '400px';
    spanSenha.onclick = function() { exibir(this.id);};

    // Configura os atributos do spanConfSenha
    spanConfSenha.setAttribute("id", "exibir_conf_senha" + numero);
    spanConfSenha.classList.add("icon", "exibir");
    spanConfSenha.style.top = '60px';
    spanConfSenha.style.left = '850px';
    spanConfSenha.onclick = function() { exibir(this.id);};

    // Configura os atributos do spanCheck
    spanCheck.setAttribute('id', "check" + numero)
    spanCheck.classList.add("icon", "check");
    spanCheck.style.position = 'relative';
    
    // Configura as opções do selectFuncao
    var optionsFuncao = ["", "Administrador", "Usuário Comum"];
    optionsFuncao.forEach(function(item) {
        var option = document.createElement("option");
        if (item === "") {
            option.text = "Tipo de Usuário";
            option.setAttribute("value", "");
            option.setAttribute("selected", true);
            option.setAttribute("disabled", true);
        } else {
            option.text = item;
            if (item === "Administrador") {
                option.setAttribute("value", "administrador");
            } else {
                option.setAttribute("value", "usuario");
            }
        }
        selectFuncao.appendChild(option);
    });
    selectFuncao.setAttribute("id", "funcao" + numero);
    selectFuncao.classList.add("funcao");
    selectFuncao.style.top = '-50px';
    selectFuncao.style.marginBottom = '10px';

    setTimeout(function() {
        // Adiciona os elementos criados ao início do formulário
        form.insertBefore(linha,  form.firstChild);
        form.insertBefore(selectFuncao, form.firstChild);
        form.insertBefore(spanCheck, form.firstChild)
        form.insertBefore(spanConfSenha, form.firstChild);
        form.insertBefore(inputConfSenha, form.firstChild);
        form.insertBefore(spanSenha, form.firstChild);
        form.insertBefore(inputSenha, form.firstChild);
        form.insertBefore(selecTipo, form.firstChild);
        form.insertBefore(inputTelefone, form.firstChild);
        form.insertBefore(inputEmail, form.firstChild);
        form.insertBefore(inputNome, form.firstChild);
        atualizarInputs();
    }, 1000);

    
    // Anexe o teclado virtual ao campo de entrada criado dinamicamente
    attachKeyboardToInput(inputNome);
    attachKeyboardToInput(inputEmail);
    attachKeyboardToInput(inputTelefone);
    attachNumericKeyboardToInput(inputSenha);
    attachNumericKeyboardToInput(inputConfSenha);
    
    numero ++;
}


function passoAnterior() {
    if(numero === 3) {
        document.getElementById('btn_anterior').style.transition = '1s';
        document.getElementById('btn_anterior').textContent = "Passo anterior";
        document.getElementById('btn_anterior').style.marginTop = '0';
        document.getElementById('btn_novoperfil').style.transition = '1s';
        document.getElementById('btn_novoperfil').style.marginTop = '0';
        document.getElementById('btn_pularpasso').style.transition = '1s';
        document.getElementById('btn_pularpasso').style.marginTop = '0';
        document.getElementById('btn_entrar').style.transition = '1s';
        document.getElementById('btn_entrar').style.marginTop = '0';

        var inputNome = document.getElementById("nome" + (numero - 1));
        var inputEmail = document.getElementById("email" + (numero - 1));
        var inputSenha = document.getElementById("senha" + (numero - 1));
        var inputConfSenha = document.getElementById("conf_senha"  + (numero - 1));
        var inputTelefone = document.getElementById("telefone" + (numero - 1));
        var selecTipo = document.getElementById("tipo_telefone" + (numero - 1));
        var selectFuncao = document.getElementById("funcao" + (numero - 1));
        var linha = document.querySelector("hr");
        var spanSenha = document.getElementById("exibir_senha" + (numero - 1));
        var spanConfSenha = document.getElementById("exibir_conf_senha" + (numero - 1));
        var spanCheck = document.getElementById("check" + (numero - 1));

        inputNome.parentNode.removeChild(inputNome);
        inputEmail.parentNode.removeChild(inputEmail);
        inputSenha.parentNode.removeChild(inputSenha);
        inputConfSenha.parentNode.removeChild(inputConfSenha);
        inputTelefone.parentNode.removeChild(inputTelefone);
        selecTipo.parentNode.removeChild(selecTipo);
        selectFuncao.parentNode.removeChild(selectFuncao);
        linha.parentNode.removeChild(linha);
        spanSenha.parentNode.removeChild(spanSenha);
        spanConfSenha.parentNode.removeChild(spanConfSenha);
        spanCheck.parentNode.removeChild(spanCheck);
        numero --;

    } else if(numero > 3) {
        var inputNome = document.getElementById("nome" + (numero - 1));
        var inputEmail = document.getElementById("email" + (numero - 1));
        var inputSenha = document.getElementById("senha" + (numero - 1));
        var inputConfSenha = document.getElementById("conf_senha"  + (numero - 1));
        var inputTelefone = document.getElementById("telefone" + (numero - 1));
        var selecTipo = document.getElementById("tipo_telefone" + (numero - 1));
        var selectFuncao = document.getElementById("funcao" + (numero - 1));
        var linha = document.querySelector("hr");
        var spanSenha = document.getElementById("exibir_senha" + (numero - 1));
        var spanConfSenha = document.getElementById("exibir_conf_senha" + (numero - 1));
        var spanCheck = document.getElementById("check" + (numero - 1));

        inputNome.parentNode.removeChild(inputNome);
        inputEmail.parentNode.removeChild(inputEmail);
        inputSenha.parentNode.removeChild(inputSenha);
        inputConfSenha.parentNode.removeChild(inputConfSenha);
        inputTelefone.parentNode.removeChild(inputTelefone);
        selecTipo.parentNode.removeChild(selecTipo);
        selectFuncao.parentNode.removeChild(selectFuncao);
        linha.parentNode.removeChild(linha);
        spanSenha.parentNode.removeChild(spanSenha);
        spanConfSenha.parentNode.removeChild(spanConfSenha);
        spanCheck.parentNode.removeChild(spanCheck);
        numero --;
    } else {
        window.location.href='../../telas/primeiro_passos/cadastro_zona.html';
    }

}

function pularpasso() {
    modal('Configurações concluídas com sucesso!' +
    ' Agora o seu sistema já está pronto para ser utilizado.', '../../modal/html/modal_sucesso.html', 8000, '51px');
    setTimeout(() =>{
        window.location.replace('../../index.html');
    }, 8300);
}

function concluir() {
    if((document.getElementById("nome1").value) === "") {
        modal('Configurações concluídas com sucesso!' +
              ' Agora o seu sistema já está pronto para ser utilizado.', '../../modal/html/modal_sucesso.html', 8000, '51px');
        setTimeout(() =>{
            window.location.replace('../../index.html');
        }, 8300);
    } else {
        if((numero - 1) === 1) {
            gnome.push(document.getElementById("nome1").value);
            gemail.push(document.getElementById("email1").value);
            gtelefone.push(document.getElementById("telefone1").value);
            gtipotelefone.push(document.getElementById("tipo_telefone1").value);
            gsenha.push(document.getElementById("senha").value);
            gfuncao.push(document.getElementById("funcao1").value);
            cadastro();
        } else if((document.getElementById("nome" + (numero - 1)).value !== '')) {
            gnome.push(document.getElementById("nome" + (numero - 1)).value);
            gemail.push(document.getElementById("email" + (numero - 1)).value);
            gtelefone.push(document.getElementById("telefone" + (numero - 1)).value);
            gtipotelefone.push(document.getElementById("tipo_telefone" + (numero - 1)).value);
            gsenha.push(document.getElementById("senha" + (numero - 1)).value);
            gfuncao.push(document.getElementById("funcao" + (numero - 1)).value);
            cadastro();
        }
    }
};

function sucesso(mensagem) {
    if(mensagem.includes('sucesso')){
        modal('Configurações concluídas com sucesso!' +
              ' Agora o seu sistema já está pronto para ser utilizado.', '../../modal/html/modal_sucesso.html', 8000, '51px');
        setTimeout(() =>{
            window.location.replace('../../index.html');
        }, 8300);
    }        
};



function moverInputs(mover) {
    if(mover === 'subir') {
        if(ultimoInputFocado !== undefined) {
            var nome = ultimoInputFocado.id.includes('nome' + (numero - 1));
            var email = ultimoInputFocado.id.includes('email' + (numero - 1));
            var telefone = ultimoInputFocado.id.includes('telefone' + (numero - 1));
            if(nome || email) {
                document.querySelector('.saudacao').style.display = 'none';
                document.querySelector('.relogio').style.display = 'none';
                document.querySelector('.texto').style.top = '50px';
                document.getElementById('formulario').style.transition = '0.5s';
                document.getElementById('formulario').style.marginTop = '50px';
            } else if(telefone) {
                document.querySelector('.saudacao').style.display = 'none';
                document.querySelector('.relogio').style.display = 'none';
                document.querySelector('.texto').style.transition = '0.5s';
                document.querySelector('.texto').style.zIndex = '-10';
                document.querySelector('.texto').style.top = '-30px';
                document.getElementById('formulario').style.transition = '0.5s';
                document.getElementById('formulario').style.marginTop = '-130px';
            }
        }
    } else if(mover === 'descer') {
        if(ultimoInputFocado !== undefined) {
            var nome = ultimoInputFocado.id.includes('nome' + (numero - 1));
            var email = ultimoInputFocado.id.includes('email' + (numero - 1));
            var telefone = ultimoInputFocado.id.includes('telefone' + (numero - 1));
            if(nome || email){
                document.querySelector('.saudacao').style.display = '';
                document.querySelector('.relogio').style.display = '';
                document.querySelector('.texto').style.top = '99px';
                document.getElementById('formulario').style.marginTop = '125px';
            } else if(telefone) {
                document.querySelector('.saudacao').style.display = '';
                document.querySelector('.relogio').style.display = '';
                document.querySelector('.texto').style.transition = '0.5s';
                document.querySelector('.texto').style.zIndex = '';
                document.querySelector('.texto').style.top = '';
                document.getElementById('formulario').style.marginTop = '125px';
                document.getElementById("nome" + (numero - 1)).style.display = '';
                document.getElementById("email" + (numero - 1)).style.display = '';
            }
        }
    }
};

function moverNumericKeyboard() {
    var elementos = document.querySelectorAll('.conf_senha, .senha');

    elementos.forEach(function(elemento) {
        elemento.addEventListener('focus', function() {
            if (this.className.includes('conf_senha')) {
                document.querySelector('.numeric').style.left = '25%';
            } else if (this.className.includes('senha')) {
                document.querySelector('.numeric').style.left = '50%';
            }
        });
    });
}

