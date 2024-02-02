import View from "./View.js";

class Caret extends View {
    _parentElement = document.querySelector(".caret");
    _wordsWrapper = document.querySelector(".words-wrapper");

    moveCaret(inputArr) {
        const currWord = this._getWordOfType(inputArr.length);

        if (!currWord) return;

        const currLetter = currWord?.childNodes[inputArr.slice(-1)[0].length - 1];

        const scroll = currWord.offsetTop - currWord.offsetHeight - 20;

        const maxScroll = this._wordsWrapper.scrollHeight - this._wordsWrapper.clientHeight - 1;

        const scrollOffset = Math.min(Math.max(scroll, 0), maxScroll);

        this._wordsWrapper.scrollTo({ top: scrollOffset, behavior: "smooth"});

        // this._wordsWrapper.style.transform = `translateY(-${scrollOffset}px)`;
        
        const position = {
            top: currLetter
                ? currLetter.offsetTop - scrollOffset
                : currWord.offsetTop - scrollOffset,
            left: currLetter ? currLetter.offsetLeft : currWord.offsetLeft,
            width: currLetter ? currLetter.offsetWidth : 0,
        };

        this._parentElement.style.top = `${position.top}px`;

        this._parentElement.style.left = `${position.left + position.width}px`;
    }

    hideCaret() {
        this._parentElement.classList.add("hide");
    }

    showCaret() {
        this._parentElement.classList.remove("hide");
        this.moveCaret([""]);
    }

    startAnimation() {
        this._parentElement.classList.add("animate");
    }

    stopAnimation() {
        this._parentElement.classList.remove("animate");
    }
}

export default new Caret();
