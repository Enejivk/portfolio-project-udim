# api/resources/payment.py
"""
This module provides RESTful API endpoints for managing Payment resources
using Flask-RESTful. It includes endpoints for retrieving, creating, updating,
and deleting payments.

Classes:
    PaymentResource: Resource for handling requests to the /payments/<int:payment_id>
                     endpoint.
    PaymentListResource: Resource for handling requests to the /payments endpoint.

Endpoints:
    /payments (GET): Retrieve a list of all payments.
    /payments (POST): Create a new payment.
    /payments/<int:payment_id> (GET): Retrieve a specific payment by ID.
    /payments/<int:payment_id> (PUT): Update a specific payment by ID.
    /payments/<int:payment_id> (DELETE): Delete a specific payment by ID.

Imports:
    from flask import request
    from flask_restful import Resource
    from models.models import Payment, db
    from api.schema.payment import payment_schema

Usage:
    This module should be registered with a Flask application instance to set
    up the API routes for payment management.
"""

from flask_jwt_extended import jwt_required
from flask_restful import Resource
from flask import request
from models.models import Payment, db
from api.schema.payment import payment_schema


class PaymentResource(Resource):
    method_decorators = [jwt_required()]
    def get(self, payment_id):
        """
        Retrieve a specific payment by ID.

        Parameters:
            payment_id (int): The ID of the payment to retrieve.

        Returns:
            dict: A dictionary containing the payment data.
        """
        payment = Payment.query.get_or_404(payment_id)
        return payment_schema.dump(payment)

    def put(self, payment_id):
        """
        Update a specific payment by ID.

        Parameters:
            payment_id (int): The ID of the payment to update.

        Returns:
            dict: A dictionary containing a success message and the updated
                  payment data.
        """
        payment = Payment.query.get_or_404(payment_id)
        data = request.get_json()
        errors = payment_schema.validate(data)
        if errors:
            return errors, 400
        for key, value in data.items():
            setattr(payment, key, value)
        db.session.commit()
        return {"msg": "Payment updated",
                "payment": payment_schema.dump(payment)}

    def delete(self, payment_id):
        """
        Delete a specific payment by ID.

        Parameters:
            payment_id (int): The ID of the payment to delete.

        Returns:
            dict: A dictionary containing a success message.
        """
        payment = Payment.query.get_or_404(payment_id)
        db.session.delete(payment)
        db.session.commit()
        return {"msg": "Payment deleted"}


class PaymentListResource(Resource):
    method_decorators = [jwt_required()]
    def get(self):
        """
        Retrieve a list of all payments.

        Returns:
            dict: A dictionary containing a list of all payments.
        """
        payments = Payment.query.all()
        return payment_schema.dump(payments, many=True)

    def post(self):
        """
        Create a new payment.

        Returns:
            dict: A dictionary containing a success message and the created
                  payment data.
        """
        data = request.get_json()
        errors = payment_schema.validate(data)
        if errors:
            return errors, 400
        payment = Payment(**data)
        db.session.add(payment)
        db.session.commit()
        return {"msg": "Payment created",
                "payment": payment_schema.dump(payment)}
