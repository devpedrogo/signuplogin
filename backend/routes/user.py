from flask import Blueprint, request, jsonify
from database.db_config import get_db_connection

user_bp = Blueprint('user', __name__)

@user_bp.route('/dashboard-info', methods=['GET'])
def get_dashboard_info():
    conn = get_db_connection()
    
    # Total de registros
    total_users = conn.execute('SELECT COUNT(*) FROM users').fetchone()[0]
    
    # Lista de usernames para o componente de lista no React
    users_list = [row['username'] for row in conn.execute('SELECT username FROM users').fetchall()]
    conn.close()
    
    return jsonify({
        "total_registros": total_users,
        "usuarios": users_list,
        "status_sistema": "Operacional",
        "mensagem": "Dados sincronizados via Blueprint."
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

@user_bp.route('/update-user', methods=['PUT'])
def update_user():
    data = request.json
    username = data.get('username')
    new_password = data.get('new_password')

    if not new_password:
        return jsonify({"error": "A nova senha não pode ser vazia"}), 400

    conn = get_db_connection()
    cursor = conn.execute('UPDATE users SET password = ? WHERE username = ?', (new_password, username))
    conn.commit()
    rows_affected = cursor.rowcount
    conn.close()

    if rows_affected > 0:
        return jsonify({"message": "Senha atualizada com sucesso!"}), 200
    return jsonify({"error": "Erro ao atualizar senha"}), 400