// TARUNA CODE///////////STARTS
const url = 'http://127.0.0.1:5000/mortality_rate';
const url2 = 'http://127.0.0.1:5000/mortalityrate';
const url3 = 'http://127.0.0.1:5000/vaccinated_people_province';
const url4 = 'http://127.0.0.1:5000/age';

// Calling the functions
init();
mortality_new();
pie_age();
vaccinations();

// Ploting the graphs using plotly and Chart.JS
function mortality_new() {
  d3.json(url)
    .then(data => {
      console.log(data);

      // Declare arrays for province and mortality rate
      var provinces = [];
      var mortalityRates = [];

      // Iterate over the array of documents
      data.forEach(document => {
        var mortalityRate = document["Mortality rate"];
        var province = document["Province"];
        console.log("Mortality rate:", mortalityRate);
        console.log("Province:", province);

        // Push values to respective arrays
        provinces.push(province);
        mortalityRates.push(mortalityRate);
      });

      // Create a container for the chart
      const chartContainer = d3.select('#chart-container');

      // Create the initial chart
      createChart(provinces, mortalityRates);

      // Function to create the chart
      function createChart(provinces, mortalityRates) {
        // Update the trace object
        const trace = {
          x: provinces,
          y: mortalityRates,
          type: 'bar',
          orientation: 'v',
          width: 0.8,
          marker: {
            color: 'rgba(0, 128, 0, 0.8)'
          }
        };

        // Create the data array
        const data = [trace];

        // Create the layout object
        const layout = {
          title: 'Mortality Rate by Province',
          xaxis: {
            title: 'Province',
          },
          yaxis: {
            title: 'Mortality Rate',
            automargin: true,
            title_standoff: 50,
          },
        };

        // Update the chart
        Plotly.newPlot('chart-container', data, layout);
      }

      const sortDropdown = document.getElementById('sort-dropdown');
      sortDropdown.onchange = function () {
        const selectedOption = this.value;
        console.log('Selected option:', selectedOption);
        let sortedData = [...data];

        // Perform actions based on the selected option
        if (selectedOption === 'ascending') {
          // Handle ascending option
          sortedData.sort((a, b) => a["Mortality rate"] - b["Mortality rate"]);
        } else if (selectedOption === 'descending') {
          // Handle descending option
          sortedData.sort((a, b) => b["Mortality rate"] - a["Mortality rate"]);
        }

        const sortedProvinces = sortedData.map(document => document["Province"]);
        const sortedMortalityRates = sortedData.map(document => document["Mortality rate"]);

        updateChart(sortedProvinces, sortedMortalityRates);
      };
    })
    .catch(error => {
      console.log('Error loading data:', error);
    });

  // Function to update the chart
  function updateChart(newProvinces, newMortalityRates) {
    console.log(newMortalityRates);
    // Update the trace and data arrays
    const trace = {
      x: newProvinces,
      y: newMortalityRates,
      type: 'bar',
      orientation: 'v',
      width: 0.8,
      marker: {
        color: 'rgba(0, 128, 0, 0.8)'
      }
    };
    // Create the data array
    const data = [trace];

    // Create the layout object
    const layout = {
      title: 'Mortality Rate by Province',
      xaxis: {
        title: 'Province',
      },
      yaxis: {
        title: 'Mortality Rate',
        automargin: true,
        title_standoff: 50,
      },
    };

    // Update the chart
    Plotly.react('chart-container', data, layout);
  }
}

