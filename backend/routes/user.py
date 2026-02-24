from flask import Blueprint, request, jsonify
from database.db_config import get_db_connection
from werkzeug.security import generate_password_hash

user_bp = Blueprint('user', __name__)

@user_bp.route('/dashboard-info', methods=['GET'])
def get_dashboard_info():
    conn = get_db_connection()
    
    total_users = conn.execute('SELECT COUNT(*) FROM users').fetchone()[0]
    
    # Pegamos todos os campos (exceto a senha por segurança)
    cursor = conn.execute('SELECT full_name, email, phone, username FROM users')
    users_list = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return jsonify({
        "total_registros": total_users,
        "usuarios": users_list, # Agora envia uma lista de objetos, não só strings
        "status_sistema": "Operacional",
        "mensagem": "Dados completos carregados."
    }), 200

@user_bp.route('/delete-user/<username>', methods=['DELETE'])
def delete_user(username):
    conn = get_db_connection()
    cursor = conn.execute('DELETE FROM users WHERE username = ?', (username,))
    conn.commit()
    rows_affected = cursor.rowcount
    conn.close()
    
    if rows_affected > 0:
        return jsonify({"message": f"Usuário {username} removido!"}), 200
    return jsonify({"error": "Usuário não encontrado"}), 404

@user_bp.route('/update-user-complete', methods=['PUT'])
def update_user_complete():
    data = request.json
    old_username = data.get('old_username') # Identificador original
    
    full_name = data.get('full_name')
    email = data.get('email')
    phone = data.get('phone')
    new_username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    try:
        if password: # Se o usuário digitou algo no campo senha, gera novo hash
            hashed_pw = generate_password_hash(password)
            conn.execute('''
                UPDATE users SET full_name=?, email=?, phone=?, username=?, password=?
                WHERE username=?
            ''', (full_name, email, phone, new_username, hashed_pw, old_username))
        else: # Se a senha veio vazia, atualiza apenas os outros dados
            conn.execute('''
                UPDATE users SET full_name=?, email=?, phone=?, username=?
                WHERE username=?
            ''', (full_name, email, phone, new_username, old_username))
        
        conn.commit()
        return jsonify({"message": "Perfil atualizado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"error": "Erro ao atualizar ou e-mail/usuário já existente"}), 400
    finally:
        conn.close()