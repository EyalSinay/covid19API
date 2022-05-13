import { chartConfig, currentStat } from "./chart.js";
import { init, arrayOfCountriesForCharts, arrayOfStatsForCharts, objCountriesByContinent } from "./load-data.js";

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

const myChart = new Chart(
    document.getElementById('myChart'),
    chartConfig
);


init();

const continentRadio = document.querySelectorAll("form input[type='radio']");
for (let input of continentRadio) {
    input.addEventListener("change", e => {
        const id = e.target.getAttribute("id");
        objCountriesByContinent.methods.setCountriesInArr(arrayOfCountriesForCharts, id);
        objCountriesByContinent.methods.setStatInArr_latestData(arrayOfStatsForCharts, state.methods.getCurrentStatInString());
        myChart.update();
        state.methods.setCurrentContinentByString(id);
    });
}

const statsRadio = document.querySelectorAll(".statistic-btn-container input[type='radio']");
for (let input of statsRadio) {
    input.addEventListener("change", e => {
        const id = e.target.getAttribute("id");
        objCountriesByContinent.methods.setCountriesInArr(arrayOfCountriesForCharts, state.methods.getCurrentContinentInString());
        objCountriesByContinent.methods.setStatInArr_latestData(arrayOfStatsForCharts, id);
        // currentStat = state.methods.getCurrentStatInString(); //!!???!?!!?!?!!
        myChart.update();
        state.methods.setCurrentStatByString(id);
    });
}