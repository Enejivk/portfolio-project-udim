#!/usr/bin/python3
"""
This module defines Marshmallow schemas for serializing and deserializing Payment
objects. It includes validation for amount, date, and user_id fields.
"""
from extensions import ma
from marshmallow import Schema, fields
from models.models import Payment


class PaymentSchema(ma.SQLAlchemyAutoSchema):
    """
    PaymentSchema is a Marshmallow schema for serializing and deserializing Payment
    objects. It includes validation for amount, date, and user_id fields.
    """
    class Meta:
        """
        Meta class for PaymentSchema.
        """
        model = Payment
        include_fk = True
        load_instance = True


payment_schema = PaymentSchema()
