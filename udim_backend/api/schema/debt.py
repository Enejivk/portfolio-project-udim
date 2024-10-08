#!/usr/bin/python3
"""
This module defines Marshmallow schemas for serializing and deserializing Debt
objects. It includes validation for amount, description, and user_id fields.
"""
from marshmallow import validate
from marshmallow.fields import String, Float
from extensions import ma
from models.models import Debt


class DebtSchema(ma.SQLAlchemyAutoSchema):
    """
    DebtSchema is a Marshmallow schema for serializing and deserializing Debt
    objects. It includes validation for amount, description, and user_id fields.

    Attributes:
        amount (Float): The amount of the debt. It is required.
        description (String): The description of the debt. It is optional and
            must be no more than 1024 characters long.
    Methods:
        None
    """
    amount = Float(required=True)
    description = String(validate=[validate.Length(max=1024)])

    class Meta:
        """
        Meta class for DebtSchema.
        """
        model = Debt
        load_instance = True
        exclude = ["id"]
        include_relationships = True
