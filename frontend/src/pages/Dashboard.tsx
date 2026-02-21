import { Modal } from '../components/Modal';
import '../App.css';

interface DashboardProps {
  username: string;
  dashboardData: any;
  handleDelete: (u: string) => void;
  handleLogout: () => void;
  showModal: boolean;
  setShowModal: (b: boolean) => void;
  selectedUser: string;
  setSelectedUser: (u: string) => void;
  newPassword: string;
  setNewPassword: (s: string) => void;
  confirmUpdate: () => void;
}

export const Dashboard = ({ 
  username, dashboardData, handleDelete, handleLogout, 
  showModal, setShowModal, selectedUser, setSelectedUser, 
  newPassword, setNewPassword, confirmUpdate 
}: DashboardProps) => (
  <div className="dash-card" style={{ maxWidth: '1200px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
      <span style={{ fontSize: '2rem' }}>📊</span>
      <h2 style={{ margin: 0 }}>Painel de Controle</h2>
    </div>
    <p className="link-text">Bem-vindo, <strong>{username}</strong></p>
    <hr style={{ border: '0.5px solid #eee', margin: '20px 0' }} />
    
    {dashboardData ? (
      <div className="dashboard-grid">
        <div className="stat-card"><h4>Usuários</h4><p>{dashboardData.total_registros}</p></div>
        <div className="stat-card" style={{ borderLeftColor: '#4CAF50' }}>
          <h4>Servidor</h4>
          <div className="status-online"><span className="status-dot"></span>{dashboardData.status_sistema}</div>
        </div>
        <div className='stat-card' style={{ textAlign: 'left', borderLeftColor: '#f30713' }}>
          <h4>CADASTRADOS</h4>
          <ul className='user-list-container' style={{maxHeight: '200px', overflow: 'scroll'}}>
            {dashboardData.usuarios.map((user: string, index: number) => (
              <li key={index} className="user-item-list" style={{
                padding: '8px 12px',
                border: '1px solid #978a8a',
                fontSize: '0.9rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
                color: 'black'
              }}>
                <span>👤 {user}</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button className="edit-btn" onClick={() => { setSelectedUser(user); setShowModal(true); }} style={{ width: '60px', margin: '0', fontSize: '0.7rem', backgroundColor: '#23aeb3', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => handleDelete(user)} className="del-btn" style={{ width: '60px', margin: '0', fontSize: '0.7rem', backgroundColor: '#f80202', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' }}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ) : <p>Carregando...</p>}

    <button className="btn-register" style={{ marginTop: '20px', backgroundColor: '#e74c3c' }} onClick={handleLogout}>
      Encerrar Sessão
    </button>

    {showModal && (
      <Modal 
        selectedUser={selectedUser} newPassword={newPassword} 
        setNewPassword={setNewPassword} confirmUpdate={confirmUpdate} 
        onClose={() => setShowModal(false)} 
      />
    )}
  </div>
);