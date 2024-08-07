#!/usr/bin/python3

from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate 
from flask_sqlalchemy import SQLAlchemy

cors = CORS()
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
ma = Marshmallow()
jwt = JWTManager()