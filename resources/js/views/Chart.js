import View from "./View.js";
const myChart = document.getElementById("myChart");

class ChartClass extends View {
    _parentElement = document.getElementById("myChart");
    _correct = document.querySelector(".detail-correct");
    _errors = document.querySelector(".detail-errors");
    _extra = document.querySelector(".detail-extra");
    _missed = document.querySelector(".detail-missed");
    _chart;

    displayChart(result) {
        if (this._chart) this._chart.destroy();

        const data = [
            result.correctLetters,
            result.errorCount,
            result.extraLetters,
            result.missedLetters,
        ];

        this._chart = new Chart(myChart, {
            type: "pie",
            data: {
                labels: ["Correct", "Incorrect", "Extra", "Missed"],
                datasets: [
                    {
                        label: "My First Dataset",
                        data,
                        backgroundColor: [
                            "#3faa67",
                            "#ff6384",
                            // "#c33c57",
                            "#36a2eb",
                            // "#7a2335",
                            "#ffcd56",
                            // "#646669",
                        ],
                        hoverOffset: 10,
                    },
                ],
            },
            options: {
                borderRadius: 5,
                cutout: "80%",
                borderColor: "#0b0a0e",
                rotation: 180,
                layout: {
                    padding: 15,
                },
                plugins: {
                    tooltip: {
                        enabled: false,
                    },
                    legend: {
                        display: false,
                    },
                },
            },
        });

        this._correct.textContent = result.correctLetters;
        this._errors.textContent = result.errorCount;
        this._extra.textContent = result.extraLetters;
        this._missed.textContent = result.missedLetters;
    }
}

export default new ChartClass();
