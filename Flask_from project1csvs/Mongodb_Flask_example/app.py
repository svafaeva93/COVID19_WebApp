# pip install flask pymongo
from flask import Flask, render_template
from pymongo import MongoClient
app = Flask(__name__)
# Configure MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client['Covid19_project3']
collection = db['vaccinemap_data']
print(collection.find_one())
@app.route('/display_collection_content')
def display_collection_content():
    documents = collection.find()
    print(documents.count())
    return render_template('index.html', documents=documents)
if __name__ == '__main__':
    app.run()
# use this one for jsonify output
# def display_collection_content():
#     documents = list(collection.find())
#     json_documents = json.dumps(documents, default=str)
#     return json_documents