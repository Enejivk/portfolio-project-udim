#!/usr/bin/python3
from models.models import TokenBlocklist
from extensions import db
from datetime import datetime
from flask_jwt_extended import decode_token
from sqlalchemy.orm.exc import NoResultFound

def add_token_to_database(encoded_token):
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
    try:
        token = TokenBlocklist.query.filter_by(jti=token_jti, user_id=user).one()
        token.revoked_at = datetime.utcnow()
        db.session.commit()
    except NoResultFound:
        raise Exception("Could not find the token {}".format(token_jti))


def is_token_revoked(jwt_payload):
    jti = jwt_payload["jti"]
    try:
        token = TokenBlocklist.query.filter_by(jti=jti).one()
        return token.revoked_at is not None
    except NoResultFound:
        return True


