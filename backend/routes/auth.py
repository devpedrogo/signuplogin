from flask import Blueprint, request, jsonify
from database.db_config import get_db_connection
import sqlite3

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    # ... sua lógica de pegar dados (full_name, email, etc) ...
    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO users (...) VALUES (...)', (...))
        conn.commit()
        return jsonify({"message": "Criado!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username ou Email já existem"}), 400
    finally:
        conn.close()

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    # ... sua lógica de login flexível ...
    conn = get_db_connection()
    user = conn.execute('SELECT username FROM users WHERE ...', (...)).fetchone()
    conn.close()
    if user:
        return jsonify({"message": "Login!", "user": user['username']}), 200
    return jsonify({"error": "Falhou"}), 401