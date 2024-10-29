"""added new fields in user

Revision ID: f143eefbc305
Revises: e23ebca2e113
Create Date: 2024-10-29 06:09:56.796614

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f143eefbc305'
down_revision = 'e23ebca2e113'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_url', sa.String(length=20), nullable=True))
        batch_op.add_column(sa.Column('phone', sa.String(length=15), nullable=True))
        batch_op.add_column(sa.Column('address', sa.String(length=120), nullable=True))
        batch_op.drop_column('profile_image')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_image', sa.VARCHAR(length=20), nullable=False))
        batch_op.drop_column('address')
        batch_op.drop_column('phone')
        batch_op.drop_column('image_url')

    # ### end Alembic commands ###