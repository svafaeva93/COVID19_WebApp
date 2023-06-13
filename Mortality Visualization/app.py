from flask import Flask, request, Response, jsonify, abort, render_template
from pymongo import MongoClient
from credentials import username, password
import json
from pprint import pprint


app = Flask(__name__)


# Define your credentials and DBname
client = MongoClient(
    f'mongodb+srv://{username}:{password}@cluster0.mymgc5e.mongodb.net/')

# Test if connected to the MongoDB Atlas
# print(client.list_database_names())

dbname = 'covid_db'
db = client[dbname]  # MongoDB database
print(db.list_collection_names())

# assign each collection to a variable

dataset_1 = db['dataset_1']
dataset_2 = db['dataset_2']
dataset_3 = db['dataset_3']

# Welcome Page


@app.route("/")
def main_page():
    return render_template('index.html')

# Confirmed Cases per Day


@app.route("/daily_cases")
def confirmed_data():
    query = {}
    fields = {'Province': 1, 'Date': 1, 'Confirmed cases per day': 1}
    results = dataset_1.find(query, fields)
    output_list = [convert_object_id(result) for result in results]
    return jsonify(output_list)


@app.route("/dropdown_province")
def dropdown_province_data():
    collection = db['dataset_1']
    provinces = collection.distinct("Province", {})
    return jsonify(provinces)

# Mortality Rate


@app.route("/mortality_rate_date")
def mortality_rate_date():
    collection = db['dataset_1']  # Update with the appropriate collection
    pipeline = [
        {
            "$project": {
                "_id": 0,
                "Province": "$Province",
                "Date": "$Date",
                "Mortality rate": "$Mortality rate"
            }
        },
        {
            "$sort": {
                "Date": 1
            }
        }
    ]
    results = collection.aggregate(pipeline)
    results_list = list(results)

    return jsonify(results_list)


@app.route("/mortality_rate")
def mortality_data():
    collection = db['dataset_1']  # Update with the appropriate collection
    pipeline = [
        {
            "$group": {
                "_id": "$Province",
                "MortalityRate": {"$max": "$Mortality rate"},
                "Date": {"$max": "$Date"}
            }
        },
        {
            "$project": {
                "_id": 0,
                "Province": "$_id",
                "Mortality rate": "$MortalityRate"
            }
        },
        {
            "$sort": {
                "Mortality rate": 1
            }
        }
    ]
    results = collection.aggregate(pipeline)
    results_list = list(results)

    return jsonify(results_list)


def convert_object_id(result):
    result['_id'] = str(result['_id'])
    return result

# Vaccination


@app.route("/vaccines")
def vaccine_rate():
    query = {}
    results = dataset_3.find(query)
    results_list = [convert_object_id(result) for result in results]

    return jsonify(results_list)

# Vaccines based on age and gender


@app.route("/gender_age")
def vaccines():
    collection = db['dataset_2']
    # Define the grouping pipeline
    pipeline = [
        {
            "$group": {
                "_id": {
                    "Age": "$Age",
                    "Sex": {"$toString": "$Sex"}
                },
                "TotalVaccinedose1": {"$sum": "$Cumulative number of people (Vaccinedose1)"}
            }
        },
        {
            "$project": {
                "_id": 0,
                "Age": "$_id.Age",
                "Sex": "$_id.Sex",
                "TotalVaccinedose1": 1
            }
        },
        {
            "$sort": {
                "Age": 1
            }
        }
    ]

    results = collection.aggregate(pipeline)
    grouped_data = list(results)

# Process the grouped data and update the "Sex" field
    for group in grouped_data:
        if group["Sex"] == "false":
            group["Sex"] = "f"

    return jsonify(grouped_data)


@app.route("/age")
def vaccines_ages():
    collection = db['dataset_2']
    # Define the grouping pipeline
    pipeline = [
        {
            "$group": {
                "_id": "$Age",
                "TotalVaccinedose1": {"$max": "$Cumulative number of people (Vaccinedose1)"},
                "Date": {"$max": "$Date"}
            }
        },
        {
            "$project": {
                "_id": 0,
                "Age": "$_id",
                "TotalVaccinedose1": 1,
                "Date": 1
            }
        },
        {
            "$sort": {
                "TotalVaccinedose1": 1
            }
        }
    ]

    results = collection.aggregate(pipeline)
    results_list = list(results)
    return jsonify(results_list)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
