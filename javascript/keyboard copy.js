function teste() {
    // Define um objeto Keyboard que conterá as funcionalidades do teclado virtual 
const Keyboard = {
    // Elementos do teclado
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    // Manipuladores de eventos
    eventHandlers: {
        oninput: null,
        onclose: null
    },

    // Propriedades do teclado
    properties: {
        value: "",
        capsLock: false
    },

    // Inicializa o teclado
    init() {
        // Cria os elementos principais do teclado
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Configura os elementos principais
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Adiciona os elementos ao DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automaticamente abre o teclado para elementos com a classe .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    // Cria as teclas do teclado
    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keySymbols = [
            "!", "@", "#", "$", "%", "¨", "&", "*", "(", ")", "_", "+", "?","-",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "ç", "⌫",
            "⇪", "a", "s", "d", "f", "g", "h", "j", "k", "l", "↲",
            "z", "x", "c", "v", "b", "n", "m", ",", ".",  "✔",
            ".com", "␣", ".br"
        ];

        // Cria HTML para um ícone
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keySymbols.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["⌫", "✔", "↲", "-", "="].indexOf(key) !== -1;

            // Adiciona atributos/classes ao elemento do botão
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            // Casos especiais para teclas específicas
            switch (key) {
                case "⌫":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "⇪":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "↲":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "␣":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "✔":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    // Aciona um evento
    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    // Altera o estado do Caps Lock
    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    // Abre o teclado
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    // Fecha o teclado
    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = null;
        this.eventHandlers.onclose = null;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

// Inicializa o teclado quando o DOM estiver pronto
window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

// Adiciona eventos de foco para campos de entrada com a classe .use-keyboard-input
document.addEventListener("DOMContentLoaded", function () {
    const alphanumericInputs = document.querySelectorAll(".use-keyboard-input");

    alphanumericInputs.forEach(input => {
        input.addEventListener("focus", () => {
            Keyboard.open(input.value, function (currentValue) {
                input.value = currentValue;
            });
        });
    });
});

// Fecha o teclado quando se clica fora dele ou em elementos que não o utilizam
document.addEventListener("click", (event) => {
    if (!event.target.closest(".keyboard") && !event.target.closest(".use-keyboard-input")) {
        Keyboard.close();
    }
    if(document.querySelector('.use-numerico-input')) {
        if (!event.target.closest(".numeric") && !event.target.closest(".use-numerico-input")) {
            NumericKeyboard.close();
        }
    }
});
}