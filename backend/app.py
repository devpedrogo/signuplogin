from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Isso permite que o React (que estará em outra porta) acesse a API

# Função para conectar ao banco e criar a tabela se não existir
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username', '').strip() # .strip() remove espaços vazios
    password = data.get('password', '').strip()

    # Validação: se algum estiver vazio, retorna erro 400
    if not username or not password:
        return jsonify({"error": "Usuário e senha são obrigatórios!"}), 400

    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
        conn.commit()
        conn.close()
        return jsonify({"message": "Usuário criado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Usuário já existe!"}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    if not username or not password:
        return jsonify({"error": "Preencha todos os campos!"}), 400

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"message": "Login realizado com sucesso!", "user": username}), 200
    else:
        return jsonify({"error": "Usuário ou senha incorretos!"}), 401

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

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)