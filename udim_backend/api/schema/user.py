#!/usr/bin/python3

"""
This module defines Marshmallow schemas for serializing and deserializing User
objects. It includes validation for first name, last name, and email fields,
as well as a nested schema for payments related to the user.

Classes:
    UserSchema: A schema for serializing and deserializing User objects.
        Attributes:
            first_name (String): The first name of the user. It is required
                and must be at least 3 characters long.
            last_name (String): The last name of the user. It is required
                and must be at least 3 characters long.
            email (String): The email of the user. It is required and must be
                a valid email format.
            payments (Nested): A nested schema for payments related to the user.
        Methods:
            validate_email(data, **kwargs): Validates that the email is unique
                in the User table.
    UserCreateSchema: A schema for serializing and deserializing User objects
        specifically for user creation. It extends the UserSchema by adding a
        required password field.
        Attributes:
            password (String): The password of the user. It is required.
        Methods:
            None

Attributes:
    user_schema (UserSchema): An instance of UserSchema.
    user_create_schema (UserCreateSchema): An instance of UserCreateSchema.
"""

from marshmallow import validate, validates_schema, ValidationError
from marshmallow.fields import String

from extensions import ma
from models.models import User

from dataclasses import dataclass
from datetime import datetime as dt
from api.schema.payment import PaymentSchema
from api.schema.debt import DebtSchema
from api.schema.donation import DonationSchema


class UserSchema(ma.SQLAlchemyAutoSchema):
    """
    UserSchema is a Marshmallow schema for serializing and deserializing User
    objects. It includes validation for first name, last name, and email fields.

    Attributes:
        first_name (String): The first name of the user. It is required and must
            be at least 3 characters long.
        last_name (String): The last name of the user. It is required and must
            be at least 3 characters long.
        email (String): The email of the user. It is required and must be a
            valid email format.
        payments (Nested): A nested schema for payments related to the user.

    Methods:
        validate_email(data, **kwargs): Validates that the email is unique in
            the User table.
    """

    first_name = String(
        required=True,
        validate=[
            validate.Length(
                min=3)],
        error_messages={
            "required": "The first name is required",
            "invalid": "The first_name is invalid and needs to \
    be a string",
        })

    last_name = String(
        required=True,
        validate=[
            validate.Length(
                min=3)],
        error_messages={
            "required": "The last name is required",
            "invalid": "The last name is invalid and needs to be \
    a string",
        })
    email = String(required=True, validate=[validate.Email()])

    # payments = ma.Nested(PaymentSchema, many=True)
    # debts = ma.Nested(DebtSchema, many=True)
    # donations = ma.Nested(DonationSchema, many=True)
    # groups = ma.Nested(GroupSchema, many=True)

    @validates_schema
    def validate_email(self, data, **kwargs):
        """
        Validates that the email is unique in the User table.

        Args:
            data (dict): The data to validate.
            **kwargs: Additional keyword arguments.

        Raises:
            ValidationError: If the email already exists in the User table.
        """
        email = data.get("email")

        if User.query.filter_by(email=email).count():
            raise ValidationError(f"Email {email} already exists.")

    class Meta:
        model = User
        load_instance = True
        include_fk = True
        exclude = ["password", "updated_at"]


class UserCreateSchema(UserSchema):
    """
    UserCreateSchema is a Marshmallow schema for serializing and deserializing
    User objects specifically for user creation. It extends the UserSchema by
    adding a required password field.

    Attributes:
        password (String): The password of the user. It is required.

    Methods:
        None
    """
    password = String(required=True)

    class Meta:
        """
        Meta class to specify the model and loading options for the schema.

        Attributes:
            model (User): The model class that the schema is based on.
            load_instance (bool): Whether to load an instance of the model.
        """
        model = User
        load_instance = True


user_schema = UserSchema()
user_create_schema = UserCreateSchema()
