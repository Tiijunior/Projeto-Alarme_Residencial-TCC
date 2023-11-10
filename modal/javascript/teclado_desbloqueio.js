// Definição de um objeto NumericKeyboard para encapsular a funcionalidade do teclado numérico
const NumericKeyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null, // Manipulador de evento para entrada de dados
        onclose: null  // Manipulador de evento para fechar o teclado
    },

    properties: {
        value: "" // Valor atual do teclado numérico
    },

    init() {
        // Criação dos principais elementos do teclado numérico
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Configuração dos principais elementos com classes CSS
        this.elements.main.classList.add("numeric", "numeric--hidden");
        this.elements.keysContainer.classList.add("numeric__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        // Seleciona todos os elementos com a classe 'numeric__key' e armazena em this.elements.keys
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".numeric__key");

        // Adiciona os elementos do teclado numérico ao DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automaticamente abre o teclado numérico para elementos com a classe 'use-numerico-input' ao receber foco
        document.querySelectorAll(".use-numerico-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    // Cria os botões do teclado numérico com os valores e eventos associados
    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3",
            "4", "5", "6",
            "7", "8", "9",
            "0", "backspace",
            "done"
        ];

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");

            // Adiciona atributos/classes aos botões
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("numeric__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("numeric__key--wide");
                    keyElement.innerHTML = "⌫";
                    keyElement.addEventListener("click", () => {
                        // Remove o último caractere do valor e aciona o evento oninput
                        this.properties.value = this.properties.value.slice(0, -1);
                        this._triggerEvent("oninput");
                    });
                    break;

                case "done":
                    keyElement.classList.add("numeric__key--extra-wide", "numeric__key--dark");
                    keyElement.innerHTML = "✓";
                    keyElement.addEventListener("click", () => {
                        // Fecha o teclado e aciona o evento onclose
                        this.close();
                        this._triggerEvent("onclose");
                    });
                    break;

                case "":
                    keyElement.classList.add("numeric__key--hidden");
                    break;

                default:
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        // Adiciona o valor do botão ao valor atual e aciona o evento oninput
                        this.properties.value += key;
                        this._triggerEvent("oninput");
                    });
                    break;
            }

            fragment.appendChild(keyElement);
        });

        return fragment;
    },

    // Aciona um evento especificado, se um manipulador de evento estiver definido
    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] === "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    // Abre o teclado numérico com um valor inicial e manipuladores de eventos
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("numeric--hidden");
    },

    // Fecha o teclado numérico e limpa os manipuladores de eventos
    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = null;
        this.eventHandlers.onclose = null;
        this.elements.main.classList.add("numeric--hidden");
    }
};

// Inicializa o teclado numérico quando o conteúdo da página é carregado
window.addEventListener("DOMContentLoaded", function () {
    NumericKeyboard.init();

    // Obtenha os campos de entrada
    const inputs = Array.from(document.querySelectorAll('.quadro_senha'));

    // Inicialize uma variável para rastrear o índice do último input preenchido
    let lastFilledInputIndex = -1;

    // Adicione um ouvinte de evento de clique para cada botão do teclado numérico
    NumericKeyboard.elements.keys.forEach(key => {
        key.addEventListener('click', () => {
            const value = key.textContent;

            // Adicione o valor do botão ao valor atual
            NumericKeyboard.properties.value += value;

            // Encontre o primeiro campo de entrada vazio
            const emptyInput = inputs.find(input => input.value === '');

            if (emptyInput) {
                emptyInput.value = '';

                // Atualize o índice do último input preenchido
                lastFilledInputIndex = inputs.indexOf(emptyInput);

                // Verifique se o último input foi preenchido
                if (lastFilledInputIndex === 6) {
                    NumericKeyboard.close();
                } else {
                    // Caso contrário, foque no próximo campo de entrada
                    inputs[lastFilledInputIndex].focus();
                }
            }
        });
    });

    // Modificação para voltar para o input anterior quando o botão "backspace" é pressionado
    NumericKeyboard.elements.keysContainer.querySelector(".numeric__key--wide").addEventListener("click", () => {
        const focusedInput = document.activeElement;
        const index = inputs.indexOf(focusedInput);
    
        if (index >= 0) { // Verificar se o índice é maior ou igual a zero
            if (index > 0) {
                const previousInput = inputs[index - 1];
                previousInput.value = '';
                previousInput.focus();
            }
        }
    });
});
