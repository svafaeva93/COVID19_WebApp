// Define the URL for the JSON file
const url = 'http://127.0.0.1:5000/vaccinated_people_province';
const url2='http://127.0.0.1:5000/vaccines'

// Calling the functions
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
      var dates = [];

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

      // Create the date dropdown menu
      var dateDropdown = d3.select("#dropdown");
      dates.forEach(date => {
        dateDropdown.append("option").text(date);
      });

      // Update the chart based on the selected province and date
      function updateChart(selectedProvince, selectedDate) {
        var filteredVaccinations = [];
        dates.forEach((date, index) => {
          if (
            (selectedProvince === "All Provinces" || provinces[index] === selectedProvince) &&
            (selectedDate === "All Dates" || date === selectedDate)
          ) {
            filteredVaccinations.push(vaccines[index]);
          }
        });

        // Update the trace object
        const updatedTrace = {
          x: filteredVaccinations,
          y: uniqueProvinces,
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
          title: 'Vaccinated People by Province',
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
      updateChart("All Provinces", "All Dates");

      // Event listener for province dropdown change
      provinceDropdown.on("change", function () {
        var selectedProvince = d3.select(this).property("value");
        var selectedDate = dateDropdown.property("value");
        updateChart(selectedProvince, selectedDate);
      });

      // Event listener for date dropdown change
      dateDropdown.on("change", function () {
        var selectedProvince = provinceDropdown.property("value");
        var selectedDate = d3.select(this).property("value");
        updateChart(selectedProvince, selectedDate);
      });

    })
    .catch(error => {
      console.log('Error loading data:', error);
    });
}
