#!/usr/bin/python3

"""
Initialize Flask extensions commonly used for web development.
- cors: Flask-CORS extension for handling Cross-Origin Resource Sharing.
- db: Flask-SQLAlchemy extension for working with SQLAlchemy ORM.
- migrate: Flask-Migrate extension for managing database migrations.
- bcrypt: Flask-Bcrypt extension for password hashing.
- ma: Flask-Marshmallow extension for object serialization.
- jwt: Flask-JWT-Extended extension for JSON Web Tokens.
Example Usage:
```python
app = Flask(__name__)
cors.init_app(app)
db.init_app(app)
migrate.init_app(app, db)
bcrypt.init_app(app)
ma.init_app(app)
jwt.init_app(app)
```
"""
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
