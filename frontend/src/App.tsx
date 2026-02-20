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

  const handleDelete = async (userToDelete: string) => {
    // Evitar que o usuário logado se delete por acidente (opcional)
    if (userToDelete === username) {
      alert("Você não pode deletar a si mesmo enquanto estiver logado!");
      return;
    }

    if (window.confirm(`Tem certeza que deseja deletar ${userToDelete}?`)) {
      try {
        await axios.delete(`http://127.0.0.1:5000/delete-user/${userToDelete}`);
        fetchDashboardData(); // Atualiza a lista automaticamente após deletar
      } catch (error) {
        alert("Erro ao deletar usuário");
      }
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

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const confirmUpdate = async () => {
    if (!newPassword.trim()) {
      alert("Digite uma nova senha!");
      return;
    }

    try {
      await axios.put('http://127.0.0.1:5000/update-user', {
        username: selectedUser,
        new_password: newPassword
      });
      alert("Senha atualizada!");
      setShowModal(false);
      setNewPassword('');
      fetchDashboardData();
    } catch (error) {
      alert("Erro ao atualizar");
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
                <ul className='user-list-container' style={{ 
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
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '10px',
                      color: 'black'
                    }}>
                      <span>👤 {user}</span>
                      <div style={{display: 'flex', gap: '5px'}}>
                        <button 
                          onClick={() => { setSelectedUser(user); setShowModal(true); }}
                          style={{ width: '60px', margin: '0', fontSize: '0.7rem', backgroundColor: '#23aeb3', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDelete(user)}
                          style={{ 
                            backgroundColor: '#ff4d4d', 
                            color: 'white', 
                            border: 'none', 
                            padding: '5px 12px', 
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                            width: '60px',
                            margin: '0'
                          }}
                        >
                          Excluir
                        </button>
                      </div>
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
            onClick={() => { localStorage.removeItem('user_session');   setIsLogged(false); setDashboardData(null); cleanInputs(); }}
          >
            Encerrar Sessão
          </button>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 style={{color: 'gray'}}>Editar Senha: {selectedUser}</h3>
              <input 
                type="password" 
                placeholder="Nova Senha" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
              />
              <div className="modal-actions">
                <button className="btn-login" onClick={confirmUpdate}>Salvar</button>
                <button 
                  className="btn-register" 
                  style={{ backgroundColor: '#95a5a6' }} 
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
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