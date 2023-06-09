// Define the URL for the JSON file
const url = 'http://127.0.0.1:5000/vaccinated_people_province';
const url2='http://127.0.0.1:5000/vaccines'
const url3 = 'http://127.0.0.1:5000/dropdown_province';

// Calling the functions
// loadOptions();
// vaccinations();
vaccines();

// function vaccinations() {
//   d3.json(url)
//     .then(data => {
//       console.log(data);
//       // Declare arrays for province and vaccinations
//       var provinces = [];
//       var vaccinations = [];
//       // Iterate over the array of documents
//       data.forEach(document => {
//         var vaccination = document["cumm_vaccinated_people"]; // Fix variable name here
//         var province = document["_id"];
//         console.log("Vaccinated People:", vaccination);
//         console.log("Province:", province);
//         // Push values to respective arrays
//         provinces.push(province);
//         vaccinations.push(vaccination);
//       });
//       // Update the trace object
//       const updatedTrace = {
//         y: provinces,
//         x: vaccinations.reverse(),
//         type: 'bar',
//         orientation: 'h',
//         width: 0.8,
//         marker: {
//           color: 'rgba(0, 128, 0, 0.8)'
//         }
//       };
//       // Update the data array
//       const updatedData = [updatedTrace];
//       // Update the layout object
//       const updatedLayout = {
//         title: 'Vaccinated People by Province',
//         xaxis: {
//           title: 'Province'
//         },
//         yaxis: {
//           title: 'Vaccinated People',
//           automargin: true,
//           title_standoff: 50
//         }
//       };
//       // Update the chart
//       Plotly.newPlot('plot', updatedData, updatedLayout);
//     })
//     .catch(error => {
//       console.log('Error loading data:', error);
//     });
// }

function vaccines() {
  d3.json(url2)
    .then(data => {
      console.log(data);
      // Declare arrays for province and vaccinations
      var provinces = [];
      var vaccines = [];
      var dates=[]

      // Iterate over the array of documents
      data.forEach(document => {
        var vaccination = document["Cumulative percent of people (Vaccinedose1)"]; // Fix variable name here
        var province = document["Province"];
        var date = new Date(document["Date"]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        console.log("Vaccinated %:", vaccination);
        console.log("Date:", date);
        console.log("Province:", province);
        // Push values to respective arrays
        provinces.push(province);
        vaccines.push(vaccination);
        dates.push(date);
      });
      // Create a dropdown menu for selecting dates
      var dropdown = d3.select("#dropdown");
      dates.forEach(date => {
      dropdown.append("option").text(date);
         });
        // Update the chart based on the selected date
        function updateChart(selectedDate) {
        var filteredProvinces = [];
        var filteredVaccinations = [];
       // Filter the data based on the selected date
       data.forEach(document => {
        if (document["date"] === selectedDate) {
          filteredProvinces.push(document["province"]);
          filteredVaccinations.push(document["vaccination"]);
        }
      });
          // Update the trace object
          const updatedTrace = {
            x: filteredVaccinations,
            y: filteredProvinces,
            type: 'bar',
            orientation: 'h',
            width: 0.8,
            marker: {
              color: 'rgba(0, 128, 0, 0.8)'
            }
          };
      // Update the data array
      const updatedData = [updatedTrace];
      // Update the layout object
      const updatedLayout = {
        title: 'Vaccinated % People by Province',
        xaxis: {
          title: 'Vaccinated People'
        },
        yaxis: {
          title: 'Province',
          automargin: true,
          title_standoff: 50
        }
      };
      Plotly.newPlot('plot2', updatedData, updatedLayout);
    }

    // Initial chart update
    updateChart(dates[0]);

    // Event listener for dropdown change
    dropdown.on("change", function() {
      var selectedDate = d3.select(this).property("value");
      updateChart(selectedDate);
    });

  })
  .catch(error => {
    console.log('Error loading data:', error);
  });
}








// // function loadOptions() {
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

