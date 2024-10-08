#!/usr/bin/python3
"""
This module provides RESTful API endpoints for managing Group resources using
Flask-RESTful. It includes endpoints for retrieving, creating, updating, and
deleting groups.

Classes:
    GroupList: Resource for handling requests to the /groups endpoint.
    GroupResource: Resource for handling requests to the /groups/<int:group_id>
                   endpoint.

Endpoints:
    /groups (GET): Retrieve a list of all groups.
    /groups (POST): Create a new group.
    /groups/<int:group_id> (GET): Retrieve a specific group by ID.
    /groups/<int:group_id> (PUT): Update a specific group by ID.
    /groups/<int:group_id> (DELETE): Delete a specific group by ID.

Imports:
    from extensions import db
    from models.models import Group
    from api.schema.group import group_schema
    from api.schema.user import user_schema
    from flask import request
    from flask_jwt_extended import get_current_user, jwt_required
    from flask_restful import Resource, abort

Usage:
    This module should be registered with a Flask application instance to set
    up the API routes for group management.
"""

from extensions import db
from models.models import Group
from api.schema.group import group_schema
from api.schema.user import user_schema
from flask import request
from flask_jwt_extended import get_current_user, jwt_required
from flask_restful import Resource, abort


class GroupList(Resource):
    """
    Resource class for handling operations related to groups.

    Attributes:
        method_decorators (list): List of method decorators,
        in this case, requiring JWT authentication.

    Methods:
        get: Retrieve a list of all groups.
        post: Create a new group.
    """
    method_decorators = [jwt_required()]

    def get(self):
        """
        Retrieve a list of all groups.

        Returns:
            dict: A dictionary containing a list of groups.
        """
        groups = Group.query.all()
        return {"results": group_schema.dump(groups, many=True)}

    def post(self):
        """
        Create a new group.

        Returns:
            dict: A dictionary containing a success message and the created
                  group data.
        """
        user = get_current_user()
        group = group_schema.load(request.json)
        group.user_id = user.id
        group.members.append(user)
        group.admins.append(user)
        db.session.add(group)
        db.session.commit()

        return {"msg": "Group created", "group": group_schema.dump(group)}


class GroupResource(Resource):
    """
    Class representing a RESTful resource for managing group data.

    Attributes:
        method_decorators (list): A list of method decorators,
        in this case, requiring JWT authentication.

    Methods:
        get(self, group_id): Retrieve a specific group by ID.
        put(self, group_id): Update a specific group by ID.
        delete(self, group_id): Delete a specific group by ID.
    """
    method_decorators = [jwt_required()]

    def get(self, group_id):
        """
        Retrieve a specific group by ID.

        Parameters:
            group_id (int): The ID of the group to retrieve.

        Returns:
            dict: A dictionary containing the group data.
        """
        group = Group.query.get_or_404(group_id)
        return {"group": group_schema.dump(group)}

    def put(self, group_id):
        """
        Update a specific group by ID.

        Parameters:
            group_id (int): The ID of the group to update.

        Returns:
            dict: A dictionary containing a success message and the updated
                  group data.
        """
        group = Group.query.get_or_404(group_id)
        group = group_schema.load(request.json, instance=group, partial=True)
        db.session.commit()

        return {"msg": "Group updated", "group": group_schema.dump(group)}

    def delete(self, group_id):
        """
        Delete a specific group by ID.

        Parameters:
            group_id (int): The ID of the group to delete.

        Returns:
            dict: A dictionary containing a success message.
        """
        group = Group.query.get_or_404(group_id)
        db.session.delete(group)
        db.session.commit()
        return {"msg": "Group deleted"}
