#!/usr/bin/python3
"""
This module defines the DonationSchema for serializing and deserializing
Donation objects using Marshmallow. It includes validation for the donation
amount, as well as nested schemas for user and group.
"""

from marshmallow import validate
from marshmallow.fields import String, Float
from extensions import ma
from models.models import Donation


class DonationSchema(ma.SQLAlchemyAutoSchema):
    """
    DonationSchema is a Marshmallow schema for serializing and deserializing
    Donation objects. It includes validation for the donation amount, as well as
    nested schemas for user and group."""
    amount = Float(required=True)
    description = String(validate=[validate.Length(max=1024)])

    class Meta:
        """
        Meta class for DonationSchema.
        """
        model = Donation
        load_instance = True
        exclude = ["id"]
        include_relationships = True
