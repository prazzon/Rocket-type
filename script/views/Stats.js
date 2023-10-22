import View from "./View.js";

class Stats extends View {
    _parentElement = document.querySelector(".stats");
    _testStarted = document.querySelector(".test-started");
    _testCompleted = document.querySelector(".test-completed");
    _timeTyping = document.querySelector(".time-typing");
    _highestWpm = document.querySelector(".highest-wpm");
    _avgWpm = document.querySelector(".avg-wpm");
    _avgWpmLt = document.querySelector(".avg-wpm-lt");
    _highestAcc = document.querySelector(".highest-accuracy");
    _avgAcc = document.querySelector(".avg-accuracy");
    _avgAccLt = document.querySelector(".avg-accuracy-lt");
    _viewHistoryBtn = document.querySelector(".stats-view-history-btn");

    DisplayStats(stats, historyArr) {
        this._testStarted.textContent = stats.testStarted;
        this._testCompleted.textContent = stats.testCompleted;
        this._timeTyping.textContent = this._formatTime(stats.timeTyping);

        const wpmList = historyArr.map((d) => d.wpm);
        const accList = historyArr.map((d) => d.acc);

        this._highestWpm.textContent = Math.round(this._highest(wpmList));
        this._avgWpm.textContent = Math.round(this._average(wpmList));
        this._avgWpmLt.textContent = Math.round(this._averageLastN(wpmList, 10));
        this._highestAcc.textContent = Math.round(this._highest(accList)) + "%";
        this._avgAcc.textContent = Math.round(this._average(accList)) + "%";
        this._avgAccLt.textContent = Math.round(this._averageLastN(accList, 10)) + "%";
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
}

export default new Stats();
