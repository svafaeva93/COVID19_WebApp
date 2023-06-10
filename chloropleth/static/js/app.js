/// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // Initialize the map
    let myMap = L.map("map", {
      center: [56.1304, -106.3468],
      zoom: 5
    });
  
    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
  
    // Load the GeoJSON and additional JSON data
    Promise.all([
      fetch('static/js/canada.geojson').then(response => response.json()),
      fetch('/cumulative_cases_province').then(response => response.json())
    ]).then(function (data) {
      var geojson = data[0];
      var additionalData = data[1];
      console.log(additionalData)
  
      // Find the maximum value of confirmed cases
      var maxConfirmedCases = Math.max(...additionalData.map(item => item.cum_confirmed_cases));
      console.log(maxConfirmedCases)
  
      // Create a style function for the choropleth map
      function style(feature) {
        var provinceName = feature.properties.name; // Replace 'name' with the property in your GeoJSON representing the province name
        var provinceData = additionalData.find(item => item._id === provinceName); // Find the data for the province
  console.log(provinceData)
  console.log(provinceName)

  // Calculate the color based on the confirmed cases
  var color = "#ffffb2"; // Default color
  if (provinceData) {
    var cases = provinceData.cum_confirmed_cases;
    var colorScale = d3.scaleSequential().domain([0, maxConfirmedCases]).interpolator(d3.interpolateReds); // Adjust the color scale as needed
    color = colorScale(cases);
  }

  // Return the style object with the updated color
  return {
    fillColor: color,
    weight: 1,
    color: "#fff",
    fillOpacity: 0.8
  };
}

// Create a GeoJSON layer with the style function
L.geoJSON(geojson, {
  style: style
}).addTo(myMap);
});
});

  // Set up the legend.
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits = geojson.options.limits;
    let colors = geojson.options.colors;
    let labels = [];

    // Add the minimum and maximum.
    let legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding the legend to the map
  legend.addTo(myMap);

});


// In this code, the style function style(feature) is updated to calculate the color based on the cumulative confirmed cases. It uses d3.scaleSequential to create a color scale that interpolates between colors based on the range of confirmed cases. The color scale is based on the maximum confirmed cases found in the additionalData array. The fillColor property of the style object is set to the color calculated for each province.

// Please note that you may need to adjust the paths to the JSON files ('static/js/canada.geojson' and '/cumulative_cases_province') based on your file locations and API endpoints. Additionally, ensure that the property used for matching provinces (_id === provinceName) is correct for your additional JSON data.







//         // Calculate the color based on the cumulative confirmed cases
//         var value = provinceData ? provinceData.cum_confirmed_cases : 0;
//         var color = getColor(value, maxConfirmedCases);
//   console.log(value)
//   console.log(color)

//         // Return the style object
//         return {
//           fillColor: color,
//           weight: 1,
//           opacity: 1,
//           color: 'white',
//           fillOpacity: 0.7
//         };
//       }
  
//       // Define the color ramp
//       function getColor(value, max) {
//         var percentage = value / max;
//         var hue = 120 - percentage * 120; // Adjust the hue based on the percentage
  
//         return 'hsl(' + hue + ', 100%, 50%)';
//       }
  
//       // Create a GeoJSON layer with the style function
//       L.geoJSON(geojson, {
//         style: style
//       }).addTo(myMap);
//     });
//   });
  
  
    

    

//       // Combine the GeoJSON and additional data
//       geojson.features.forEach(function (feature) {
//           var provinceName = feature.properties.name; // Replace 'id' with the property in your GeoJSON that matches the additional JSON data
//           if (additionalData.hasOwnProperty(provinceName)) {
//               feature.properties.value = additionalData[provinceName]; // Assign the additional data value to the GeoJSON feature
//           }
//       });

//       // Create a heat map layer
//       var heatMapLayer = L.heatLayer(
//           geojson.features.map(function (feature) {
//               return [
//                   feature.geometry.coordinates[1],
//                   feature.geometry.coordinates[0],
//                   feature.properties.value
//               ];
//           })
//       ).addTo(map);
//   });
// });

// // Creating the map object
// let myMap = L.map("map", {
//   center: [56.1304, -106.3468],
//   zoom: 5
// });

// // Adding the tile layer
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// // Use this link to get the GeoJSON data.
// let link = "static/data/canada.geojson";

// // The function that will determine the color of a neighborhood based on the name that it belongs to
// function chooseColor(name) {
//   if (name == "Ontario") return "yellow";
//   else if (name == "Alberta") return "red";
//   else if (name == "British Columbia") return "orange";
//   else if (name == "Saskatchewan") return "green";
//   else if (name == "Manitoba") return "purple";
//   else return "black";
// }

// // Getting our GeoJSON data
// d3.json(link).then(function(data) {
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data, {
//     // Styling each feature (in this case, a neighborhood)
//     style: function(feature) {
//       return {
//         color: "white",
//         // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
//         fillColor: chooseColor(feature.properties.name),
//         fillOpacity: 0.5,
//         weight: 1.5
//       };
//     },
//     // This is called on each feature.
//     onEachFeature: function(feature, layer) {
//       // Set the mouse events to change the map styling.
//       layer.on({
//         // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
//         mouseover: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.9
//           });
//         },
//         // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
//         mouseout: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.5
//           });
//         },
//         // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
//         click: function(event) {
//           myMap.fitBounds(event.target.getBounds());
//         }
//       });
//       // Giving each feature a popup with information that's relevant to it
//       layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr>" );

//     }
//   }).addTo(myMap);
// });
