import { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [view, setView] = useState<'login' | 'register'>('login');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const cleanInputs = () => {
    setIdentifier(''); setUsername(''); setPassword(''); setConfirmPassword('');
    setFullName(''); setEmail(''); setPhone(''); setMessage('');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user_session');
    if (savedUser) { setUsername(savedUser); setIsLogged(true); }
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard-info');
      setDashboardData(response.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (isLogged) {
      fetchDashboardData();
    }
  }, [isLogged]); // Toda vez que isLogged mudar para true, ele busca os dados

  const handleLogin = async () => {
    try {
      const res = await api.post('/login', { identifier, password });
      localStorage.setItem('user_session', res.data.user);
      setUsername(res.data.user); setIsLogged(true);
    } catch (err: any) { setMessage(err.response?.data?.error || "Erro"); }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) return setMessage("Senhas não conferem");
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(password)) {
      setMessage("A senha não atende aos requisitos mínimos de segurança.");
      return;
    }
    
    try {
      await api.post('/register', { full_name: fullName, email, phone, username, password });
      setView('login'); cleanInputs();
    } catch (err: any) { setMessage(err.response?.data?.error); }
  };

  const handleDelete = async (u: string) => {
    if (u === username) return alert("Não pode deletar a si mesmo");
    if (window.confirm("Deletar?")) {
      await api.delete(`/delete-user/${u}`);
      fetchDashboardData();
    }
  };

  const confirmUpdate = async () => {
    await api.put('/update-user', { username: selectedUser, new_password: newPassword });
    setShowModal(false); setNewPassword(''); fetchDashboardData();
  };

  return (
    <div className="container">
      <div className={isLogged ? "" : "card"}>
        {isLogged ? (
          <Dashboard 
            username={username} dashboardData={dashboardData} 
            handleDelete={handleDelete} handleLogout={() => { localStorage.removeItem('user_session'); setIsLogged(false); }}
            showModal={showModal} setShowModal={setShowModal}
            selectedUser={selectedUser} setSelectedUser={setSelectedUser}
            newPassword={newPassword} setNewPassword={setNewPassword}
            confirmUpdate={confirmUpdate}
          />
        ) : view === 'login' ? (
          <Login 
            identifier={identifier} setIdentifier={setIdentifier} 
            password={password} setPassword={setPassword} 
            handleLogin={handleLogin} setView={setView} cleanInputs={cleanInputs} 
          />
        ) : (
          <Register 
            data={{ fullName, username, email, phone, password, confirmPassword }}
            setData={(field, val) => {
              if (field === 'fullName') setFullName(val);
              if (field === 'username') setUsername(val);
              if (field === 'email') setEmail(val);
              if (field === 'phone') setPhone(val);
              if (field === 'password') setPassword(val);
              if (field === 'confirmPassword') setConfirmPassword(val);
            }}
            handleRegister={handleRegister} setView={setView} cleanInputs={cleanInputs}
          />
        )}
        {message && <div className={`alert ${message.includes('sucesso') ? 'success' : 'error'}`}>{message}</div>}
      </div>
    </div>
  );
}

export default App;