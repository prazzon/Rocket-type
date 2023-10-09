import { getText } from "./helpers.js";

export const state = {
    words: [],
    config: {
        mode: "words",
        type: 10,
        historyOption: "recent",
    },
    testStarted: false,
    time: {},
    testResult: {},
    history: [],
};

const init = function () {
    const history = localStorage.getItem("history");

    const config = localStorage.getItem("config");

    if (history) state.history = JSON.parse(history);

    if (config) state.config = JSON.parse(config);
};
init();

export function updateConfig(config) {
    state.config = { ...state.config, ...config };

    localStorage.setItem("config", JSON.stringify(state.config));
}

export const loadText = async function () {
    try {
        state.words = await getText(state.config.mode, state.config.type);
    } catch (error) {
        throw error;
    }
};

export function resetTest() {
    state.time = {};
    state.testResult = {};
    state.testStarted = false;
}

export function startTest() {
    state.testStarted = true;
    state.time.timeStarted = Date.now();
}

export function endTest() {
    state.testStarted = false;
    state.time.timeStopped = Date.now();
    state.time.timeElapsed = state.time.timeStopped - state.time.timeStarted;
}

export function updateResult(result) {
    const wpm = result.correctLetters / 5 / (state.time.timeElapsed / 60000);
    const raw = result.letterCount / 5 / (state.time.timeElapsed / 60000);
    const acc =
        (result.correctLetters / (result.correctLetters + result.errorCount)) * 100;
    const time = state.time.timeElapsed / 1000;

    state.testResult = {
        wpm,
        raw,
        acc,
        time,
        ...state.config,
        ...result,
        id: state.history.length,
        timeElapse: state.time,
    };

    state.history.unshift(state.testResult);

    localStorage.setItem("history", JSON.stringify(state.history));
}
