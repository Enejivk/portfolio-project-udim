#!/usr/bin/python3
"""
This module provides authentication routes for user registration, login, token
refresh, and token revocation using Flask and Flask-JWT-Extended.

Routes:
    /register (POST): Register a new user.
    /login (POST): Log in an existing user.
    /refresh (POST): Refresh the access token.
    /revoke_access (DELETE): Revoke the access token.
    /revoke_refresh (DELETE): Revoke the refresh token.

Functions:
    register(): Registers a new user and returns the user data.
    login(): Authenticates a user and returns access and refresh tokens.
    refresh(): Generates a new access token using a refresh token.
    revoke_access_token(): Revokes the current access token.
    revoke_refresh_token(): Revokes the current refresh token.
    user_loader_callback(jwt_headers, jwt_payload): Loads a user from the JWT.
    check_if_token_revoked(jwt_headers, jwt_payload): Checks if a token is
        revoked.
"""

from flask import current_app as app
from extensions import db, bcrypt, jwt
from models.helper import add_token_to_database, is_token_revoked, revoke_token
from models.models import User
from api.schema.user import UserSchema, UserCreateSchema
from api.views import app_auth
from flask import request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt
from flask_jwt_extended import get_jwt_identity, jwt_required


@app_auth.route("/register", methods=["POST"])
def register():
    """
    Register a new user.

    Returns:
        dict: A message indicating the user was created and the user data.
    """
    if not request.is_json:
        return jsonify({"msg": "Not a JSON"}), 400

    schema = UserCreateSchema()
    user = schema.load(request.json)
    db.session.add(user)
    db.session.commit()

    schema = UserSchema()
    return {"msg": "User created", "user": schema.dump(user)}


@app_auth.route("/login", methods=["POST"])
def login():
    """
    Log in an existing user.

    Returns:
        dict: Access and refresh tokens if credentials are valid.
    """
    if not request.is_json:
        return jsonify({"msg": "Not a JSON"}), 400

    email = request.json.get("email")
    password = request.json.get("password")
    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()
    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid email and password"}), 400

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    add_token_to_database(access_token)
    add_token_to_database(refresh_token)
    return jsonify({"access_token": access_token,
                    "refresh_token": refresh_token}), 200


@app_auth.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    """
    Refresh the access token.

    Returns:
        dict: A new access token.
    """
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    add_token_to_database(access_token)
    return jsonify({"access_token": access_token}), 200


@app_auth.route("/revoke_access", methods=["DELETE"])
@jwt_required()
def revoke_access_token():
    """
    Revoke the current access token.

    Returns:
        dict: A message indicating the token was revoked.
    """
    jti = get_jwt()["jti"]
    user_identity = get_jwt_identity()
    revoke_token(jti, user_identity)
    return jsonify({"message": "token revoked"}), 200


@app_auth.route("/revoke_refresh", methods=["DELETE"])
@jwt_required(refresh=True)
def revoke_refresh_token():
    """
    Revoke the current refresh token.

    Returns:
        dict: A message indicating the token was revoked.
    """
    jti = get_jwt()["jti"]
    user_identity = get_jwt_identity()
    revoke_token(jti, user_identity)
    return jsonify({"message": "token revoked"}), 200


@jwt.user_lookup_loader
def user_loader_callback(jwt_headers, jwt_payload):
    """
    Load a user from the JWT.

    Args:
        jwt_headers (dict): The JWT headers.
        jwt_payload (dict): The JWT payload.

    Returns:
        User: The user corresponding to the JWT identity.
    """
    identity = jwt_payload[app.config["JWT_IDENTITY_CLAIM"]]
    return User.query.get(identity)


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_headers, jwt_payload):
    """
    Check if a token is revoked.

    Args:
        jwt_headers (dict): The JWT headers.
        jwt_payload (dict): The JWT payload.

    Returns:
        bool: True if the token is revoked, False otherwise.
    """
    return is_token_revoked(jwt_payload)
