import View from "./View.js";

class Input extends View {
    _parentElement = document.querySelector("#words-input");

    constructor() {
        super();

        this._parentElement.focus();

        window.addEventListener("keydown", (e) => {
            if (e.code === "Tab" || e.code === "Enter") {
                return;
            }

            this._parentElement.focus();
        });
    }

    addHandlerInput(handler) {
        this._parentElement.addEventListener("input", (e) => {
            this._formatInput();

            handler(this.inputArr, e.inputType);
        });
    }

    get inputArr() {
        return this._parentElement.value.split(" ");
    }

    clearInput() {
        this._parentElement.value = "";
    }

    disableInput() {
        this._parentElement.disabled = true;
    }

    enableInput() {
        this._parentElement.disabled = false;
    }

    focusInput() {
        document.activeElement.blur();
        
        this._parentElement.focus();
    }

    _formatInput() {
        this._parentElement.value = this._parentElement.value
            .trimStart()
            .replace(/\s\s+/g, " ");
    }
}

export default new Input();
