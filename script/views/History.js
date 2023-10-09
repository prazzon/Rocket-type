import View from "./View.js";

class History extends View {
    _parentElement = document.querySelector(".history-wrapper");
    _historyOptions = document.querySelector(".history-options-container");
    _historyContainer = document.querySelector(".history-container");

    addHistoryOptionHandler(handler) {
        this._historyOptions.addEventListener("click", (e) => {
            const btn = e.target.closest(".history-option");

            if (!btn) return;

            if (btn.classList.contains("active")) return;

            this._historyOptions.querySelector(".active").classList.remove("active");

            btn.classList.add("active");

            return handler(btn.dataset.option);
        });
    }

    addHistoryDetailHandler(handler) {
        this._historyContainer.addEventListener("click", (e) => {
            const btn = e.target.closest(".history-detail");

            if (!btn) return;

            handler(btn.dataset.id);
        });
    }

    selectActiveOption(option) {
        this._activeOption.classList.remove("active");

        const modeButton = document.querySelector(`[data-option='${option}']`);

        modeButton.classList.add("active");
    }

    DisplayHistoryOption(history, words) {
        const active = this._activeOption.dataset.option;

        // Render or update container based on active option

        if (active === "inputHistory") return this._updateContainer(words);

        if (active === "recent") return this._renderHistory(history.slice(0, 4));

        const sorted = [...history].sort((a, b) => b.wpm - a.wpm);

        this._renderHistory(sorted.slice(0, 4));
    }

    get _activeOption() {
        const active = this._parentElement.querySelector(".history-option.active");

        return active;
    }

    _renderHistory(histories) {
        this._historyContainer.innerHTML = "";

        histories.forEach((history) => {
            const stringEl = `
            <div class="history-detail" data-id="${history.id}">
                <div class="history-item">
                    <div class="history-item_title">wpm</div>
                    <div class="history-item_value">${Math.round(history.wpm)}</div>
                </div>
                <div class="history-item">
                    <div class="history-item_title">accuracy</div>
                    <div class="history-item_value">${Math.round(history.acc)}%</div>
                </div>
                <div class="history-item">
                    <div class="history-item_title">${history.mode}</div>
                    <div class="history-item_value">${history.type}</div>
                </div>
                <div class="history-item">
                    <div class="history-time">${this._formatTime(
                        history.timeElapse.timeStopped
                    )} </div>
                </div>
            </div>
            `;

            this._historyContainer.insertAdjacentHTML("beforeend", stringEl);
        });
    }

    _updateContainer(update) {
        const wordHistory = `<div class="input-history">${update}</div>`;

        this._historyContainer.innerHTML = "";

        this._historyContainer.insertAdjacentHTML("beforeend", wordHistory);
    }

    _formatTime(timeInMilliseconds) {
        const seconds = Math.round((Date.now() - timeInMilliseconds) / 1000);

        if (seconds < 1) return "now";

        if (seconds < 60) return seconds + "s ago"; // seconds

        if (seconds < 3600) return Math.floor(seconds / 60) + "m ago"; // minutes

        if (seconds < 86400) return Math.floor(seconds / 3600) + "h ago"; // hours

        return Math.floor(seconds / 86400) + "d ago"; // days
    }
}

export default new History();
