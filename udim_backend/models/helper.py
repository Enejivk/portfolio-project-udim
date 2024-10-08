#!/usr/bin/python3
from models.models import TokenBlocklist
from extensions import db
from datetime import datetime
from flask_jwt_extended import decode_token
from sqlalchemy.orm.exc import NoResultFound

def add_token_to_database(encoded_token):
    """
    Add a JWT token to the TokenBlocklist database.

    This function decodes a given JWT token, extracts relevant information,
    and stores it in the TokenBlocklist table in the database.

    Args:
        encoded_token (str): The encoded JWT token to be added to the database.

    Raises:
        KeyError: If the JWT token does not contain the expected claims.
        SQLAlchemyError: If there is an issue with the database operation.

    Example:
        add_token_to_database(encoded_token)
    """
    from app import app

    decoded_token = decode_token(encoded_token)
    jti = decoded_token["jti"]
    token_type = decoded_token["type"]
    user_id = decoded_token[app.config["JWT_IDENTITY_CLAIM"]]
    expires = datetime.fromtimestamp(decoded_token["exp"])

    db_token = TokenBlocklist(
        jti=jti,
        token_type=token_type,
        user_id=user_id,
        expires=expires,
    )
    db.session.add(db_token)
    db.session.commit()


def revoke_token(token_jti, user):
    """
    Revoke a token by setting its revoked_at timestamp to the current time.

    Args:
        token_jti (str): The unique identifier of the token to be revoked.
        user (int): The ID of the user who owns the token.

    Raises:
        Exception: If the token with the specified jti and user ID is not found.

    This function queries the TokenBlocklist model to find a token that matches
    the provided jti and user ID. If found, it sets the revoked_at field to the
    current UTC time and commits the change to the database. If no such token is
    found, an exception is raised.
    """
    try:
        token = TokenBlocklist.query.filter_by(jti=token_jti, user_id=user).one()
        token.revoked_at = datetime.utcnow()
        db.session.commit()
    except NoResultFound:
        raise Exception("Could not find the token {}".format(token_jti))


def is_token_revoked(jwt_payload):
    """
    Check if a JWT token has been revoked.

    This function queries the TokenBlocklist model to determine if the token 
    identified by the 'jti' (JWT ID) in the provided JWT payload has been 
    revoked. If the token is found and has a non-null 'revoked_at' timestamp, 
    it is considered revoked. If the token is not found in the blocklist, it 
    is also considered revoked.

    Args:
        jwt_payload (dict): The payload of the JWT, which must include the 'jti'.

    Returns:
        bool: True if the token is revoked or not found, False otherwise.
    """
    jti = jwt_payload["jti"]
    try:
        token = TokenBlocklist.query.filter_by(jti=jti).one()
        return token.revoked_at is not None
    except NoResultFound:
        return True
