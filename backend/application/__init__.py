import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_pymongo import PyMongo

app = Flask(__name__)

CORS(app)
load_dotenv()
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['SECRET_KEY'] = os.getenv('SECRET')

mongodb_client = PyMongo(app)
    
db = mongodb_client.db

@app.route('/')
def home():
    return '<h1>Welcome to the PropertEase API </h1>'

    
from application.routes.users import user_routes
app.register_blueprint(user_routes, url_prefix='/users')

from application.routes.properties import property_routes
app.register_blueprint(property_routes, url_prefix='/properties')

from application.routes.workorders import workorder_routes
app.register_blueprint(workorder_routes, url_prefix='/workorders')