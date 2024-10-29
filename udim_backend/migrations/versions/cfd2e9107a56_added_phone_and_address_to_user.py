"""added phone and address to user

Revision ID: cfd2e9107a56
Revises: e23ebca2e113
Create Date: 2024-10-15 10:32:28.692422

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cfd2e9107a56'
down_revision = 'e23ebca2e113'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('_alembic_tmp_users')
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

    op.create_table('_alembic_tmp_users',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('created_at', sa.DATETIME(), nullable=True),
    sa.Column('updated_at', sa.DATETIME(), nullable=True),
    sa.Column('first_name', sa.VARCHAR(length=60), nullable=False),
    sa.Column('last_name', sa.VARCHAR(length=60), nullable=False),
    sa.Column('password', sa.VARCHAR(length=60), nullable=False),
    sa.Column('email', sa.VARCHAR(length=60), nullable=False),
    sa.Column('image_url', sa.VARCHAR(length=20), nullable=False),
    sa.Column('phone', sa.VARCHAR(length=15), nullable=True),
    sa.Column('address', sa.VARCHAR(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###
