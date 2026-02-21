from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Isso permite que o React (que estará em outra porta) acesse a API

# Função para conectar ao banco e criar a tabela se não existir
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    # Adicionando nome, email e telefone
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Rota de Cadastro Atualizada
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    full_name = data.get('full_name', '').strip()
    email = data.get('email', '').strip()
    phone = data.get('phone', '').strip()
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    if not all([full_name, email, username, password]):
        return jsonify({"error": "Campos obrigatórios faltando!"}), 400

    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO users (full_name, email, phone, username, password) 
            VALUES (?, ?, ?, ?, ?)
        ''', (full_name, email, phone, username, password))
        conn.commit()
        conn.close()
        return jsonify({"message": "Usuário criado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username ou Email já cadastrados!"}), 400

# Rota de Login Flexível (Username ou Email)
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    identifier = data.get('identifier', '').strip() # Pode ser username ou email
    password = data.get('password', '').strip()

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    # A mágica do OR: verifica se bate com username OU email
    cursor.execute('''
        SELECT username FROM users 
        WHERE (username = ? OR email = ?) AND password = ?
    ''', (identifier, identifier, password))
    
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"message": "Login realizado!", "user": user[0]}), 200
    return jsonify({"error": "Credenciais inválidas!"}), 401

@app.route('/dashboard-info', methods=['GET'])
def get_dashboard_info():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Exemplo: Pegar o total de usuários no sistema
    cursor.execute('SELECT COUNT(*) FROM users')
    total_users = cursor.fetchone()[0]
    
    # Busca a lista de nomes
    cursor.execute('SELECT username FROM users')
    users_list = [row[0] for row in cursor.fetchall()]

    conn.close()
    
    return jsonify({
        "total_registros": total_users,
        "usuarios": users_list,
        "status_sistema": "Operacional",
        "mensagem": "Dados sincronizados com o banco local."
    }), 200

# Rota para DELETAR um usuário específico
@app.route('/delete-user/<username>', methods=['DELETE'])
def delete_user(username):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Executa a remoção
    cursor.execute('DELETE FROM users WHERE username = ?', (username,))
    conn.commit()
    
    if cursor.rowcount > 0:
        conn.close()
        return jsonify({"message": f"Usuário {username} removido!"}), 200
    else:
        conn.close()
        return jsonify({"error": "Usuário não encontrado"}), 404

@app.route('/update-user', methods=['PUT'])
def update_user():
    data = request.json
    username = data.get('username')
    new_password = data.get('new_password')

    if not new_password:
        return jsonify({"error": "A nova senha não pode ser vazia"}), 400

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Atualiza a senha para o usuário específico
    cursor.execute('UPDATE users SET password = ? WHERE username = ?', (new_password, username))
    conn.commit()
    
    if cursor.rowcount > 0:
        conn.close()
        return jsonify({"message": "Senha atualizada com sucesso!"}), 200
    else:
        conn.close()
        return jsonify({"error": "Usuário não encontrado"}), 404

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)