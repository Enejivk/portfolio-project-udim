#!/usr/bin/python3
from extensions import db, bcrypt
from datetime import datetime


class User(db.Model):
    """Representation of a user """
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    profile_image = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(60), nullable=False, unique=True)

    created_group = db.relationship('Group', backref='created_by', lazy=True)
    payments = db.relationship('Payment', backref='user', lazy=True, cascade="all, delete, delete-orphan")
    donations = db.relationship('Donation', backref='user', lazy=True, cascade="all, delete, delete-orphan")
    debts = db.relationship('Debt', backref='user', lazy=True, cascade="all, delete, delete-orphan")
    
    def __setattr__(self, name, value):
        """sets a password with bcrypt encryption"""
        if name == "password":
            value = bcrypt.generate_password_hash(value).decode('utf-8')
        super().__setattr__(name, value)

    def __repr__(self):
        return f"User('{self.first_name}', '{self.last_name}', '{self.email}')"



group_member = db.Table('group_member',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'), primary_key=True),
    db.Column('group_id', db.Integer, db.ForeignKey('groups.id', onupdate='CASCADE', ondelete='CASCADE'), primary_key=True)
)

group_admin = db.Table('group_admin',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'), primary_key=True),
    db.Column('group_id', db.Integer, db.ForeignKey('groups.id', onupdate='CASCADE', ondelete='CASCADE'), primary_key=True)
)

class Group(db.Model):
    """Representation of a Group """
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    name = db.Column(db.String(60), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    members = db.relationship('User', secondary=group_member, lazy='subquery',
        backref=db.backref('groups', lazy=True))
    donations = db.relationship('Donation', backref='group', lazy=True, cascade="all, delete, delete-orphan")
    debts = db.relationship('Debt', backref='group', lazy=True, cascade="all, delete, delete-orphan")
    payments = db.relationship('Payment', backref='group', lazy=True, cascade="all, delete, delete-orphan")
    admins = db.relationship('User', secondary=group_admin, lazy='subquery',
        backref=db.backref('admin_groups', lazy=True))


class Donation(db.Model):
    """Representation of a Donation """
    __tablename__ = 'donations'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    amount = db.Column(db.Float, nullable=True, default=0.0)
    description = db.Column(db.String(1024), nullable=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    payments = db.relationship('Payment', backref='donation', lazy=True)

class Debt(db.Model):
    """Representation of a Debt """
    __tablename__ = 'debts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(1024), nullable=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


class Payment(db.Model):
    """Representation of a payments """
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(1024), nullable=True)
    
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    donation_id = db.Column(db.Integer, db.ForeignKey('donations.id'), nullable=False)

class TokenBlocklist(db.Model):
    """Representation of a token block list """
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    jti = db.Column(db.String(36), nullable=False, unique=True)
    token_type = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, index=True)
    revoked_at = db.Column(db.DateTime)
    expires = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User")