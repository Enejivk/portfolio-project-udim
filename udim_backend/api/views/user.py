#!/usr/bin/python3
"""
This module provides API endpoints for user-related operations, including
retrieving the current user's data and uploading profile images.

Imports:
    import os
    import uuid
    from flask import current_app, request
    from api.views import app_view
    from api.schema.user import user_schema
    from flask_jwt_extended import get_current_user, jwt_required
    from extensions import db
    from werkzeug.utils import secure_filename

Endpoints:
    /users/me (GET): Retrieve the current user's data.
    /upload (POST): Upload a profile image for the current user.

Functions:
    get(): Retrieve the current user's data.
    upload(): Handle profile image upload for the current user.

Usage:
    This module should be registered with a Flask application instance to set
    up the API routes for user-related operations.
"""


from datetime import datetime
import os
from flask import current_app, request
from api.views import app_view
from api.schema.user import user_schema
from flask_jwt_extended import get_current_user, jwt_required
from extensions import db
from werkzeug.utils import secure_filename


@app_view.route("/users/me", methods=["GET"])
@jwt_required()
def get():
    """
    Retrieve the current user's data.

    Returns:
        dict: A dictionary containing the current user's data.
    """
    return {"current_user": user_schema.dump(get_current_user())}


@app_view.route('/upload', methods=['POST'])
@jwt_required()
def upload():
    """
    Handle profile image upload for the current user.

    Returns:
    dict: A dictionary containing a success message and the image URL.
    """
    host = "127.0.0.1:5001"
    try:
        if 'image' not in request.files:
            return {"error": "No file part"}, 400

        file = request.files['image']

        if file.filename == '':
            return {'error': 'No selected file'}, 400

        allowed_extensions = {'.jpg', '.jpeg', '.png', '.gif'}

        if file:
            if os.path.splitext(file.filename)[
                    1].lower() not in allowed_extensions:
                return {
                    'error': 'Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed.'}, 400

            # Generate a new filename using user lastname, id, date and the
            # original file extension
            original_filename = secure_filename(file.filename)
            current_user = get_current_user()
            file_ext = os.path.splitext(original_filename)[1]
            new_filename = f"{current_user.last_name}_{current_user.id}_{datetime.now().strftime('%Y%m%d%H%M%S')}{file_ext}"
            filepath = os.path.join(
                current_app.config['UPLOAD_FOLDER'],
                new_filename)
            file.save(filepath)

            # Save the URL (or path) in the database
            current_user.profile_image = f"{host}/static/profile_images/{new_filename}"
            db.session.commit()
            return {'message': 'Image successfully uploaded', 'url': current_user.profile_image}
    except Exception as e:
        db.session.rollback()
        print(e)
        return {'error': 'An error occurred while uploading the image'}, 500
