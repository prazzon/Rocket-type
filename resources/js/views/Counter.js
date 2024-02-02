import View from "./View.js";

class Counter extends View {
    _parentElement = document.querySelector(".counter");
    _counterId;

    setTimeCounter(length) {
        this._parentElement.textContent = `${length}`;
    }

    setCounter(length, counter = 0) {
        this._parentElement.textContent = `${counter}/${length}`;
    }

    addHandlerTimer(length, handler) {
        if (this._counterId) return;

        var counter = length;

        this._counterId = setInterval(() => {
            counter--;

            this._parentElement.textContent = `${counter}`;

            if (counter === 0) {
                clearInterval(this._counterId);

                this._counterId = null;

                return handler();
            }
        }, 1000);
    }

    resetCounter() {
        clearInterval(this._counterId);
        
        this._counterId = null;
    }
}

export default new Counter();