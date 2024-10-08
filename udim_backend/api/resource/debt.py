#!/usr/bin/python3
"""
This module provides RESTful API endpoints for managing Debt resources using
Flask-RESTful. It includes endpoints for retrieving, creating, updating, and
deleting debts.

Classes:
    DebtList: Resource for handling requests to the /debts endpoint.
    DebtResource: Resource for handling requests to the /debts/<int:debt_id>
                  endpoint.

Endpoints:
    /debts (GET): Retrieve a list of all debts.
    /debts (POST): Create a new debt.
    /debts/<int:debt_id> (GET): Retrieve a specific debt by ID.
    /debts/<int:debt_id> (PUT): Update a specific debt by ID.
    /debts/<int:debt_id> (DELETE): Delete a specific debt by ID.

Imports:
    from flask import request
    from flask_restful import Resource, abort
    from models.models import Debt
    from api.schema.debt import DebtSchema
    from extensions import db

Usage:
    This module should be registered with a Flask application instance to set
    up the API routes for debt management.
"""

from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource, abort
from models.models import Debt
from api.schema.debt import DebtSchema
from extensions import db


class DebtList(Resource):
    method_decorators = [jwt_required()]
    def get(self):
        """
        Retrieve a list of all debts.

        Returns:
            dict: A dictionary containing a list of all debts.
        """
        debts = Debt.query.all()
        schema = DebtSchema(many=True)
        return {"results": schema.dump(debts)}

    def post(self):
        """
        Create a new debt.

        Returns:
            dict: A dictionary containing a success message and the created
                  debt data.
        """
        schema = DebtSchema()
        validated_data = schema.load(request.json)

        debt = Debt(**validated_data)
        db.session.add(debt)
        db.session.commit()

        return {"msg": "Debt created", "debt": schema.dump(debt)}


class DebtResource(Resource):
    method_decorators = [jwt_required()]
    def get(self, debt_id):
        """
        Retrieve a specific debt by ID.

        Parameters:
            debt_id (int): The ID of the debt to retrieve.

        Returns:
            dict: A dictionary containing the debt data.
        """
        debt = Debt.query.get_or_404(debt_id)
        schema = DebtSchema()

        return {"debt": schema.dump(debt)}

    def put(self, debt_id):
        """
        Update a specific debt by ID.

        Parameters:
            debt_id (int): The ID of the debt to update.

        Returns:
            dict: A dictionary containing a success message and the updated
                  debt data.
        """
        schema = DebtSchema(partial=True)
        debt = Debt.query.get_or_404(debt_id)
        debt = schema.load(request.json, instance=debt)

        db.session.add(debt)
        db.session.commit()

        return {"msg": "Debt updated", "debt": schema.dump(debt)}

    def delete(self, debt_id):
        """
        Delete a specific debt by ID.

        Parameters:
            debt_id (int): The ID of the debt to delete.

        Returns:
            dict: A dictionary containing a success message.
        """
        debt = Debt.query.get_or_404(debt_id)

        db.session.delete(debt)
        db.session.commit()

        return {"msg": "Debt deleted"}
