#!/usr/bin/python3
"""
This code module is a configuration setup for a Flask application, loading
environment variables and setting various configuration parameters.
"""
from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()

FLASK_RUN_HOST = os.environ.get("FLASK_RUN_HOST", "0.0.0.0")
FLASK_RUN_PORT = os.environ.get("FLASK_RUN_PORT", 9000)
FLASK_DEBUG = os.environ.get("FLASK_DEBUG")
SQLALCHEMY_DATABASE_URI = os.environ.get("SQLITE_DATABASE_URI")
SQLALCHEMY_TRACK_MODIFICATIONS = False
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
JWT_TOKEN_LOCATION = ["headers"]
JWT_IDENTITY_CLAIM = "user_id"
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=60)
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static/profile_images')
