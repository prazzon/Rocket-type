import View from "./View.js";

class Restart extends View {
    _parentElement = document.querySelector('.restart-container');
    
    addHandlerRestart(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.restart-btn');

            if (!btn) return;

            handler(btn.dataset.option);
        });
    }
}

export default new Restart();