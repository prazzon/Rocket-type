import View from "./View.js";

class Stats extends View {
    _parentElement = document.querySelector("#stats-btn");
    _modalContent = document.querySelector(".modal-content");

    addHandlerStatBtn(handler) {
        this._parentElement.addEventListener("click", () => {
            handler();
        });
    }

    renderStats(stats, historyArr) {
        this._modalContent.innerHTML = "";

        const wpmList = historyArr.map((d) => d.wpm);
        const accList = historyArr.map((d) => d.acc);

        const element = `
            <div class="stats">
                <div class="stats-title">
                        <svg class="nav-icon">
                            <use xlink:href="/images/sprite.svg#icon-leaderboard"></use>
                        </svg>
                        Stats
                </div>
                <div class="stats-content-container">
                    <div class="stats-content">
                        <div class="stats-content__title">Tests started</div>
                        <div class="stats-content__value test-started">${
                            stats.testStarted
                        }</div>
                    </div>
                    <div class="stats-content">
                        <div class="stats-content__title">Tests completed</div>
                        <div class="stats-content__value test-completed">${
                            stats.testCompleted
                        }</div>
                    </div>
                    <div class="stats-content">
                        <div class="stats-content__title">time typing</div>
                        <div class="stats-content__value time-typing">${this._formatTime(
                            stats.timeTyping
                        )}</div>
                    </div>
                    <div class="stats-content">
                        <div class="stats-content__title">highest wpm</div>
                        <div class="stats-content__value highest-wpm">${Math.round(
                            this._highest(wpmList)
                        )}</div>
                    </div>
                    <div class="stats-content">
                        <div class="stats-content__title">average wpm</div>
                        <div class="stats-content__value avg-wpm">${Math.round(
                            this._average(wpmList)
                        )}</div>
                    </div>
                    <div class="stats-content">
                        <div class="stats-content__title">average wpm (last 10 tests)</div>
                        <div class="stats-content__value avg-wpm-lt">${Math.round(
                            this._averageLastN(wpmList, 10)
                        )}</div>
                    </div>
                    <div class="stats-content">
                        <div class="stats-content__title">highest accuracy</div>
                        <div class="stats-content__value highest-accuracy">${Math.round(
                            this._highest(accList)
                        )}%</div>
                    </div>
                    <div class="stats-content">
                        <div class="stats-content__title">average accuracy</div>
                        <div class="stats-content__value avg-accuracy">${Math.round(
                            this._average(accList)
                        )}%</div>
                    </div>
                    <div class="stats-content">
                        <div class="stats-content__title">average accuracy (last 10 tests)</div>
                        <div class="stats-content__value avg-accuracy-lt">${Math.round(
                            this._averageLastN(accList, 10)
                        )}%</div>
                    </div>
                </div>
                <div class="view-history-btn">Toggle History
                    <svg class="nav-icon">
                        <use xlink:href="/images/symbol-defs.svg#icon-caret-down"></use>
                    </svg>
                </div>
                <div class="recent-container">
                    <table class="recent-table">
                        <tr class="table-head">
                            <th>wpm</th>
                            <th>accuracy %</th>
                            <th>mode</th>
                            <th>type</th>
                            <th>chars</th>
                            <th>date</th>
                        </tr>
                    </table>
                </div>
            </div>
        `;

        this._modalContent.insertAdjacentHTML("beforeend", element);

        this._renderHistories(historyArr);

        const viewHistoryBtn = document.querySelector(".view-history-btn");
        const recentContainer = document.querySelector(".recent-container");
        const statsContainer = document.querySelector(".stats");

        viewHistoryBtn.addEventListener("click", () => {
            recentContainer.classList.toggle("active");
            statsContainer.classList.toggle("expand");
        });
    }

    _average(arr) {
        const sum = arr.reduce((a, b) => a + b, 0);
        return sum / arr.length;
    }

    _highest(arr) {
        return Math.max(...arr);
    }

    _averageLastN(arr, n) {
        const lastN = arr.slice(-n);
        return this._average(lastN);
    }

    _formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedTime = `${String(hours).padStart(2, "0")}:${String(
            minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        return formattedTime;
    }

    _formatDate(milliseconds) {
        const date = new Date(milliseconds);

        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        const formattedDate = date.toLocaleDateString("en-US", options);

        return formattedDate;
    }

    _renderHistories(histories) {
        const recentContainerTable = document.querySelector(".recent-table");

        histories.forEach((history) => {
            const string = `
                <tr class="table-data">
                    <td>${history.wpm.toFixed(2)}</th>
                    <td>${history.acc.toFixed(2)} %</th>
                    <td>${history.mode}</th>
                    <td>${history.type}</th>
                    <td>${history.correctLetters}/${history.incorrectLetters}/
                    ${history.extraLetters}/${history.missedLetters}</th>
                    <td>${this._formatDate(history.timeElapse.timeStopped)}</th>
                </tr>
            `;

            recentContainerTable.insertAdjacentHTML("beforeend", string);
        });
    }
}

export default new Stats();
