
# from flask import Flask, jsonify
# from pymongo import MongoClient

# app = Flask(__name__)

# Create an instance of MongoClient
from pymongo import MongoClient

# Assign your connection string to a variable
connection_string = "mongodb+srv://abdyramanovaj:covid19@cluster0.mymgc5e.mongodb.net/"

# Create an instance of MongoClient using the connection string
client = MongoClient(connection_string)

# Collection name 
COVID19_data = client.dataset_1


# @app.route('/')
# def index():
#     return 'Hello, World!'

# # Define API route
# @app.route('/data', methods=['GET'])
# def get_data():
#     data = []
#     query = {'Province': 'ON'}
#     results = COVID19_data.find(query)
#     for result in results:
#         data.append({
#             'id': str(result['_id']),
#             'Province': result['Province'],
#             'Cases': result['Cases']
#         })

#     return jsonify(data)

# if __name__ == '__main__':
#     app.run(debug=True)
