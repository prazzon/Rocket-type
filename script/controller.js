import * as model from "./model.js";
import Config from "./views/Config.js";
import Input from "./views/Input.js";
import WordsWrapper from "./views/WordsWrapper.js";
import Caret from "./views/Caret.js";
import Counter from "./views/Counter.js";
import Result from "./views/Result.js";
import Chart from "./views/Chart.js";
import History from "./views/History.js";
import Restart from "./views/Restart.js";

async function init() {
    Config.selectActiveMode(model.state.config.mode);

    Config.selectActiveType(model.state.config.type);

    await model.loadText();

    WordsWrapper.renderText(model.state.words);

    Caret.moveCaret([""]);

    setCounter();
}
init();

Config.addHandlerConfig(async (config) => {
    model.updateConfig(config);

    await model.loadText();

    WordsWrapper.renderText(model.state.words);

    setCounter();
});

Input.addHandlerInput(function (inputArr, inputType) {
    if (!model.state.testStarted && inputArr[0]) {
        model.startTest();

        Caret.stopAnimation();

        Config.hideConfig();

        if (model.state.config.mode === "time") {
            Counter.addHandlerTimer(model.state.config.type, () => {
                WordsWrapper.removeUnusedLetters(Input.inputArr);
                endTestAndDisplayResult();
            });
        }
    }

    WordsWrapper.validateText(inputArr, inputType);

    Caret.moveCaret(inputArr);

    if (model.state.config.mode === "time") return;

    Counter.setCounter(model.state.words.length, inputArr.length - 1);

    if (inputArr.length < model.state.words.length) return;

    if (isTestComplete(inputArr)) {
        endTestAndDisplayResult();
    }
});

History.addHistoryOptionHandler((btn) => {
    model.updateConfig({ historyOption: btn });

    History.DisplayHistoryOption(model.state.history, model.state.testResult.words);
});

Restart.addHandlerRestart(async (option) => {
    option === "next" && (await model.loadText());

    WordsWrapper.renderText(model.state.words);

    model.resetTest();

    Input.clearInput();

    Input.focusInput();

    Config.showConfig();

    Caret.startAnimation();

    Caret.moveCaret([""]);

    Counter.resetCounter();

    WordsWrapper.resetErrorCount();

    setCounter();

    if (!model.state.testStarted) {
        Input.enableInput();

        Result.hideResult();

        Caret.showCaret();
    }
});

function endTestAndDisplayResult() {
    Input.disableInput();

    model.endTest();

    Caret.hideCaret();

    model.updateResult(WordsWrapper.getResults());

    Result.showResult(model.state.testResult);

    History.selectActiveOption(model.state.config.historyOption);

    History.DisplayHistoryOption(model.state.history, model.state.testResult.words);

    History.addHistoryDetailHandler((id) => {
        const item = model.state.history.find((val) => val.id == id);

        if (model.state.testResult === item) return;

        model.state.testResult = item;

        Result.showResult(item);

        Chart.displayChart(item);
    });

    Chart.displayChart(model.state.testResult);

    console.log(model.state.testResult);

    return;
}

function setCounter() {
    model.state.config.mode === "time" &&
        Counter.setTimeCounter(model.state.config.type);
    model.state.config.mode !== "time" &&
        Counter.setCounter(model.state.words.length);
}

function isTestComplete(inputArr) {
    const wordCount = inputArr.length - 1;
    const wordsLength = model.state.words.length;
    const inputLastWord = inputArr.slice(-1)[0];
    const wordsLastWord = model.state.words.slice(-1)[0];

    return (
        wordCount === wordsLength ||
        (wordCount === wordsLength - 1 && inputLastWord === wordsLastWord)
    );
}
