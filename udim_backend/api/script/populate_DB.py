#!/usr/bin/python3
from faker import Faker
from extensions import db
import random
from models.models import User, Group, Donation, Debt, Payment


faker = Faker()
def generate_fake_users(num_users):
    fake = Faker()
    users = []
    for _ in range(num_users):
        pwd = fake.password()
        email = fake.email()
        user = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=email,
            password=pwd,
            address=fake.address(),
        )
        users.append(user)
        db.session.add(user)
        print(email, pwd)

    db.session.commit()
    return users

def generate_fake_groups(num_groups, users):
    fake = Faker()
    groups = []
    for _ in range(num_groups):
        user = fake.random.choice(users)
        group = Group(
            name=fake.company(),
            user_id=user.id
        )
        groups.append(group)
        db.session.add(group)

        # Add the user as a member and admin of the group
        group.members.append(user)
        group.admins.append(user)

        db.session.commit()
    return groups


def generate_fake_data():
    # Generate users
    users = generate_fake_users(20)

    # Generate groups
    groups = generate_fake_groups(4, users)

    # Assign members and admins to groups
    for group in groups:
        members = random.sample(users, k=random.randint(2, 5))
        admins = random.sample(members, k=random.randint(1, 3))
        members.extend(group.members)
        admins.extend(group.admins)
        unique_members = list(set(members))
        unique_admins = list(set(admins))

        group.members = unique_members[:]
        group.admins = unique_admins[:]
    db.session.commit()

    # Generate donations
    for _ in range(30):
        donation = Donation(
            amount=round(random.uniform(10.0, 1000.0), 2),
            description=faker.text(max_nb_chars=200),
            group_id=random.choice(groups).id,
            user_id=random.choice(users).id
        )
        db.session.add(donation)
    db.session.commit()

    # Generate debts
    for _ in range(30):
        debt = Debt(
            amount=round(random.uniform(100000.0, 1000000.0), 2),
            description=faker.text(max_nb_chars=200),
            group_id=random.choice(groups).id,
            user_id=random.choice(users).id
        )
        db.session.add(debt)
    db.session.commit()

    # Generate payments
    for _ in range(40):
        group = random.choice(groups)
        for member in group.members:
            payment = Payment(
                amount=faker.random_number(digits=4),
                description=faker.text(),
                group_id=group.id,
                user_id=member.id,
                donation_id=random.choice(group.donations).id
            )
            db.session.add(payment)
    db.session.commit()
if __name__ == "__main__":
    from app import app
    with app.app_context():  # Ensure you are working within the app context
        # try:
        #     db.create_all()
        #     generate_fake_data()
        # except Exception as e:
        #     print(e)
        #     db.drop_all()
        # db.create_all()
        generate_fake_data()
