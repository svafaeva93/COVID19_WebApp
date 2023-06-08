import json
from shapely.geometry import shape, Point

# Read the original GeoJSON file
with open('canada.json') as file:
    data = json.load(file)

# Process each feature to extract the province name and centroid
features = []
for feature in data['features']:
    province_name = feature['properties']['name']
    geometry = shape(feature['geometry'])
    centroid = geometry.centroid
    latitude, longitude = centroid.y, centroid.x

    # Create a new feature with the province name and centroid coordinates
    new_feature = {
        'type': 'Feature',
        'properties': {
            'name': province_name
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [longitude, latitude]
        }
    }

    features.append(new_feature)

# Create the final GeoJSON object with the extracted features
geojson = {
    'type': 'FeatureCollection',
    'features': features
}

# Write the resulting GeoJSON to the canada_centroids.json file
with open('canada_centroids.json', 'w') as file:
    json.dump(geojson, file)
