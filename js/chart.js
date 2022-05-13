import { arrayOfCountriesForCharts, arrayOfStatsForCharts } from "./load-data.js";
// import { state } from "./app.js"

// let currentStatInString = state.methods.getCurrentStatInString();
export let currentStat = "confirmed";

const chartData = {
    labels: arrayOfCountriesForCharts,
    datasets: [{
        label: currentStat,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: arrayOfStatsForCharts,
    }]
};

export const chartConfig = {
    type: 'line',
    data: chartData,
    options: {
        transitions: {
          show: {
            animations: {
              x: {
                from: 0
              },
              y: {
                from: 0
              }
            }
          },
          hide: {
            animations: {
              x: {
                to: 0
              },
              y: {
                to: 0
              }
            }
          }
        }
      }
};