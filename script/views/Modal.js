import View from "./View.js";

class Modal extends View {
    _parentElement = document.querySelector(".modal");
    _overlay = document.querySelector(".overlay");
    _closeModalBtn = document.querySelector(".btn--close-modal");

    constructor() {
        super();

        this._overlay.addEventListener("click", () => this.hideModal());
        this._closeModalBtn.addEventListener("click", () => this.hideModal());
    }

    showModal() {
        this._parentElement.classList.remove("hidden");
        this._overlay.classList.remove("hidden");
    }

    hideModal() {
        this._parentElement.classList.add("hidden");
        this._overlay.classList.add("hidden");
    }
}

export default new Modal();
