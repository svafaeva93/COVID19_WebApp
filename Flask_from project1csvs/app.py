
from flask import Flask, jsonify
from pymongo import MongoClient
from config import connection_string


# # Create Flask application
app = Flask(__name__)

# # Create MongoDB client and connect to the database
client = MongoClient(connection_string)
# Access the desired database
db = client.covid_db

# Get the list of database names
database_names = client.list_database_names()

# Print the database names
for db_name in database_names:
    print(db_name)

# # Define a route to retrieve data from MongoDB
@app.route('/data', methods=['GET'])
def get_data():
    # Access a collection and fetch data
    collection = db.dataset_1
    data = collection.find()

#     # Convert data to JSON and return
    return jsonify(list(data))

# # Run the Flask application
if __name__ == '__main__':
    app.run()

