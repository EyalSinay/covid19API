import { arrayOfCountriesForCharts, arrayOfStatsForCharts, objCountriesByContinent } from "./load-data.js";
import { myChart, state } from "./app.js";
import { currentStat } from "./chart.js";

export function continentRadioEvent(e) {
    const id = e.target.getAttribute("id");
    objCountriesByContinent.methods.setCountriesInArr(arrayOfCountriesForCharts, id);
    objCountriesByContinent.methods.setStatInArr_latestData(arrayOfStatsForCharts, state.methods.getCurrentStatInString());
    clearFilterText();
    appendAllSelectOptionsByArr(arrayOfCountriesForCharts);
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

export function filterTextEvent(e) {
    const textValue = e.target.value.toLowerCase();
    textValue.toLowerCa
    const filterArr = arrayOfCountriesForCharts.filter(country => {
        country = country.toLowerCase();
        let inputIn = true;
        for (let i = 0; i < textValue.length; i++) {
            if (textValue.charAt(i) !== country.charAt(i)) {
                inputIn = false;
                break;
            }
        }
        return inputIn;
    });
    console.log(filterArr);
    appendAllSelectOptionsByArr(filterArr, false);
}

export function appendAllSelectOptionsByArr (arr, chooseOp = true) {
    const select = document.getElementById("countries-select");
    let options = "";
    if (chooseOp === true) options += `<option value="" selected disabled hidden>Choose country</option>`;
    for (let country of arr){
        options += `<option value="${country}" >${country}</option>`;
    }
    select.innerHTML = options;
}

function clearFilterText () {
    const filterText = document.getElementById("countries-filter");
    filterText.value = "";
}