function pie_age() {
  d3.json(url4)
    .then(data => {
      console.log(data);

      // Declare arrays for vaccine and Age
      var totalVaccinedoses1 = [];
      var ages = [];

      // Iterate over the array of documents
      data.forEach(document => {
        var totalVaccinedose1 = document["TotalVaccinedose1"];
        var age = document["Age"];
        console.log("TotalVaccinedose1:", totalVaccinedose1);
        console.log("Age:", age);
        totalVaccinedoses1.push(totalVaccinedose1);
        ages.push(age);
      });

      // Create the pie chart
      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ages,
          datasets: [{
            data: totalVaccinedoses1,
            backgroundColor: ['red', 'green', 'blue', 'orange', 'purple', 'yellow', 'cyan', 'magenta', 'teal'],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Vaccine Distribution by Age Group',
              font: {
                size: 18
              }
            },
            legend: {
              position: 'top',
              align: 'center',
              fullSize: false,
              labels: {
                boxWidth: 15,
              },
            },
            tooltip: {
              callbacks: {
                title: () => '', // Empty string to hide the initial age number
                label: (context) => {
                  const label = context.label;
                  const value = context.raw;
                  const formattedLabel = `Age: ${label}`;
                  const formattedValue = `Vaccinated people for dose1: ${value}`;
                  return [formattedLabel, formattedValue];
                }
              }
            }
          }
        }
      });

      // Adjust the size of the chart's canvas
      const chartCanvas = document.querySelector('#myChart');
      chartCanvas.style.width = '400px';
      chartCanvas.style.height = '400px';
    });
}
// TARUNA WORK ENDS//////////////////////////////////////////////////////////////////////////////////////////////// 


// RILEY CODE STARTS//////////////////////////////////////////////////////////////////////////////////////////////

// function init() {
//   //Call url needed for menu
//   // url = 'http://127.0.0.1:5000/mortalityrate';
//   // Making dropdown menu
//   let dropdownMenu = d3.select("#selDataset");
//   d3.json(url2).then(function (data) {
//     let first = data;
//     data.forEach((document) => {
//       console.log(document["_id"]);
//       // Adds samples to dropdown menu
//       dropdownMenu.append("option")
//         .text(document["_id"])
//         .property("value", document["_id"]);
//     });
//     let sample_one = first[0]["_id"];
//     console.log(sample_one);
//     // Functions for all sections
//     startHeatMap();
//     startChart2(sample_one);
//     startChart3(sample_one);
//   })
// }
// function optionChanged(value) {
//   startChart2(value);
//   startChart3(value)
// }
function init() {
  // Call URL needed for menu
  // url = 'http://127.0.0.1:5000/mortalityrate';

  // Making dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  d3.json(url2).then(function(data) {
    let provinces = [];

    // Extract distinct provinces from the data
    data.forEach((document) => {
      if (!provinces.includes(document["Province"])) {
        provinces.push(document["Province"]);
      }
    });

    // Add distinct provinces to the dropdown menu
    provinces.forEach((province) => {
      dropdownMenu
        .append("option")
        .text(province)
        .property("value", province);
    });

    // Get the first province from the data
    let sample_one = provinces[0];
    console.log(sample_one);

    // Functions for all sections
    startHeatMap();
    startChart2(sample_one);
    startChart3(sample_one);
  });
}

function optionChanged(value) {
  startChart2(value);
  startChart3(value);
}

// RILEY CODE ENDS//////////////////////////////////////////////////////////////////////////////////////////////

// JIBEKS CODE STARTS//////////////////////////////////////////////////////////////////////////////////////////

// Calling the functions

// Vaccination code
function vaccinations() {
  d3.json(url3)
    .then(data => {
      console.log(data);
      // Declare arrays for province and vaccinations
      var provinces = [];
      var vaccinations = [];
      // Iterate over the array of documents
      data.forEach(document => {
        var vaccination = document["cumm_vaccinated_people"]; // Fix variable name here
        var province = document["_id"];
        console.log("Vaccinated People:", vaccination);
        console.log("Province:", province);
        // Push values to respective arrays
        provinces.push(province);
        vaccinations.push(vaccination);
      });
      // Update the trace object
      const updatedTrace = {
        x: provinces,
        y: vaccinations,
        type: 'bar',
        orientation: 'v',
        width: 0.8,
        marker: {
          color: 'rgba(0, 128, 0, 0.8)'
        }
      };
      // Update the data array
      const updatedData = [updatedTrace];
      // Update the layout object
      const updatedLayout = {
        title: 'Vaccinated People by Province',
        xaxis: {
          title: 'Province'
        },
        yaxis: {
          title: 'Vaccinated People',
          automargin: true,
          title_standoff: 50
        }
      };
      // Update the chart
      Plotly.newPlot('plot2', updatedData, updatedLayout);
    })
    .catch(error => {
      console.log('Error loading data:', error);
    });
}
// JIBEK CODE ENDS////////////////////////////////////////////////////////////////////////////////////////////////