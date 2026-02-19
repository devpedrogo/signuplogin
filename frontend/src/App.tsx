import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const savedUser = localStorage.getItem('user_session');
    if (savedUser) {
      setUsername(savedUser);
      setIsLogged(true);
    }
  }, []);

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
      localStorage.setItem('user_session', username);
      setIsLogged(true);
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Usuário ou senha inválidos');
    }
  };

  const [dashboardData, setDashboardData] = useState<any>(null);

  // Função para buscar dados do BD
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/dashboard-info');
      setDashboardData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard", error);
    }
  };

  // Quando o usuário logar, disparar a busca
  if (isLogged) {
    if (!dashboardData) fetchDashboardData();

    return (
      <div className="container">
        <div className="dash-card" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <span style={{ fontSize: '2rem' }}>📊</span>
            <h2 style={{ margin: 0 }}>Painel de Controle</h2>
          </div>
          
          <p className="link-text">Bem-vindo, <strong>{username}</strong></p>
          
          <hr style={{ border: '0.5px solid #eee', margin: '20px 0' }} />
          
          {dashboardData ? (
            <div className="dashboard-grid">
              <div className="stat-card">
                <h4>Usuários</h4>
                <p>{dashboardData.total_registros}</p>
              </div>
              
              <div className="stat-card" style={{ borderLeftColor: '#4CAF50' }}>
                <h4>Servidor</h4>
                <div className="status-online">
                  <span className="status-dot"></span>
                  {dashboardData.status_sistema}
                </div>
              </div>

              <div className='stat-card' style={{ textAlign: 'left', borderLeftColor: '#f30713' }}>
                <h4 style={{ fontSize: '0.8rem', color: '#666', marginBottom: '10px' }}>USUÁRIOS CADASTRADOS</h4>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  maxHeight: '100px', 
                  overflowY: 'auto',
                  border: '1px solid #e70606',
                  borderRadius: '4px'
                }}>
                  {dashboardData.usuarios.map((user: string, index: number) => (
                    <li key={index} style={{ 
                      padding: '8px 12px', 
                      borderBottom: index === dashboardData.usuarios.length - 1 ? 'none' : '1px solid #e70606',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: 'black'
                    }}>
                      👤 {user}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p>Carregando dados...</p>
          )}

          <div style={{ marginTop: '30px', fontSize: '0.8rem', color: '#888', fontStyle: 'italic' }}>
            "{dashboardData?.mensagem}"
          </div>

          <button 
            className="btn-register" 
            style={{ marginTop: '20px', backgroundColor: '#e74c3c' }} 
            onClick={() => { localStorage.removeItem('user_session'); setIsLogged(false); setDashboardData(null); cleanInputs(); }}
          >
            Encerrar Sessão
          </button>
        </div>
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