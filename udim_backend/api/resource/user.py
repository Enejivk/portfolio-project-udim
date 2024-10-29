#!/usr/bin/python3
"""
This module provides RESTful API endpoints for managing User resources using
Flask-RESTful. It includes endpoints for retrieving, updating, and deleting
users.

Classes:
    UserList: Resource for handling requests to the /users endpoint.
    UserResource: Resource for handling requests to the /users/<int:user_id>
                  endpoint.

Endpoints:
    /users (GET): Retrieve a list of users, optionally filtered by first name.
    /users/<int:user_id> (GET): Retrieve a specific user by ID.
    /users/<int:user_id> (PUT): Update a specific user by ID.
    /users/<int:user_id> (DELETE): Delete a specific user by ID.

Imports:
    from flask import request, jsonify
    from flask_restful import Resource
    from models.models import User, Group
    from api.schema.user import user_schema
    from api.schema.group import group_schema
    from extensions import db

Usage:
    This module should be registered with a Flask application instance to set
    up the API routes for user management.
"""

from flask import request, jsonify, current_app
from flask_jwt_extended import get_current_user, jwt_required
from flask_restful import Resource
from models.models import User, Group
from api.schema.user import user_schema
from api.schema.group import group_schema
from extensions import db
from datetime import datetime
import os
from werkzeug.utils import secure_filename



class UserList(Resource):
    """
    Class representing a resource for retrieving a list of users.

    Attributes:
        method_decorators (list): List of method decorators, in this case
        containing jwt_required().

    Methods:
        get: Retrieves a list of users, with an optional filter by first name.

            Query Parameters:
                first_name (str): Optional. Filter users by first name.

            Returns:
                dict: A dictionary containing a list of users.
    """
    method_decorators = [jwt_required()]

    def get(self):
        """
        Retrieve a list of users. Optionally filter by first name.

        Query Parameters:
            first_name (str): Optional. Filter users by first name.

        Returns:
            dict: A dictionary containing a list of users.
        """
        first_name_filter = request.args.get("first_name")
        user_query = User.query
        users = user_query.all()
        return {"results": user_schema.dump(users, many=True)}


class UserResource(Resource):
    """
    Class representing a RESTful resource for managing user data.

    Attributes:
        method_decorators (list): A list of method decorators,
        in this case, requiring JWT authentication.

    Methods:
        get(self, user_id): Retrieve a specific user by ID.
        put(self, user_id): Update a specific user by ID.
        delete(self, user_id): Delete a specific user by ID.
    """
    method_decorators = [jwt_required()]

    def get(self, user_id):
        """
        Retrieve a specific user by ID.

        Parameters:
            user_id (int): The ID of the user to retrieve.

        Returns:
            dict: A dictionary containing the user data.
        """
        print(user_id)
        if user_id == 'me':
            return user_schema.dump(get_current_user())

        user = User.query.get_or_404(user_id)
        return {"user": user_schema.dump(user)}

    def put(self, user_id):
        """
        Update a specific user by ID, including profile image upload.

        Parameters:
            user_id (int): The ID of the user to update.

        Returns:
            dict: A dictionary containing a success message and the updated
                user data.
        """
        host = "http://localhost:5001"
        user = User.query.get_or_404(user_id)

        try:
            # Handle profile image upload
            if 'image' in request.files:
                file = request.files['image']
                if file.filename != '':
                    allowed_extensions = {'.jpg', '.jpeg', '.png', '.gif'}
                    file_ext = os.path.splitext(file.filename)[1].lower()

                    if file_ext not in allowed_extensions:
                        return {'error': 'Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed.'}, 400

                    # Generate new filename and save file
                    original_filename = secure_filename(file.filename)
                    new_filename = f"{user.last_name}_{user.id}_{datetime.now().strftime('%Y%m%d%H%M%S')}{file_ext}"
                    filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], new_filename)
                    file.save(filepath)

                    # Update user's profile image URL
                    user.image_url = f"{host}/static/profile_images/{new_filename}"

            # Handle other user updates from JSON data
            data = request.form
            if data:
                user = user_schema.load(data, instance=user, partial=True)

            # Commit the changes to the database
            db.session.commit()
            
            return {"msg": "User updated", "user": user_schema.dump(user)}

        except Exception as e:
            db.session.rollback()
            print('am here', e)
            return {'error': 'An error occurred while updating the user'}, 500


    def delete(self, user_id):
        """
        Delete a specific user by ID.

        Parameters:
            user_id (int): The ID of the user to delete.

        Returns:
            dict: A dictionary containing a success message.
        """
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"msg": "User deleted"}
