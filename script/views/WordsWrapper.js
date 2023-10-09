import View from "./View.js";

class WordsWrapper extends View {
    _parentElement = document.querySelector(".words-wrapper");
    _errorCount = 0;

    renderText(words) {
        this._parentElement.innerHTML = "";

        // Create word and letter elements for each word and letters
        words.forEach((word) => {
            var letterEl = "";

            for (let i = 0; i < word.length; i++) {
                letterEl += `<div class="letter">${word[i]}</div>`;
            }

            const wordEl = `<div class="word">${letterEl}</div>`;

            this._parentElement.insertAdjacentHTML("beforeend", wordEl);
        });
    }

    validateText(inputArr, inputType) {
        const currWord = this._getWordOfType(inputArr.length);

        const currInputWordArr = inputArr[inputArr.length - 1].split("");

        currWord && currWord.classList.remove("incorrect");

        currWord && this._clearClass(currWord.childNodes, ["correct", "incorrect"]);

        currWord && this._removeExtraLetters(currWord);

        currInputWordArr.forEach((letter, index) => {
            const letterEl = currWord.childNodes[index];

            if (!letterEl) {
                const extraLetter = `<div class="letter extra">${letter}</div>`;

                return (currWord.innerHTML += extraLetter);
            }

            // Validate letter
            if (letterEl.textContent === letter) letterEl.classList.add("correct");
            else letterEl.classList.add("incorrect");
        });

        // Validate previous word
        if (!currInputWordArr[0]) {
            const prevWord = this._getWordOfType(inputArr.length - 1);

            if (prevWord?.querySelector(":not(.correct)")) {
                prevWord.classList.add("incorrect");

                this._errorCount++;
            }
            return;
        }

        // Validate letter for error count
        if (inputType !== "insertText") return;

        const currLetter = currWord?.childNodes[inputArr.slice(-1)[0].length - 1];

        if (!currLetter.classList.contains("correct")) this._errorCount++;
    }

    getResults() {
        const results = {
            wordCount: this._wordCount.length,
            letterCount: this._letterCount.length,
            correctLetters: this._correctCharacters.length,
            incorrectLetters: this._incorrectCharacters.length,
            missedLetters: this._missedCharacters.length,
            extraLetters: this._extraLetters.length,
            errorCount: this._errorCount,
            words: this._parentElement.innerHTML,
        };

        return results;
    }

    removeUnusedLetters(inputArr) {
        const wordsEl = document.querySelectorAll(".word");

        const isWordEmpty = inputArr[inputArr.length - 1] ? 1 : 2;

        const currWord = wordsEl[inputArr.length - isWordEmpty];

        this._removeNextElementSibling(currWord);

        const currLetterIndex = inputArr.slice(-1)[0].length - 1;

        const currLetter = currWord?.childNodes[currLetterIndex];

        if (!currLetter) return;

        this._removeNextElementSibling(currLetter);
    }

    resetErrorCount() {
        this._errorCount = 0;
    }

    get _correctCharacters() {
        return this._parentElement.querySelectorAll(".letter.correct");
    }

    get _incorrectCharacters() {
        return this._parentElement.querySelectorAll(".letter.incorrect");
    }

    get _missedCharacters() {
        return this._parentElement.querySelectorAll("[class='letter']");
    }

    get _wordCount() {
        return this._parentElement.querySelectorAll(".word");
    }

    get _letterCount() {
        return this._parentElement.querySelectorAll(".letter");
    }

    get _extraLetters() {
        return this._parentElement.querySelectorAll(".letter.extra");
    }

    _removeNextElementSibling(startEl) {
        const elSibling = startEl.nextSibling;

        if (!elSibling) return;

        this._removeNextElementSibling(elSibling);

        elSibling.remove();
    }

    _removeExtraLetters(wordEl) {
        const extraLetters = wordEl.querySelectorAll(".extra");

        extraLetters.forEach((letter) => {
            letter.remove();
        });
    }
}

export default new WordsWrapper();
