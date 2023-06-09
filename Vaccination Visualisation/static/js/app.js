// Define the URL for the JSON file
const url = 'http://127.0.0.1:5000/vaccinated_people_province';
const url2='http://127.0.0.1:5000/vaccines'

// Calling the functions
vaccinations();
vaccines();

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
        y: provinces,
        x: vaccinations.reverse(),
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
// Declare global variables for provinces, vaccines, and dates
var provinces = [];
var vaccines = [];
var dates = [];

function vaccines() {
  d3.json(url2)
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

  demographicInfo.append("h5").text("Vaccine Numbers in " + selectedProvince + ":");
  filteredData.forEach(data => {
    demographicInfo.append("p").text(data.date + ": " + data.vaccine);
  });
}

// Event listener for province dropdown change
d3.select("#provinceDropdown").on("change", function () {
  var selectedProvince = d3.select(this).property("value");
  updateVaccineNumbers(selectedProvince);
});

