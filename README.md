Flask Project Readme

Visualizing the Pandemic: A Data Analysis Approach to COVID-19 in Canada 

Check here: https://covidcanada.fly.dev

This repository contains our third project on COVID-19, where one can find visualized data presented in a web interactive app. As this was a group project everyones work was combined in one directory when finalizing. The final product is found in the folder named "Merging Work". 

The readme provides an overview and instructions for setting up and running the Flask project with a Python backend and a JavaScript frontend using HTML and CSS.

Project Structure
The project structure follows a common layout for Flask projects:
  - The app.py file contains the Flask application code.
  - The /static/ directory holds static files such as CSS, JavaScript, choropleth.js and leaflet-heat.js, as well as the JSON files.
  - The /templates/ directory contains HTML templates for rendering dynamic content.
  - The credentials.py file contains configuration settings.
  - fly.toml file for deploying the flask app with Fly.io 
  - The requirements.txt file lists the project dependencies.
 - The README.md file contains project documentation (this file).
   
*Note: while launching fly.io the name of app.py was changed to server.py;

Setup
Clone the repository or download the project files.

1. Create and activate a virtual environment:
python3 -m venv venv
source venv/bin/activate

2. Install the dependencies: pip install -r requirements.txt
3. (Optional) If you're using a database, update the database connection settings in config.py or .env.
4. Run the Flask application: flask run
5. Access the application in your web browser at http://localhost:5000.

Resources
Flask Documentation
HTML, CSS, and JavaScript Tutorials











