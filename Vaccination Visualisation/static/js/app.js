// Define the URL for the JSON file
const url = 'http://127.0.0.1:5000/vaccinated_people_province';
const url3 = 'http://127.0.0.1:5000/dropdown_province';

// Calling the functions
// loadOptions();
vaccinations();

function vaccinations() {
  d3.json(url)
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
      Plotly.newPlot('plot', updatedData, updatedLayout);
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

