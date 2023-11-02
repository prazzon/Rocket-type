import { getText } from "./helpers.js";

export const state = {
    words: [],
    config: {
        mode: "words",
        type: 10,
        historyOption: "recent",
    },
    stats: {
        testStarted: 0,
        testCompleted: 0,
        timeTyping: 0,
    },
    isTestStarted: false,
    time: {},
    testResult: {},
    history: [],
};

const init = function () {
    const history = localStorage.getItem("history");

    const config = localStorage.getItem("config");

    const stats = localStorage.getItem("stats");

    if (history) state.history = JSON.parse(history);

    if (config) state.config = JSON.parse(config);

    if (stats) state.stats = JSON.parse(stats);
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
    state.isTestStarted = false;
}

export function startTest() {
    state.isTestStarted = true;
    state.time.timeStarted = Date.now();
    state.stats.testStarted++;
}

export function endTest() {
    state.isTestStarted = false;
    state.time.timeStopped = Date.now();
    state.time.timeElapsed = state.time.timeStopped - state.time.timeStarted;
    state.stats.timeTyping += state.time.timeElapsed;
    state.stats.testCompleted++;
}

export function updateResult(result) {
    const timeInMinutes = state.time.timeElapsed / 60000;
    const totalWordCount = result.correctLetters + result.errorCount; // including corrected errors
    const correctLetterCount = result.correctLetters + result.wordCount - 1; // including spaces

    const wpm = correctLetterCount / 5 / timeInMinutes;
    const raw = result.letterCount / 5 / timeInMinutes;
    const acc = result.correctLetters / totalWordCount * 100;
    const time = state.time.timeElapsed / 1000; // in seconds

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

    localStorage.setItem("stats", JSON.stringify(state.stats));
}
