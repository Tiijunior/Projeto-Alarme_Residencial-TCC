const NumericKeyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: ""
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("numeric", "numeric--hidden");
        this.elements.keysContainer.classList.add("numeric__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".numeric__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use numeric keyboard for elements with .use-numerico-input
        document.querySelectorAll(".use-numerico-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

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

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("numeric__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("numeric__key--wide");
                    keyElement.innerHTML = "⌫";
                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.slice(0, -1);
                        this._triggerEvent("oninput");
                    });
                    break;

                case "done":
                    keyElement.classList.add("numeric__key--extra-wide", "numeric__key--dark");
                    keyElement.innerHTML = "✓";
                    keyElement.addEventListener("click", () => {
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
                        this.properties.value += key;
                        this._triggerEvent("oninput");
                    });
                    break;
            }

            fragment.appendChild(keyElement);
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] === "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("numeric--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = null;
        this.eventHandlers.onclose = null;
        this.elements.main.classList.add("numeric--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    NumericKeyboard.init();
});

document.addEventListener("DOMContentLoaded", function () {
    const numericoInputs = document.querySelectorAll(".use-numerico-input");

    numericoInputs.forEach(input => {
        input.addEventListener("focus", () => {
            NumericKeyboard.open(input.value, function (currentValue) {
                input.value = currentValue;
            });
        });
    });
});
