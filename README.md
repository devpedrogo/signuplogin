# 🔐 Sistema de Autenticação Full Stack

Este é um projeto de estudo desenvolvido para praticar a comunicação entre um **Frontend moderno (React + TypeScript)** e um **Backend robusto (Python + Flask)**, utilizando persistência de dados com **SQLite**.



## 🚀 Tecnologias Utilizadas

### **Backend**
* **Python 3.12**: Linguagem principal do servidor.
* **Flask**: Micro-framework para criação da API.
* **SQLite**: Banco de dados relacional leve, armazenado em arquivo.
* **Flask-CORS**: Para permitir a comunicação segura entre o Frontend e o Backend.

### **Frontend**
* **React + Vite**: Biblioteca para interface de usuário com alta performance.
* **TypeScript**: Tipagem estática para um código mais seguro e menos propenso a erros.
* **Axios**: Cliente HTTP para realizar requisições à API.
* **CSS3**: Estilização personalizada com foco em UX (User Experience).

## 📋 Funcionalidades
* **Cadastro de Usuários**: Validação de campos vazios e tratamento de usuários duplicados.
* **Login**: Verificação de credenciais no banco de dados.
* **Persistência**: Os dados permanecem salvos no banco SQLite mesmo após reiniciar o servidor.
* **Design Responsivo**: Tela de login e cadastro centralizada e intuitiva.

## 📁 Estrutura do Projeto
```plaintext
login_python/
├── backend/
│   ├── app.py          # Servidor Flask e rotas da API
│   └── database.db     # Arquivo do banco de dados SQLite
└── frontend/
    ├── src/
    │   ├── App.tsx     # Lógica principal e telas (Login/Cadastro)
    │   └── App.css     # Estilização do sistema
    └── package.json    # Dependências do React
```
## ⚙️ Como rodar o projeto

### 1. Preparar o Backend
```bash
cd backend
# Criar ambiente virtual (recomendado)
py -m venv venv
# Ativar venv (Windows)
.\venv\Scripts\activate
# Instalar bibliotecas
pip install flask flask-cors
# Rodar o servidor
py app.py
```
### 2. Preparar o Frontend
```bash
cd frontend
# Instalar dependências
npm install
# Rodar em modo de desenvolvimento
npm run dev
```
## 🧠 Aprendizados

Este projeto permitiu consolidar conhecimentos fundamentais para a carreira de desenvolvedor:

* **Criação de APIs RESTful** utilizando Python.
* **Manipulação de banco de dados SQL** (CRUD básico).
* **Gerenciamento de estados no React** (Hooks como `useState`).
* **Configuração de ambiente de desenvolvimento** Python no VS Code.
