#!/usr/bin/python3

"""
This module sets up the Flask application with RESTful API endpoints for 
User, Group, Donation, and Debt resources. It also includes error handlers 
for validation and 404 errors.

Blueprints:
    app_auth: Blueprint for authentication-related routes with URL prefix 
              "/auth".
    app_view: Blueprint for API-related routes with URL prefix "/api".

API Endpoints:
    /users: Endpoint for UserList resource.
    /users/<int:user_id>: Endpoint for UserResource.
    /groups: Endpoint for GroupList resource.
    /groups/<int:group_id>: Endpoint for GroupResource.
    /donations: Endpoint for DonationList resource.
    /donations/<int:donation_id>: Endpoint for DonationResource.
    /debts: Endpoint for DebtList resource.
    /debts/<int:debt_id>: Endpoint for DebtResource.

Error Handlers:
    handle_marshmallow_error: Handles Marshmallow validation errors and 
                              returns a JSON response with error messages.
    not_found: Handles 404 errors and returns a JSON response indicating 
               resource not found.

Imports:
    from flask import Blueprint, jsonify, make_response
    from flask_restful import Api
    from marshmallow import ValidationError
    from api.resource.group import GroupList, GroupResource
    from api.resource.user import UserList, UserResource
    from api.resource.donation import DonationList, DonationResource
    from api.resource.debt import DebtList, DebtResource
    from api.views.auth import *

Usage:
    This module should be imported and registered with a Flask application 
    instance to set up the API routes and error handlers.
"""

from flask import Blueprint, jsonify, make_response
from flask_restful import Api
from marshmallow import ValidationError
from api.resource.group import GroupList, GroupResource
from api.resource.user import UserList, UserResource
from api.resource.donation import DonationList, DonationResource
from api.resource.debt import DebtList, DebtResource
from api.resource.group_user import UserGroupList

app_auth = Blueprint("app_auth", __name__, url_prefix="/auth")
app_view = Blueprint("app_view", __name__, url_prefix="/api")
api = Api(app_view, errors=app_view.errorhandler)

# Registering API endpoints for User, Group, Donation, and Debt resources.
api.add_resource(UserList, "/users")
api.add_resource(UserResource, "/users/<int:user_id>")
api.add_resource(GroupList, "/groups")
api.add_resource(GroupResource, "/groups/<int:group_id>")
api.add_resource(DonationList, "/donations")
api.add_resource(DonationResource, "/donations/<int:donation_id>")
api.add_resource(DebtList, "/debts")
api.add_resource(DebtResource, "/debts/<int:debt_id>")
api.add_resource(UserGroupList, "/user/<int:user_id>/groups")


@app_auth.errorhandler(ValidationError)
@app_view.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return make_response(jsonify({"error": e.messages}), 400)

@app_auth.errorhandler(404)
@app_view.errorhandler(404)
def not_found(error):
    """
    Handle 404 errors by returning a JSON response indicating resource
    not found.
    """
    return make_response(jsonify({"error": "Not found"}), 404)

from api.views.auth import *
