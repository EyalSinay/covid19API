import { arrayOfCountriesForCharts, arrayOfStatsForCharts, arrayOfStatsToday ,objCountriesByContinent } from "./load-data.js";
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
        const strToCheck = country.toLowerCase().slice(0, textValue.length);
        return strToCheck === textValue;
    });
    appendAllSelectOptionsByArr(filterArr, false);
}

export function selectEvent(e) {
    const value = e.target.value;
    const statObj = arrayOfStatsToday.find(obj => obj.hasOwnProperty(value));
    const pCollection = document.getElementsByClassName("country-info__p");
    for(let element of pCollection){
        const idElement = element.getAttribute("id");
        const idElementSlice = idElement.slice(6);
        element.textContent = statObj[value][idElementSlice];
    }
    const title = document.getElementById("todat-info-title");
    title.textContent = `Today in ${value}:`
}

export function appendAllSelectOptionsByArr(arr, chooseOp = true) {
    const select = document.getElementById("countries-select");
    let options = "";
    if (chooseOp === true) options += `<option value="" selected disabled hidden>Choose country</option>`;
    for (let country of arr) {
        options += `<option value="${country}" >${country}</option>`;
    }
    select.innerHTML = options;
}

function clearFilterText() {
    const filterText = document.getElementById("countries-filter");
    filterText.value = "";
}