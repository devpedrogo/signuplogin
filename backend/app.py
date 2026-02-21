from flask import Flask
from flask_cors import CORS
from database.db_config import init_db
from routes.auth import auth_bp
from routes.user import user_bp

app = Flask(__name__)
CORS(app)

# Registrando os Blueprints (As peças de LEGO)
app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)

if __name__ == '__main__':
    init_db()  # Garante que o banco existe
    app.run(debug=True, port=5000)