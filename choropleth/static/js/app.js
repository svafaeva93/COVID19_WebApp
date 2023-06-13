// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {

  // Initialize the map
  let myMap = L.map("map", {
    center: [56.1304, -106.3468],
    zoom: 3
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

    // Find the maximum value of confirmed cases
    var maxConfirmedCases = Math.max(...additionalData.map(item => item.cum_confirmed_cases));

    // Create a style function for the choropleth map
    function style(feature) {
      var provinceName = feature.properties.name; // Replace 'name' with the property in your GeoJSON representing the province name
      var provinceData = additionalData.find(item => item._id === provinceName); // Find the data for the province

      // Calculate the color based on the confirmed cases
      var color = "#ffffb2"; // Default color
      if (provinceData) {
        var cases = provinceData.cum_confirmed_cases;
        // Calculate the color based on the confirmed cases
        var colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0, maxConfirmedCases]); // Adjust the color scale as needed
        color = colorScale(cases);
      }

      // Return the style object with the updated color
      return {
        fillColor: color,
        weight: 1,
        color: "#636363",
        fillOpacity: 0.8
      };
    }

    // Create a GeoJSON layer with the style function
    L.geoJSON(geojson, {
      style: style,
      onEachFeature: onEachFeature // Call the onEachFeature function for each feature
    }).addTo(myMap);

    // Set up the legend
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function (map) {
      let div = L.DomUtil.create("div", "info legend");
      let labels = [];

      // Add the legend title
      div.innerHTML = "<h2>Legend</h2>";

      // Add the legend items
      let colors = d3.schemeGreens[9]; // Color scale
      var legendInfo = maxConfirmedCases / 9; 
      for (let i = 0; i < colors.length; i++) {
        labels.push(
          '<li style="background-color:' + colors[i] + '"></li> ' +
          (i * legendInfo).toFixed(0) + ' - ' + ((i + 1) * legendInfo).toFixed(0)
        );
      }

      // Add the legend items to the div
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";

      return div;
    };

    // Adding the legend to the map
    legend.addTo(myMap);

    // This is called on each feature.
    function onEachFeature(feature, layer) {
      // Find the data for the province
      var provinceData = additionalData.find(item => item._id === feature.properties.name);

      // Generate the content for the popup
      var popupContent = "<h1>" + feature.properties.name + "</h1>";
      if (provinceData) {
        popupContent += "<h2>Cumulative Confirmed Cases: " + provinceData.cum_confirmed_cases + "</h2>";
      } else {
        popupContent += "<h2>No data available</h2>";
      }

      // Bind the popup to the layer
      layer.bindPopup(popupContent);

      // Set the mouse events to change the map styling.
      layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
        mouseover: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
        mouseout: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (province) is clicked, it enlarges to fit the screen.
        click: function (event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
    }

  });
});
