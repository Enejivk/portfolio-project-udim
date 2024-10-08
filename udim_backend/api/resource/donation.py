"""
This module provides RESTful API endpoints for managing Donation resources
using Flask-RESTful. It includes endpoints for retrieving, creating, updating,
and deleting donations.

Classes:
    DonationList: Resource for handling requests to the /donations endpoint.
    DonationResource: Resource for handling requests to the /donations/<int:donation_id>
                      endpoint.

Endpoints:
    /donations (GET): Retrieve a list of all donations.
    /donations (POST): Create a new donation.
    /donations/<int:donation_id> (GET): Retrieve a specific donation by ID.
    /donations/<int:donation_id> (PUT): Update a specific donation by ID.
    /donations/<int:donation_id> (DELETE): Delete a specific donation by ID.

Imports:
    from flask import request
    from flask_restful import Resource, abort
    from models.models import Donation
    from api.schema.donation import DonationSchema
    from extensions import db

Usage:
    This module should be registered with a Flask application instance to set
    up the API routes for donation management.
"""

from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource, abort
from models.models import Donation
from api.schema.donation import DonationSchema
from extensions import db


class DonationList(Resource):
    method_decorators = [jwt_required()]
    def get(self):
        """
        Retrieve a list of all donations.

        Returns:
            dict: A dictionary containing a list of all donations.
        """
        donations = Donation.query.all()
        schema = DonationSchema(many=True)
        return {"results": schema.dump(donations)}

    def post(self):
        """
        Create a new donation.

        Returns:
            dict: A dictionary containing a success message and the created
                  donation data.
        """
        schema = DonationSchema()
        validated_data = schema.load(request.json)

        donation = Donation(**validated_data)
        db.session.add(donation)
        db.session.commit()

        return {"msg": "Donation created", "donation": schema.dump(donation)}


class DonationResource(Resource):
    method_decorators = [jwt_required()]
    def get(self, donation_id):
        """
        Retrieve a specific donation by ID.

        Parameters:
            donation_id (int): The ID of the donation to retrieve.

        Returns:
            dict: A dictionary containing the donation data.
        """
        donation = Donation.query.get_or_404(donation_id)
        schema = DonationSchema()

        return {"donation": schema.dump(donation)}

    def put(self, donation_id):
        """
        Update a specific donation by ID.

        Parameters:
            donation_id (int): The ID of the donation to update.

        Returns:
            dict: A dictionary containing a success message and the updated
                  donation data.
        """
        schema = DonationSchema(partial=True)
        donation = Donation.query.get_or_404(donation_id)
        donation = schema.load(request.json, instance=donation)

        db.session.add(donation)
        db.session.commit()

        return {"msg": "Donation updated", "donation": schema.dump(donation)}

    def delete(self, donation_id):
        """
        Delete a specific donation by ID.

        Parameters:
            donation_id (int): The ID of the donation to delete.

        Returns:
            dict: A dictionary containing a success message.
        """
        donation = Donation.query.get_or_404(donation_id)

        db.session.delete(donation)
        db.session.commit()

        return {"msg": "Donation deleted"}
