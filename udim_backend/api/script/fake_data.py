#!/usr/bin/python3
from faker import Faker
from extensions import db
from models.models import User, Group, Donation, Debt, Payment

fake = Faker()

def create_fake_user():
    pwd = fake.password()
    email = fake.email()
    user = User(
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        email=email,
        password=pwd,
        address=fake.address(),
    )
    db.session.add(user)
    db.session.commit()
    print(email, pwd)
    return user

def create_fake_group(admin_user, members):
    group = Group(
        name=fake.company(),
        user_id=admin_user.id
    )
    db.session.add(group)
    db.session.commit()
    
    for member in members:
        group.members.append(member)
    group.admins.append(admin_user)
    
    db.session.commit()
    return group

def create_fake_donation(group_id, user_id):
    donation = Donation(
        amount=fake.random_number(digits=5),
        description=fake.text(),
        group_id=group_id,
        user_id=user_id
    )
    db.session.add(donation)
    db.session.commit()
    return donation

def create_fake_debt(group_id, user_id):
    debt = Debt(
        amount=fake.random_number(digits=5),
        description=fake.text(),
        group_id=group_id,
        user_id=user_id
    )
    db.session.add(debt)
    db.session.commit()
    return debt

def create_fake_payment(group_id, user_id, donation_id):
    payment = Payment(
        amount=fake.random_number(digits=5),
        description=fake.text(),
        group_id=group_id,
        user_id=user_id,
        donation_id=donation_id
    )
    db.session.add(payment)
    db.session.commit()
    return payment

def create_fk1():

    # Create fake admin user
    admin_user = create_fake_user()

    # Create additional fake users to be members of the group
    members = [admin_user]  # Start with the admin user as a member
    for _ in range(8):
        member_user = create_fake_user()
        members.append(member_user)

    # Create fake group with admin user and members
    group = create_fake_group(admin_user, members)

    # Create fake donations and debts for the group
    for member in members:
        donation = create_fake_donation(group.id, member.id)
        debt = create_fake_debt(group.id, member.id)
        create_fake_payment(group.id, member.id, donation.id)

    print("Fake data generated successfully.")
    
if __name__ == "__main__":
    from app import app
    with app.app_context():  # Ensure you are working within the app context
        for i in range(5):
            create_fk1()
