// Define the URL for the JSON file
const url = '/mortality_rate' // 'http://127.0.0.1:5000/mortality_rate';
const url2 = '/gender_age' //'http://127.0.0.1:5000/gender&age';
const url3 = '/dropdown_province' //'http://127.0.0.1:5000/dropdown_province'
const url4 = '/age' //http://127.0.0.1:5000/age'

// Functions for each questions asked:
// calling function which connects the "selDataset" element with the names array from data
// loadOptions();
// gender_age();
mortality_new();
vaccine_age();
pie_age();

function vaccine_age() {
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

      // Create trace for bar chart
      var trace = {
        x: ages,
        y: totalVaccinedoses1,
        type: 'bar'
      };

      // Define the data array
      var data = [trace];

      // Define the layout
      var layout = {
        title: 'Total Vaccinedose1 by Age',
        xaxis: {
          title: 'Age'
        },
        yaxis: {
          title: 'Total Vaccinedose1'
        }
      };

      // Plot the chart
      Plotly.newPlot('plot', data, layout);
    })
    .catch(error => {
      console.log('Error loading data:', error);
    });
}

// function gender_age() {
//   d3.json(url2)
//     .then(data => {
//       console.log(data);

//       // Declare arrays for Male, Female, and Age
//       var totalVaccinedose1Male = [];
//       var totalVaccinedose1Female = [];
//       var ages = [];

//       // Iterate over the array of documents
//       data.forEach(document => {
//         var totalVaccinedose1 = document["TotalVaccinedose1"];
//         var age = document["Age"];
//         var sex = document["Sex"];
//         console.log("TotalVaccinedose1:", totalVaccinedose1);
//         console.log("Age:", age);
//         console.log("Sex:", sex);

//         // Push values to respective arrays based on sex
//         if (sex === "m") {
//           totalVaccinedose1Male.push(totalVaccinedose1);
//           totalVaccinedose1Female.push(0);
//         } else if (sex === "f") {
//           totalVaccinedose1Male.push(0);
//           totalVaccinedose1Female.push(totalVaccinedose1);
//         } else {
//           totalVaccinedose1Male.push(0);
//           totalVaccinedose1Female.push(0);
//         }

//         ages.push(age);
//       });

//       // Create traces for Male and Female bars
//       var traceMale = {
//         x: ages,
//         y: totalVaccinedose1Male,
//         name: 'Male',
//         type: 'bar'
//       };

//       var traceFemale = {
//         x: ages,
//         y: totalVaccinedose1Female,
//         name: 'Female',
//         type: 'bar'
//       };

//       // Define the data array
//       var data = [traceMale, traceFemale];

//       // Define the layout
//       var layout = {
//         title: 'Total Vaccinedose1 by Age and Sex',
//         xaxis: {
//           title: 'Age'
//         },
//         yaxis: {
//           title: 'Total Vaccinedose1'
//         },
//         barmode: 'stack'
//       };

//       // Plot the chart
//       Plotly.newPlot('plot2', data, layout);
//     })
//     .catch(error => {
//       console.log('Error loading data:', error);
//     });
// }
// This function connects the names array from data with the 'id' numbers with the "selDataset" element 
// function loadOptions() {
//   d3.json(url3)
//     .then(data => {
//       console.log(data);
//       var options = data;
//       var select = document.getElementById("selDataset");
//       for (var i = 0; i < options.length; i++) {
//         var option = document.createElement("option");
//         option.text = options[i];
//         select.add(option);
//       }
//     })
//     .catch(error => {
//       console.log('Error loading data:', error);
//     });
// }

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
      sortDropdown.onchange = function() {
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
