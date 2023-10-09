import View from "./View.js";
import WordsWrapper from "./WordsWrapper.js";

class Result extends View {
    _parentElement = document.querySelector(".result-container");
    _configEl = document.querySelector(".config-container");
    _resultWrapper = document.querySelector(".result-wrapper");
    _wordsWrapper = document.querySelector(".words-wrapper");
    _wpmEl = document.querySelector("#wpm");
    _accuracyEl = document.querySelector("#accuracy");
    _timeEl = document.querySelector("#time");
    _testValue = document.querySelector(".test-value");
    _typeValue = document.querySelector(".type-value");
    _rawValue = document.querySelector(".raw-value");
    _characterValue = document.querySelector(".character-value");

    showResult(result) {
        this._parentElement.classList.remove("hidden");

        this._resultWrapper.classList.remove("hidden");

        this._configEl.classList.add("hidden");

        this._wordsWrapper.classList.add("hidden");

        // this._wpmEl.textContent = result.wpm.toFixed(2);
        // this._accuracyEl.textContent = result.accuracy.toFixed(2) + "%";
        // this._timeEl.textContent = result.time.toFixed(2);

        // round to nearest integer
        this._wpmEl.textContent = Math.round(result.wpm);
        
        this._accuracyEl.textContent = Math.round(result.acc) + "%";
        
        this._timeEl.textContent = Math.round(result.time);

        // this._parentElement.scrollIntoView({ behavior: "smooth" });


        this._testValue.textContent = result.mode;

        this._typeValue.textContent = result.type;

        this._rawValue.textContent = Math.round(result.raw);

        this._characterValue.textContent = result.letterCount;
    }

    hideResult() {
        this._parentElement.classList.add("hidden");

        this._configEl.classList.remove("hidden");

        this._resultWrapper.classList.add("hidden");

        this._wordsWrapper.classList.remove("hidden");
    }
}

export default new Result();
