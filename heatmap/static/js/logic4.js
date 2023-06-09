// Creating the map object
let myMap = L.map("map", {
  center: [56.1304, -106.3468],
  zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
let link = "static/js/canada.geojson";

// The function that will determine the color of a neighborhood based on the borough that it belongs to
function chooseColor(name) {
  if (name == "Ontario") return "yellow";
  else if (name == "Alberta") return "red";
  else if (name == "British Columbia") return "orange";
  else if (name == "Saskatchewan") return "green";
  else if (name == "Manitoba") return "purple";
  else if (name == "Quebec") return "blue";
  else if (name == "New Brunswick") return "cyan";
  else if (name == "Nova Scotia") return "brown";
  else if (name == "Newfoundland and Labrador") return "deepskyblue";
  else if (name == "Prince Edward Island") return "coral";
  else if (name == "Northwest Territories") return "sienna";
  else if (name == "Yukon Territory") return "salmon";
  else if (name == "Nunavut") return "lime";
  else return "black";
}

const provinceData = [
  {
    "_id": "Ontario",
    "cum_confirmed_cases": 436487621
  },
  {
    "_id": "Quebec",
    "cum_confirmed_cases": 396869739
  },
  {
    "_id": "Alberta",
    "cum_confirmed_cases": 312265701
  },
  {
    "_id": "British Columbia",
    "cum_confirmed_cases": 197692349
  },
  {
    "_id": "Manitoba",
    "cum_confirmed_cases": 82397753
  },
  {
    "_id": "Saskatchewan",
    "cum_confirmed_cases": 50901860
  },
  {
    "_id": "New Brunswick",
    "cum_confirmed_cases": 19808333
  },
  {
    "_id": "Nova Scotia",
    "cum_confirmed_cases": 17072397
  },
  {
    "_id": "Newfoundland and Labrador",
    "cum_confirmed_cases": 13019523
  },
  {
    "_id": "Prince Edward Island",
    "cum_confirmed_cases": 11016190
  },
  {
    "_id": "Northwest Territories",
    "cum_confirmed_cases": 1670097
  },
  {
    "_id": "Yukon",
    "cum_confirmed_cases": 1643006
  },
  {
    "_id": "Nunavut",
    "cum_confirmed_cases": 431216
  }
];
// Getting our GeoJSON data
d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    // Styling each feature (in this case, a neighborhood)
    style: function(feature) {
      const province = provinceData.find(p => p._id === feature.properties.name);
      return {
        color: "white",
        // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
        fillColor: chooseColor(feature.properties.name),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // This is called on each feature.
    onEachFeature: function(feature, layer) {
      const province = provinceData.find(p => p._id === feature.properties.name);
      if (province) {
        // Giving each feature a popup with information that's relevant to it
        layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>Confirmed Cases: " + province.cum_confirmed_cases + "</h2>");
      }
      // Set the mouse events to change the map styling.
      layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr>" );

    }
  }).addTo(myMap);
});
