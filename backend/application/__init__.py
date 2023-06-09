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


    
from application.routes.users import user_routes
app.register_blueprint(user_routes)