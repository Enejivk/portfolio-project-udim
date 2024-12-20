"""added default of image url

Revision ID: 33af647727d7
Revises: 41365db0a4c5
Create Date: 2024-10-31 00:43:34.208846

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '33af647727d7'
down_revision = '41365db0a4c5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('image_url',
               existing_type=sa.VARCHAR(length=60),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('image_url',
               existing_type=sa.VARCHAR(length=60),
               nullable=True)

    # ### end Alembic commands ###
