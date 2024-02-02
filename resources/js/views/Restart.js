import View from "./View.js";

class Restart extends View {
    _parentElement = document.querySelector(".restart-container");
    _startAgain = document.querySelector(".start-again");
    _nextTest = document.querySelector(".next-test");
    _restartTest = document.querySelector(".restart");

    addHandlerRestart(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".restart-btn");

            if (!btn) return;

            handler(btn.dataset.option);
        });
    }

    showRestartBtn() {
        this._startAgain.classList.add("hidden");
        this._nextTest.classList.remove("hidden");
        this._restartTest.classList.remove("hidden");
    }

    hideRestartBtn() {
        this._startAgain.classList.remove("hidden");
        this._nextTest.classList.add("hidden");
        this._restartTest.classList.add("hidden");
    }
}

export default new Restart();
