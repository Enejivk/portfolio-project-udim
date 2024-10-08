#!/usr/bin/python3

"""
Initialize a Flask application with extensions and blueprints.

## Inputs
- Flask application instance
- Configuration object from `config`
- Extensions: `db`, `bcrypt`, `ma`, `migrate`, `cors`, `jwt`
- Blueprints: `app_view`, `app_auth`

## Outputs
- Running Flask application configured with extensions and blueprints.
"""


import os
from api.views import app_view, app_auth
from extensions import db, bcrypt, ma, migrate, cors, jwt
from flask import Flask, jsonify, make_response

app = Flask(__name__)
app.config.from_object("config")

db.init_app(app)
cors.init_app(app, supports_credentials=True, resources={
              r"/*": {"origins": "http://localhost"}})
bcrypt.init_app(app)
migrate.init_app(app, db)
ma.init_app(app)
jwt.init_app(app)

app.register_blueprint(app_view)
app.register_blueprint(app_auth)


@app.errorhandler(404)
def not_found(error):
    """
    Handle 404 errors by returning a JSON response indicating resource
    not found.
    """
    return make_response(jsonify({"error": "Not found"}), 404)


@app.errorhandler(400)
def bad_request(error):
    """
    Handle 400 errors by returning a JSON response indicating a bad request.
    """
    return make_response(jsonify({"error": "bad request"}), 400)


@app.errorhandler(403)
def forbidden(error):
    """
    Handle 403 errors by returning a JSON response indicating a forbidden
    request.
    """
    return make_response(jsonify({"error": error.message}), 403)


if __name__ == '__main__':
    try:
        if not os.path.exists(app.config.get('UPLOAD_FOLDER')):
            os.makedirs(app.config.get('UPLOAD_FOLDER'))
        app.run(
            host=app.config.get("FLASK_RUN_HOST"),
            port=app.config.get("FLASK_RUN_PORT"),
        )
    except Exception as e:
        print(e)
