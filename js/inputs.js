import { arrayOfCountriesForCharts, arrayOfStatsForCharts, objCountriesByContinent } from "./load-data.js";
import { myChart, state } from "./app.js";
import { currentStat } from "./chart.js";

export function continentRadioEvent(e) {
    const id = e.target.getAttribute("id");
    objCountriesByContinent.methods.setCountriesInArr(arrayOfCountriesForCharts, id);
    objCountriesByContinent.methods.setStatInArr_latestData(arrayOfStatsForCharts, state.methods.getCurrentStatInString());
    myChart.update();
    state.methods.setCurrentContinentByString(id);
}

export function statsRadioEvent(e) {
    const id = e.target.getAttribute("id");
    objCountriesByContinent.methods.setCountriesInArr(arrayOfCountriesForCharts, state.methods.getCurrentContinentInString());
    objCountriesByContinent.methods.setStatInArr_latestData(arrayOfStatsForCharts, id);
    currentStat[0] = state.methods.getCurrentStatInString(); //! doesn't work
    myChart.update();
    state.methods.setCurrentStatByString(id);
}