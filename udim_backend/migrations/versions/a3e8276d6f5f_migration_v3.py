"""migration_v3

Revision ID: a3e8276d6f5f
Revises: b88d990e1d54
Create Date: 2024-06-20 20:02:30.834362

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a3e8276d6f5f'
down_revision = 'b88d990e1d54'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('token_blocklist',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('jti', sa.String(length=36), nullable=False),
    sa.Column('token_type', sa.String(length=10), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('revoked_at', sa.DateTime(), nullable=True),
    sa.Column('expires', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('jti')
    )
    with op.batch_alter_table('token_blocklist', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_token_blocklist_user_id'), ['user_id'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('token_blocklist', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_token_blocklist_user_id'))

    op.drop_table('token_blocklist')
    # ### end Alembic commands ###
