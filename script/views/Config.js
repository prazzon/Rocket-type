import View from "./View.js";

class Config extends View {
    _parentElement = document.querySelector(".configs");
    _counterEl = document.querySelector(".counter");
    _dividerEl = document.querySelector(".divider");

    addHandlerConfig(handler) {
        this._parentElement.addEventListener("click", (e) => {
            const btn = e.target.closest(".mode-button, .type-button");

            if (!btn) return;

            if (btn.classList.contains("active")) return;

            if (btn.dataset.type) {
                this.selectActiveType(btn.dataset.type);

                return handler({ ...btn.dataset });
            }

            const mode = btn.dataset.mode;

            const type = this._getActiveModeType(mode);

            this.selectActiveMode(mode);

            return handler({ ...btn.dataset, type });
        });
    }

    selectActiveMode(mode) {
        this._removeActiveClass(".mode-button");

        this._removeActiveClass(".type");

        this._addActiveClass(`[data-mode="${mode}"]`);

        this._addActiveClass(`.${mode}-type`);
    }

    selectActiveType(type) {
        const mode = this._getActiveMode();

        this._removeActiveClass(`.${mode}-type .type-button`);

        this._addActiveClass(`.${mode}-type [data-type="${type}"]`);
    }

    _removeActiveClass(query) {
        const el = this._parentElement.querySelector(`${query}.active`);

        el.classList.remove("active");
    }

    _addActiveClass(query) {
        const el = this._parentElement.querySelector(query);

        el.classList.add("active");
    }

    _getActiveMode() {
        return this._parentElement.querySelector(".mode-button.active").dataset.mode;
    }

    _getActiveModeType(mode) {
        return this._parentElement.querySelector(`.${mode}-type .type-button.active`)
            .dataset.type;
    }

    hideConfig() {
        this._parentElement.classList.add("hide");

        this._counterEl.classList.add("expand");

        this._dividerEl.classList.add("hide");
    }

    showConfig() {
        this._parentElement.classList.remove("hide");
        
        this._counterEl.classList.remove("expand");
        
        this._dividerEl.classList.remove("hide");
    }
}

export default new Config();
