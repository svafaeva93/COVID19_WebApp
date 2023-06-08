// Define the URL for the JSON file
const url = 'http://127.0.0.1:5000/mortality_rate';

// Functions for each questions asked:
// calling function which connects the "selDataset" element with the names array from data
loadOptions();
// // calling function to retrieve metadata information individually and change on option change. Display on dashboard
// demographic(0);
// // calling function to retrieve bar chart information individually and changes on option change. Display on dashboard
// updateBarChart(0);
// // calling function to retrieve bubble chart information individually and change on option change. Display on dashboard
// updateBubbleChart(0);
// // calling function to retrieve Gauge chart information individually and change on option change. Display on dashboard
// updateGaugeChart(0);

// This function connects the names array from data with the 'id' numbers with the "selDataset" element 
function loadOptions() {
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



// function loadOptions() {
//   d3.json(url).then(data => {
//     console.log(data);
//     var mortality_data = data['Mortality rate'];
//     var province_data = data['Province'];
//     console.log(mortality_data);
//     console.log(province_data);
//     // var select = document.getElementById("selDataset");
//     // for (var i = 0; i < options.length; i++) {
//     //   var option = document.createElement("option");
//     //   option.text = options[i];
//     //   select.add(option);
//     }
//   ).catch(error => {
//     console.log('Error loading data:', error);
//   })
// }

// // Display the sample metadata, i.e., an individual's demographic information. Display each key-value pair from the metadata JSON object somewhere on the page.
// function demographic(selectedMetadataIndex) {
//   d3.json(url).then(data => {
//     const metadata = data.metadata; // Access the metadata from the JSON response
//     console.log(metadata[selectedMetadataIndex]);
//     // Select the metadata element using its id
//     const metadataElement = d3.select("#sample-metadata");
//     // Clear the existing contents (if any)
//     metadataElement.html("");
//     // Iterate over the metadata object and append the information to the element
//     Object.entries(metadata[selectedMetadataIndex]).forEach(([key, value]) => {
//       metadataElement
//         .append("p")
//         .text(`${key}: ${value}`);
//     });
//   });
// }

// // Extraction the index values with respect to the target values and calling the respective functions in optionChanged function
// // Created function for metadata
// function findValue(metadata, target) {
//   for (let i = 0; i < metadata.length; i++) {
//     if (metadata[i].id === target) {
//       return i; // Match found
//     }
//   }
//   return -1; // Match not found
// }
// // Created function for bar graph in regards to sample values
// function findsample_barValues(samples, target){
//   for (let i = 0; i < samples.length; i++) {
//     if (parseInt(samples[i].id) === target) {
//       return i; // Match found
//     }
//   }
//   return -1; // Match not found
// }
// // Created function for bubble graph in regards to sample values
// function findsample_bubbleValues(samples, target){
//   for (let i = 0; i < samples.length; i++) {
//     if (parseInt(samples[i].id) === target) {
//       return i; // Match found
//     }
//   }
//   return -1; // Match not found
// }

// // To update bar plot when a new sample is selected.
// function updateBarChart(selectedsampledataIndex) {
//   d3.json(url).then(data => {
//     const samples = data.samples;
//     // Find the selected sample
//     const selectedSampleData = samples[selectedsampledataIndex];
//     // Get the top 10 OTUs for the selected sample
//     const top10OTUs = selectedSampleData.sample_values.slice(0, 10).reverse();
//     const top10IDs = selectedSampleData.otu_ids.slice(0, 10).reverse();
//     const top10Labels = selectedSampleData.otu_labels.slice(0, 10);
//     // Update the trace object
//     const updatedTrace = {
//       x: top10OTUs,
//       y: top10IDs.map(id => `OTU ${id}`),
//       type: 'bar',
//       orientation: 'h',
//     };
//     // Update the data array
//     const updatedData = [updatedTrace];
//     // Update the layout object (if needed)
//     const updatedLayout = {
//       title: 'Top 10 OTUs',
//       xaxis: {
//         title: 'Sample Values',
//       },
//       yaxis: {
//         title: 'OTU IDs',
//         automargin: true,
//       },
//     };
//     // Update the chart
//     Plotly.newPlot('plot', updatedData, updatedLayout);
//   }).catch(error => {
//     console.log('Error loading data:', error);
//   });
// }

// // To update bubble plot when a new sample is selected.
// function updateBubbleChart(selectedsamplebubbledataIndex) {
//   d3.json(url).then(data => {
//     const samples = data.samples;
//     // Find the selected sample
//     const selectedSampleData = samples[selectedsamplebubbledataIndex];
//     const otuIDs = selectedSampleData.otu_ids;
//     const sampleValues = selectedSampleData.sample_values;
//     const otuLabels = selectedSampleData.otu_labels;
//     // Update the trace object
//     const updatedTrace = {
//       x: otuIDs,
//       y: sampleValues,
//       text: otuLabels,
//       mode: 'markers',
//       marker: {
//         size: sampleValues,
//         color: otuIDs,
//         colorscale: 'Viridis',
//       },
//     };
//     // Update the data array
//     const updatedData = [updatedTrace];
//     // Update the layout object (if needed)
//     const updatedLayout = {
//       title: 'Bubble Chart',
//       xaxis: {
//         title: 'OTU IDs',
//       },
//       yaxis: {
//         title: 'Sample Values',
//       },
//       showlegend: false,
//     };
//     // Update the chart
//     Plotly.newPlot('plot2', updatedData, updatedLayout);
//   }).catch(error => {
//     console.log('Error loading data:', error);
//   });
// }

// // This function is created to call the Gauge chart
// function updateGaugeChart(selectedMetadataIndex) {
//   d3.json(url).then(data => {
//     const metadata = data.metadata;
//     const selectedWashingFrequency = metadata[selectedMetadataIndex].wfreq;
//     // Update the gauge chart
//     const gaugeData = [
//       {
//         type: "indicator",
//         mode: "gauge+number",
//         value: selectedWashingFrequency,
//         title: {
//           text: "Belly Button Washing Frequency<br><sub>Scrubs per Week</sub>",
//           font: { size: 24 },
//         },
//         gauge: {
//           axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
//           bar: { color: "darkblue" },
//           bgcolor: "white",
//           borderwidth: 2,
//           bordercolor: "gray",
//           steps: [
//             { range: [0, 1], color: "#f8f7ff" },
//             { range: [1, 2], color: "#ede9ff" },
//             { range: [2, 3], color: "#e0d6ff" },
//             { range: [3, 4], color: "#d3ceff" },
//             { range: [4, 5], color: "#c6c5ff" },
//             { range: [5, 6], color: "#b9b8ff" },
//             { range: [6, 7], color: "#acacff" },
//             { range: [7, 8], color: "#9f9eff" },
//             { range: [8, 9], color: "#9291ff" },
//           ],
//         },
//       },
//     ];

//     const gaugeLayout = { width: 500, height: 400, margin: { t: 0, b: 0 } };

//     Plotly.newPlot('gauge', gaugeData, gaugeLayout);
//   }).catch(error => {
//     console.log('Error loading data:', error);
//   });
// }

// // To update all the data and plots when a new sample is selected.
// function optionChanged(selectedId) {
//   // Update the demographic information
//   d3.json(url).then(data => {
//     const metadata = data.metadata;
//     selectedMetadataIndex = findValue(metadata, parseInt(selectedId));
//     demographic(selectedMetadataIndex);
//     const samples = data.samples;
//     selectedsampledataIndex = findsample_barValues(samples, parseInt(selectedId));
//     updateBarChart(selectedsampledataIndex);
//     selectedsamplebubbledataIndex = findsample_bubbleValues(samples, parseInt(selectedId));
//     updateBubbleChart(selectedsamplebubbledataIndex);
//     updateGaugeChart(selectedMetadataIndex);
//   });
// };

