import View from "./View.js";

class Navigation extends View {
    _parentElement = document.querySelector(".navigation");
    _modal = document.querySelector(".modal");
    _overlay = document.querySelector(".overlay");
    _btnCloseModal = document.querySelector(".btn--close-modal");
    _statsElement = document.querySelector("#stats");
    _customizeElement = document.querySelector("#customize");

    constructor() {
        super();

        this._overlay.addEventListener("click", () => this.toggleModal());
        this._btnCloseModal.addEventListener("click", () => this.toggleModal());
    }

    addHandlerStats(handler) {
        this._statsElement.addEventListener("click", () => {
            console.log("stat");
            this.toggleModal();
            handler();
        });
        // handler();
    }

    addHandlerCustomize(handler) {
        this._customizeElement.addEventListener("click", () => {
            console.log("customize");
            this.toggleModal();
        });
    }

    toggleModal() {
        this._modal.classList.toggle("hidden");
        this._overlay.classList.toggle("hidden");
    }
}

export default new Navigation();
