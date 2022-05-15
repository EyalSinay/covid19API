import { chartConfig, currentStat } from "./chart.js";
import { init } from "./load-data.js";
import { continentRadioEvent, statsRadioEvent, filterTextEvent } from "./inputs.js";

export const state = {
    stats: {
        confirmed: true,
        recovered: false,
        critical: false,
        deaths: false,
    },
    continent: {
        World: true,
        Asia: false,
        Africa: false,
        Europe: false,
        Americas: false,
        Oceania: false,
    },
    methods: {
        getCurrentStatInString: function () {
            const keys = Object.keys(state.stats);
            return keys.find(key => state.stats[key]);
        },
        setCurrentStatByString: function (stat) {
            const keys = Object.keys(state.stats);
            keys.forEach(key => {
                key === stat ? state.stats[key] = true : state.stats[key] = false;
            });
        },
        getCurrentContinentInString: function () {
            const keys = Object.keys(state.continent);
            return keys.find(key => state.continent[key]);
        },
        setCurrentContinentByString: function (stat) {
            const keys = Object.keys(state.continent);
            keys.forEach(key => {
                key === stat ? state.stats[key] = true : state.stats[key] = false;
            });
        },
    },
}

export const myChart = new Chart(
    document.getElementById('myChart'),
    chartConfig
);


init();

const continentRadio = document.querySelectorAll("form input[type='radio']");
for (let input of continentRadio) {
    input.addEventListener("change", continentRadioEvent);
}

const statsRadio = document.querySelectorAll(".statistic-btn-container input[type='radio']");
for (let input of statsRadio) {
    input.addEventListener("change", statsRadioEvent);
}

const filterText = document.getElementById("countries-filter");
filterText.addEventListener("input", filterTextEvent);