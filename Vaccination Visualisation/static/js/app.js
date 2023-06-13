// Define the URL for the JSON file
const url = '/mortality_rate';
const url3 = '/vaccinated_people_province';
const url4 = '/age';
const url5='/vaccines'

// Calling the functions
mortality_new();
vaccinations();
vaccines();
fetchVaccinatedData();
pie_age();

////taruna's
//Ploting the graphs using plotly and Chart.JS
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
            title_standoff: 100,
          },
          width: 800, // Adjust the width of the hbar chart here
          height: 500 // Adjust the height of the hbar chart here
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
// jibeka's
function vaccinations() {
  d3.json(url3)
    .then(data => {
      console.log(data);
      // Declare arrays for province and vaccinations
      var provinces = [];
      var vaccinations = [];
      // Iterate over the array of documents
      data.forEach(document => {
        var vaccination = document["cumm_vaccinated_people"]; 
        var province = document["_id"];
        console.log("Vaccinated People:", vaccination);
        console.log("Province:", province);
        // Push values to respective arrays
        provinces.push(province);
        vaccinations.push(vaccination);
      });
      // Update the trace object
      const updatedTrace = {
        y: provinces.reverse(),
        x: vaccinations.reverse(),
        type: 'bar',
        orientation: 'h',
        width: 0.8,
        marker: {
          color: '#337ab7'
        }
      };
      // Update the data array
      const updatedData = [updatedTrace];
// Update the layout object
const updatedLayout = {
  title: 'Vaccinated People by Province',
  xaxis: {
    title: 'Vaccinated People',
    automargin: true,
    title_standoff: 50
  },
  yaxis: {
    title: 'Province',
    automargin: true,
    title_standoff: 50
  },
  width: 700, // Adjust the width of the hbar chart here
  height: 500 // Adjust the height of the hbar chart here
};
// Update the chart
Plotly.newPlot('plot', updatedData, updatedLayout);

    })
    .catch(error => {
      console.log('Error loading data:', error);
    });
}
var provinces = [];
var vaccines = [];
var dates = [];

function vaccines() {
  d3.json(url5)
    .then(data => {
      console.log(data);
      // Iterate over the array of documents
      data.forEach(document => {
        var vaccination = document["Cumulative number of people (Vaccinedose1)"];
        var province = document["Province"];
        var date = new Date(document["Date"]).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        console.log("Vaccinated", vaccination);
        console.log("Date:", date);
        console.log("Province:", province);
        // Push values to respective arrays
        provinces.push(province);
        vaccines.push(vaccination);
        dates.push(date);
      });
      // Create the province dropdown menu
      var provinceDropdown = d3.select("#provinceDropdown");
      var uniqueProvinces = Array.from(new Set(provinces)); // Get unique provinces
      uniqueProvinces.forEach(province => {
        provinceDropdown.append("option").text(province);
      });
    })
    .catch(error => {
      console.log('Error loading data:', error);
    });
}

// Update the vaccine numbers for unique provinces in the "Demographic Info" element
// Update the vaccine numbers and dates for the selected province in the "Demographic Info" element
function updateVaccineNumbers(selectedProvince) {
  var filteredData = vaccines.reduce((acc, vaccine, index) => {
    if (provinces[index] === selectedProvince) {
      acc.push({ date: dates[index], vaccine: vaccine });
    }
    return acc;
  }, []);

  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort data by date

  var demographicInfo = d3.select("#sample-metadata");
  demographicInfo.html(""); // Clear previous content

  demographicInfo.append("h5").text("Number of vaccinated people in " + selectedProvince + ":");

  // Display only the sorted last value
  var lastData = filteredData[filteredData.length - 1];
  var formattedVaccine = lastData.vaccine.toLocaleString(); // Format the vaccinated number with commas or periods
  demographicInfo.append("p").text(lastData.date + ": " + formattedVaccine);
}

// Event listener for province dropdown change
d3.select("#provinceDropdown").on("change", function () {
  var selectedProvince = d3.select(this).property("value");
  updateVaccineNumbers(selectedProvince);
});

// Declare global variables for vaccinatedData
var vaccinatedProvinces = [];
var vaccinatedNumbers = [];
var vaccinatedDates = [];

function fetchVaccinatedData() {
  d3.json(url5)
    .then(data => {
      console.log(data);

      // Clear previous content
      d3.select("#plot3").html("");

      // Iterate over the array of documents
      data.forEach(document => {
        var vaccinatedNumber = document["Cumulative number of people (Vaccinedose1)"];
        var vaccinatedProvince = document["Province"];
        var vaccinatedDate = new Date(document["Date"]).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        console.log("Vaccinated Number:", vaccinatedNumber);
        console.log("Date:", vaccinatedDate);
        console.log("Province:", vaccinatedProvince);

        // Push values to respective arrays
        vaccinatedProvinces.push(vaccinatedProvince);
        vaccinatedNumbers.push(vaccinatedNumber);
        vaccinatedDates.push(vaccinatedDate);
      });

      // Sort data by date
      var sortedData = vaccinatedDates.map((date, index) => ({ date: new Date(date), number: vaccinatedNumbers[index] }));
      sortedData.sort((a, b) => a.date - b.date);

      // Extract sorted dates and vaccinated numbers
      var sortedDates = sortedData.map(entry => entry.date);
      var sortedVaccinatedNumbers = sortedData.map(entry => entry.number);

      // Create the bar trace
      var trace = {
        x: sortedDates,
        y: sortedVaccinatedNumbers,
        type: 'bar',
        marker: {
          color: 'rgba(128, 0, 128, 0.8)'
        }
      };

      // Create the data array
      var data = [trace];

// Create the layout
var layout = {
  title: 'Vaccinated People Over Time',
  xaxis: {
    title: 'Date',
    tickformat: '%b %d, %Y' // Format the date tick labels
  },
  yaxis: {
    title: 'Vaccinated People',
    tickformat: ',.0f' // Format the y-axis tick labels with commas as thousands separators
  },
  width: 800, // Set the desired width in pixels
  height: 500 // Set the desired height in pixels
};

// Plot the chart
Plotly.newPlot('plot3', data, layout);
})
.catch(error => {
  console.log('Error loading data:', error);
});
}
// // //taruna's
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