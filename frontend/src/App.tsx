import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Estados para os inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  // Estados de controle de navegação
  const [isLogged, setIsLogged] = useState(false);
  const [view, setView] = useState<'login' | 'register'>('login');

  const cleanInputs = () => {
    setUsername('');
    setPassword('');
    setMessage('');
  };

  const handleRegister = async () => {
    if (username.trim() === '' || password.trim() === '') {
    setMessage('Por favor, preencha todos os campos antes de enviar.');
    return; // Para a execução aqui
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/register', { username, password });
      setMessage(response.data.message);
      // Opcional: após cadastrar, manda o usuário para a tela de login
      setTimeout(() => { setView('login'); cleanInputs(); }, 1500);
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Erro ao cadastrar');
    }
  };

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
    setMessage('Por favor, preencha todos os campos antes de enviar.');
    return; // Para a execução aqui
    }
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { username, password });
      setMessage(response.data.message);
      setIsLogged(true);
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Usuário ou senha inválidos');
    }
  };

  // 1. TELA DE SUCESSO (LOGADO)
  if (isLogged) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>🎉 Bem-vindo, {username}!</h1>
        <p>Você está autenticado no sistema.</p>
        <button style={{background: 'red', color: 'white', width: '150px', fontSize: '16px'}} onClick={() => { setIsLogged(false); cleanInputs(); }}>Sair do Sistema</button>
      </div>
    );
  }

  // 2. RENDERIZAÇÃO CONDICIONAL DE TELAS
  return (
    <div className="container">
      <div className="card">
        {view === 'login' ? (
          <div>
            <h2>🔐 Login</h2>
            <div className="input-group">
              <label>Usuário</label>
              <input  type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn-login" onClick={handleLogin}>Entrar</button>
            <p className="link-text">
              Não tem conta? <span onClick={() => { setView('register'); cleanInputs(); }}>Cadastre-se</span>
            </p>
          </div>
        ) : (
          <div>
            <h2>📝 Criar Conta</h2>
            <div className="input-group">
              <label>Usuário</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn-register" onClick={handleRegister}>Finalizar Cadastro</button>
            <p className="link-text">
              Já possui conta? <span onClick={() => { setView('login'); cleanInputs(); }}>Voltar</span>
            </p>
          </div>
        )}

        {message && (
          <div className={`alert ${message.includes('sucesso') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;