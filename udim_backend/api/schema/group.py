#!/usr/bin/python3
"""
This module defines the GroupSchema for serializing and deserializing Group
objects using Marshmallow. It includes validation for the group name and
nested schemas for payments and members.

Classes:
    GroupSchema: A Marshmallow schema for Group objects.

Attributes:
    name (String): The name of the group. It is required and must be at least
        3 characters long.
    payments (Nested): A nested schema for payments related to the group.
    members (Nested): A nested schema for members related to the group.

Methods:
    validate_name(data, **kwargs): Validates that the group name is unique in
        the Group table.
"""

from marshmallow import validate, validates_schema, ValidationError
from marshmallow.fields import String
from extensions import ma
from models.models import Group
from api.schema.payment import PaymentSchema
from api.schema.user import UserSchema


class GroupSchema(ma.SQLAlchemyAutoSchema):
    """
    GroupSchema is a Marshmallow schema for serializing and deserializing Group
    objects. It includes validation for the group name and nested schemas for
    payments and members.

    Attributes:
        name (String): The name of the group. It is required and must be at
            least 3 characters long.
        payments (Nested): A nested schema for payments related to the group.
        members (Nested): A nested schema for members related to the group.
    """

    name = String(required=True, validate=[validate.Length(min=3)],
                  error_messages={
                      "required": "The group name is required",
                      "invalid": "The group name is invalid and needs to be a \
string",
    })
    # payments = ma.Nested(PaymentSchema, many=True)
    # members = ma.Nested(UserSchema, many=True)

    @validates_schema
    def validate_name(self, data, **kwargs):
        """
        Validates that the group name is unique in the Group table.

        Args:
            data (dict): The data to validate.
            **kwargs: Additional keyword arguments.

        Raises:
            ValidationError: If the group name already exists in the Group
                table.
        """
        name = data.get("name")

        if Group.query.filter_by(name=name).count():
            raise ValidationError(f"Group name {name} already exists.")

    class Meta:
        """
        Meta class for GroupSchema.

        Attributes:
            model (class): The model class that the schema corresponds to.
            load_instance (bool): Whether to load the model instance when
            deserializing data.
            include_fk (bool): Whether to include foreign key fields in the
            serialized output.
        """
        model = Group
        load_instance = True
        include_fk = True


group_schema = GroupSchema()
