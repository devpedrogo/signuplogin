# 🔐 Sistema de Autenticação e Gestão (Full Stack CRUD)

Este projeto é uma aplicação completa de gerenciamento de usuários. Desenvolvido para consolidar conceitos de **Systems Analysis and Development (ADS)**, ele integra um **Backend em Python** com um **Frontend moderno em React + TypeScript**.



## 🚀 Funcionalidades Implementadas

* **Autenticação**: Sistema de Login e Cadastro com persistência no SQLite.
* **Gestão de Sessão**: Uso de `localStorage` para manter o usuário logado após o refresh (F5).
* **Dashboard Administrativo**: Painel visual com estatísticas em tempo real (Total de usuários e status do servidor).
* **CRUD Completo**:
    * **Create**: Cadastro de novos usuários.
    * **Read**: Listagem dinâmica de usuários cadastrados.
    * **Update**: Edição de senhas via **Interface de Modal** personalizada.
    * **Delete**: Remoção de registros com confirmação de segurança.

## 🛠️ Tecnologias e Conceitos

### **Backend (Python + Flask)**
* **API RESTful**: Uso correto dos verbos HTTP (`GET`, `POST`, `PUT`, `DELETE`).
* **SQLite**: Banco de dados relacional para persistência de dados.
* **CORS**: Configuração de segurança para comunicação entre domínios.

### **Frontend (React + TypeScript)**
* **Hooks**: `useState` para dados, `useEffect` para persistência de sessão.
* **Interface**: CSS personalizado com **Scrollbars Slim**, **Modais de edição** e layout em **Grid**.
* **Axios**: Gerenciamento de requisições assíncronas para a API.

## 📁 Como Rodar o Projeto

1.  **Servidor**:
    ```bash
    cd backend
    py app.py
    ```
2.  **Cliente**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## 🧠 Aprendizados Relevantes
Durante o desenvolvimento, foram aplicados conceitos de **análise de sistemas** para garantir a integridade dos dados (validação de campos vazios) e uma experiência de usuário (UX) fluida através de componentes reativos e persistência de estado.