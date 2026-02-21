from flask import Blueprint, request, jsonify
from database.db_config import get_db_connection
import sqlite3

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    # Captura dos dados enviada pelo React
    full_name = data.get('full_name', '').strip()
    email = data.get('email', '').strip()
    phone = data.get('phone', '').strip()
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    # Validação de campos obrigatórios
    if not all([full_name, email, username, password]):
        return jsonify({"error": "Campos obrigatórios faltando!"}), 400

    conn = get_db_connection()
    try:
        conn.execute('''
            INSERT INTO users (full_name, email, phone, username, password) 
            VALUES (?, ?, ?, ?, ?)
        ''', (full_name, email, phone, username, password))
        conn.commit()
        return jsonify({"message": "Usuário criado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username ou Email já cadastrados!"}), 400
    finally:
        conn.close()

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    identifier = data.get('identifier', '').strip() # Pode ser username ou email
    password = data.get('password', '').strip()

    if not identifier or not password:
        return jsonify({"error": "Preencha todos os campos!"}), 400

    conn = get_db_connection()
    # Usando Row Factory para acessar pelo nome da coluna
    user = conn.execute('''
        SELECT username FROM users 
        WHERE (username = ? OR email = ?) AND password = ?
    ''', (identifier, identifier, password)).fetchone()
    conn.close()

    if user:
        return jsonify({
            "message": "Login realizado com sucesso!", 
            "user": user['username'] # Graças ao Row Factory!
        }), 200
    
    return jsonify({"error": "Credenciais inválidas!"}), 401