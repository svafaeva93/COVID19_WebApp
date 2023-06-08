// Define the URL for the JSON file
const url = 'http://127.0.0.1:5000/mortality_rate';
const url2 = 'http://127.0.0.1:5000/gender&age';
const url3 = 'http://127.0.0.1:5000/dropdown_province'

// Functions for each questions asked:
// calling function which connects the "selDataset" element with the names array from data
loadOptions();
mortality_rate();
gender_age();

function mortality_rate() {
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

      // Update the trace object
      const updatedTrace = {
        x: provinces,
        y: mortalityRates,
        type: 'bar',
        orientation: 'v',
        width: 0.8,                // Adjust the width of the bars (0.8 represents 80% of the available space)
        marker: {
          color: 'rgba(0, 128, 0, 0.8)' // Specify the color of the bars (here, green)
        }
      };

      // Update the data array
      const updatedData = [updatedTrace];

      // Update the layout object (if needed)
      const updatedLayout = {
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
      Plotly.newPlot('plot', updatedData, updatedLayout);
    })
    .catch(error => {
      console.log('Error loading data:', error);
    });
}
function gender_age() {
  d3.json(url2)
    .then(data => {
      console.log(data);

      // Declare arrays for Male, Female, and Age
      var totalVaccinedose1Male = [];
      var totalVaccinedose1Female = [];
      var ages = [];

      // Iterate over the array of documents
      data.forEach(document => {
        var totalVaccinedose1 = document["TotalVaccinedose1"];
        var age = document["Age"];
        var sex = document["Sex"];
        console.log("TotalVaccinedose1:", totalVaccinedose1);
        console.log("Age:", age);
        console.log("Sex:", sex);

        // Push values to respective arrays based on sex
        if (sex === "m") {
          totalVaccinedose1Male.push(totalVaccinedose1);
          totalVaccinedose1Female.push(0);
        } else if (sex === "f") {
          totalVaccinedose1Male.push(0);
          totalVaccinedose1Female.push(totalVaccinedose1);
        } else {
          totalVaccinedose1Male.push(0);
          totalVaccinedose1Female.push(0);
        }

        ages.push(age);
      });

      // Create traces for Male and Female bars
      var traceMale = {
        x: ages,
        y: totalVaccinedose1Male,
        name: 'Male',
        type: 'bar'
      };

      var traceFemale = {
        x: ages,
        y: totalVaccinedose1Female,
        name: 'Female',
        type: 'bar'
      };

      // Define the data array
      var data = [traceMale, traceFemale];

      // Define the layout
      var layout = {
        title: 'Total Vaccinedose1 by Age and Sex',
        xaxis: {
          title: 'Age'
        },
        yaxis: {
          title: 'Total Vaccinedose1'
        },
        barmode: 'stack'
      };

      // Plot the chart
      Plotly.newPlot('plot2', data, layout);
    })
    .catch(error => {
      console.log('Error loading data:', error);
    });
}
// This function connects the names array from data with the 'id' numbers with the "selDataset" element 
function loadOptions() {
  d3.json(url3)
    .then(data => {
      console.log(data);
      var options = data;
      var select = document.getElementById("selDataset");
      for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.text = options[i];
        select.add(option);
      }
    })
    .catch(error => {
      console.log('Error loading data:', error);
    });
}


