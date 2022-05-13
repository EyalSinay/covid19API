export const arrayOfCountriesForCharts = [];
export const arrayOfStatsForCharts = [];
export const arrayOfCountriesForSelect = [];

export const objCountriesByContinent = {
    continent: {
        Asia: {},
        Africa: {},
        Europe: {},
        Americas: {},
        Oceania: {},
    },
    methods: {
        getCountryObjByName: function(countryName) {
            const keysContinent = Object.keys(objCountriesByContinent.continent);
            const currentContinentIndex = keysContinent.findIndex(key => objCountriesByContinent.continent[key].hasOwnProperty(countryName));
            return objCountriesByContinent.continent[keysContinent[currentContinentIndex]][countryName];
        },
        setObjDataByName: function (name, latest_data, today) {
            const keysContinent = Object.keys(objCountriesByContinent.continent);
            const currentContinentIndex = keysContinent.findIndex(key => objCountriesByContinent.continent[key].hasOwnProperty(name));
            if (currentContinentIndex !== -1) {
                objCountriesByContinent.continent[keysContinent[currentContinentIndex]][name].latest_data = latest_data;
                objCountriesByContinent.continent[keysContinent[currentContinentIndex]][name].today = today;
            }
        },
        removeUndefinedFromObj: function () {
            const keysContinent = Object.keys(objCountriesByContinent.continent);
            keysContinent.forEach(__continent => {
                for (let k in objCountriesByContinent.continent[__continent]) {
                    if (Object.keys(objCountriesByContinent.continent[__continent][k]).length === 0) {
                        delete objCountriesByContinent.continent[__continent][k]; // The object had no properties, so delete that property
                    }
                }
            });
        },
        setCountriesInArr: function (arr, __continent) {
            while (arr.length > 0) {
                arr.pop();
            }
            if (__continent === "World") {
                const asiaCountries = Object.keys(objCountriesByContinent.continent.Asia);
                const africaCountries = Object.keys(objCountriesByContinent.continent.Africa);
                const europeCountries = Object.keys(objCountriesByContinent.continent.Europe);
                const americasCountries = Object.keys(objCountriesByContinent.continent.Americas);
                const oceaniaCountries = Object.keys(objCountriesByContinent.continent.Oceania);
                arr.push(...asiaCountries, ...africaCountries, ...europeCountries, ...americasCountries, ...oceaniaCountries);
            } else if (objCountriesByContinent.continent[__continent]) {
                const askCountries = Object.keys(objCountriesByContinent.continent[__continent]);
                arr.push(...askCountries);
            }
        },
        setStatInArr_latestData: function (arr, stats) {
            while (arr.length > 0) {
                arr.pop();
            }
            arrayOfCountriesForCharts.forEach(country => {
                const countryObj = objCountriesByContinent.methods.getCountryObjByName(country);
                arr.push(countryObj.latest_data[stats]);
            });
        }
    }
}



export async function init() {
    // ! check if in local storage.. if not...
    await getAllCountries();
    
    objCountriesByContinent.methods.setCountriesInArr(arrayOfCountriesForCharts, "World");
    objCountriesByContinent.methods.setStatInArr_latestData(arrayOfStatsForCharts, "confirmed");
    objCountriesByContinent.methods.setCountriesInArr(arrayOfCountriesForSelect, "World");

}

async function getAllCountries() {
    try {
        const urlCountries = "https://nameless-citadel-58066.herokuapp.com/https://restcountries.herokuapp.com/api/v1";
        const urlCovidStatsCountryByCode = "https://nameless-citadel-58066.herokuapp.com/http://corona-api.com/countries/";
        const response = await fetch(urlCountries);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const urlCountriesArr = [];
            const data = await response.json();
            for (let obj of data) {
                if (obj.region === "Asia") {
                    objCountriesByContinent.continent.Asia[obj.name.common] = {};
                    urlCountriesArr.push(urlCovidStatsCountryByCode + obj.cca2);
                } else if (obj.region === "Africa") {
                    objCountriesByContinent.continent.Africa[obj.name.common] = {};
                    urlCountriesArr.push(urlCovidStatsCountryByCode + obj.cca2);
                } else if (obj.region === "Europe") {
                    objCountriesByContinent.continent.Europe[obj.name.common] = {};
                    urlCountriesArr.push(urlCovidStatsCountryByCode + obj.cca2);
                } else if (obj.region === "Americas") {
                    objCountriesByContinent.continent.Americas[obj.name.common] = {};
                    urlCountriesArr.push(urlCovidStatsCountryByCode + obj.cca2);
                } else if (obj.region === "Oceania") {
                    objCountriesByContinent.continent.Oceania[obj.name.common] = {};
                    urlCountriesArr.push(urlCovidStatsCountryByCode + obj.cca2);
                }
            }

            await getStatsByUrlArr(urlCountriesArr);
        }
    } catch (err) {
        console.log('There has been a problem: ' + err.message);
    }
}


async function getStatsByUrlArr(arr) {
    try {
        const dataArr = await Promise.allSettled(arr.map(async url => {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return resp.json();
            }
        }));
        const filterDataArr = dataArr.filter(data => data.status === "fulfilled");
        // console.log(filterDataArr);
        for (let i of filterDataArr) {
            objCountriesByContinent.methods.setObjDataByName(i.value.data.name, i.value.data.latest_data, i.value.data.today);
        }
        objCountriesByContinent.methods.removeUndefinedFromObj();
    } catch (err) {
        console.log('There has been a problem with your fetch operation: ' + err.message);
    }

    document.getElementById("spinner-container").setAttribute("display-none", "");
    document.getElementById("app-container").removeAttribute("display-none");
}