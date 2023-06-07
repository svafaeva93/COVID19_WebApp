from flask import Flask, request, Response, jsonify, abort
from pymongo import MongoClient
from credentials import username, password
import json
from pprint import pprint 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define your credentials and DBname
client = MongoClient(f'mongodb+srv://{username}:{password}@cluster0.mymgc5e.mongodb.net/')

# Test if connected to the MongoDB Atlas
# print(client.list_database_names())

dbname = 'covid_db'
db = client[dbname]  # MongoDB database
print(db.list_collection_names())

#assign each collection to a variable 

dataset_1 = db['dataset_1']
dataset_2 = db['dataset_2']
dataset_3 = db['dataset_3']

#Welcome Page 
@app.route("/")
def main_page():
    return "<h2>Main Page for Flask API</h2>"

#Confirmed Cases per Day 
@app.route("/daily_cases")
def confirmed_data():
    query = {}
    fields = {'Province':1, 'Date':1, 'Confirmed cases per day':1}
    results = dataset_1.find(query, fields)
    output_list = [convert_object_id(result) for result in results]

    return jsonify(output_list)

#Mortality Rate 
@app.route("/mortality_rate")
def mortality_data():
    query = {}
    fields = {'Province':1, 'Date':1, 'Mortality rate':1}
    results = dataset_1.find(query, fields)
    results_list = [convert_object_id(result) for result in results]

    return jsonify(results_list)

def convert_object_id(result):
    result['_id'] = str(result['_id'])
    return result

#Vaccination 
@app.route("/vaccines")
def vaccine_rate():
    query = {}
    results = dataset_3.find(query)
    results_list = [convert_object_id(result) for result in results]

    return jsonify(results_list)

#Vaccines based on age and gender 
@app.route("/gender&age")
def vaccines():
    query = {}
    results = dataset_2.find(query)
    results_list = [convert_object_id(result) for result in results]

    return jsonify(results_list)


if __name__ == '__main__' :
    app.run(debug=True, port=5000)
