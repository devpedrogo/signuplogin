from flask import Blueprint, request, jsonify
from database.db_config import get_db_connection

user_bp = Blueprint('user', __name__)

@user_bp.route('/dashboard-info', methods=['GET'])
def dashboard():
    conn = get_db_connection()
    total = conn.execute('SELECT COUNT(*) FROM users').fetchone()[0]
    users = [row['username'] for row in conn.execute('SELECT username FROM users').fetchall()]
    conn.close()
    return jsonify({"total_registros": total, "usuarios": users}), 200

@user_bp.route('/delete-user/<username>', methods=['DELETE'])
def delete(username):
    # ... sua lógica de delete ...
    pass

@user_bp.route('/update-user', methods=['PUT'])
def update():
    # ... sua lógica de update ...
    pass