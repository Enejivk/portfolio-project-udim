
from extensions import db
from models.models import Group, User
from api.schema.group import group_schema
from api.schema.user import user_schema
from flask import request
from flask_jwt_extended import get_current_user, jwt_required
from flask_restful import Resource, abort


class UserGroupList(Resource):

    method_decorators = [jwt_required()]

    def get(self, user_id):
        """
        Retrieve all groups that a specific user belongs to.

        Parameters:
            user_id (int): The ID of the user to retrieve groups for.

        Returns:
            dict: A dictionary containing a list of group data.
        """

        # Get the user from the database
        user = User.query.get_or_404(user_id)

        # Get all groups that the user belongs to
        groups = user.groups

        # Return a dictionary with the group data
        return {
            "total_group": len(groups),
            "groups": group_schema.dump(
                groups,
                many=True)}


class GroupMemberList(Resource):
    """
    Resource class for handling operations related to group members.
    """

    method_decorators = [jwt_required()]

    def get(self, group_id):
        """
        Retrieve all members of a specific group.

        Parameters:
            group_id (int): The ID of the group to retrieve members for.

        Returns:
            dict: A dictionary containing a list of user data.
        """

        # Get the group from the database
        group = Group.query.get_or_404(group_id)

        # Get all users that belong to this specific groups
        users = group.members

        # Return a dictionary with the user data
        return {"total_member": len(users),
                "members": user_schema.dump(users, many=True)
                }


class GroupMemberResource(Resource):
    """
    GroupMemberResource class representing a RESTful resource for managing
    group members.
    """

    method_decorators = [jwt_required()]

    def delete(self, group_id, user_id):
        """
        Remove a specific member from a specific group.

        Parameters:
            group_id (int): The ID of the group to remove a member from.
            user_id (int): The ID of the user to be removed from the group.

        Returns:
            dict: A dictionary containing a success message.
        """

        # Get the group from the database
        group = Group.query.get_or_404(group_id)
        user = User.query.get_or_404(user_id)

        # Check if user is a member of this group
        if user not in group.members:
            return {"msg": "User is not a member of this group."}, 400

        # Check if the user is an admin of the group
        if user not in group.admins and user != get_current_user():
            return {
                "msg": "You do not have permission to remove members from this group."}, 403

        # Remove the user from the group
        group.members.remove(user)

        # Commit changes to database
        db.session.commit()

        return {"msg": "member deleted"}

    def post(self, group_id, user_id):

        # Get the group from the database
        group = Group.query.get_or_404(group_id)

        # Get the user to be added to the group from the database
        user = User.query.get_or_404(user_id)

        # Check if user is an admin of this group
        # current_user = get_current_user()

        # Check if user is already a member of this group
        if user in group.members:
            return {"msg": "User is already a member of this group."}, 400

        # Add new member to the list and update database
        group.members.append(user)
        db.session.commit()

        return {"msg": "member added", "member": user_schema.dump(user)}


class GroupAdminResource(Resource):
    """
    Class representing a RESTful resource for managing group admin data.

    Attributes:
        method_decorators (list): A list of method decorators,
        in this case, requiring JWT authentication.

    Methods:
        post(self, group_id, user_id): Add a specific user as an admin of
        the specified group.
        delete(self, group_id, user_id): Delete a specific group admin by ID.
    """
    method_decorators = [jwt_required()]

    def post(self, group_id, user_id):
        """
        Add a specific user as an admin of the specified group.

        Args:
            group_id (int): The ID of the group to add an admin to.
            user_id (int): The ID of the user to add as an admin.

        Returns:
            dict: A dictionary containing a success message and the updated
                  group data with the added admin.
        """
        group = Group.query.get_or_404(group_id)
        user = User.query.get_or_404(user_id)
        if user not in group.members:
            return {"msg": "User is not a member of this group."}
        if user in group.admins:
            return {"msg": "User is already an admin of this group."}

        group.admins.append(user)
        db.session.commit()

        return {"msg": "Admin added", "group": group_schema.dump(group)}

    def delete(self, group_id, user_id):
        """
        Remove a specific user as an admin of the specified group.

        Args:
            group_id (int): The ID of the group to remove an admin from.
            user_id (int): The ID of the user to remove as an admin.

        Returns:
            dict: A dictionary containing a success message and the updated
                  group data with the removed admin.
        """
        group = Group.query.get_or_404(group_id)
        user = User.query.get_or_404(user_id)
        if user not in group.members:
            return {"msg": "User is not a member of this group."}
        if user not in group.admins:
            return {"msg": "User is not an admin of this group."}

        group.admins.remove(user)
        db.session.commit()

        return {"msg": "Admin removed", "group": group_schema.dump(group)}
