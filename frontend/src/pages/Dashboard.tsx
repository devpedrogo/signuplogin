import { Modal } from '../components/Modal';
import '../App.css';

interface DashboardProps {
  username: string;
  dashboardData: any;
  handleDelete: (u: string) => void;
  handleLogout: () => void;
  showModal: boolean;
  setShowModal: (b: boolean) => void;
  // Mudamos aqui para suportar o objeto de edição completo
  editData: any;
  setEditData: (data: any) => void;
  openEditModal: (user: any) => void; 
  handleSaveEdit: () => void;
  openReport: () => void;
}

export const Dashboard = ({ 
  username, dashboardData, handleDelete, handleLogout, 
  showModal, setShowModal, editData, setEditData, 
  openEditModal, handleSaveEdit, openReport
}: DashboardProps) => (
  <div className="dash-card" style={{ maxWidth: '100%' }}>
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
          <div style={{display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '15px'}}>
            <h4>CADASTRADOS</h4>
            <button 
              onClick={openReport}
              style={{ 
                backgroundColor: '#34495e', 
                marginTop: '0px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0px',
                cursor: 'pointer',
                width: '120px',
                fontSize:'10px',
                padding: '8px 10px'
              }}
            >
              <span>📄</span> Listar Usuários
            </button>
          </div>
          <ul className='user-list-container' style={{maxHeight: '200px', overflowY: 'auto'}}>
            {dashboardData.usuarios.map((user: any, index: number) => (
              <li key={index} className="user-item-list" style={{
                padding: '8px 12px',
                borderBottom: '1px solid #eee',
                fontSize: '0.9rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'black'
              }}>
                {/* Agora usamos user.username pois 'user' é um objeto */}
                <span>👤 {user.username}</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button 
                    className="edit-btn" 
                    onClick={() => openEditModal(user)} 
                    style={{ width: '60px', fontSize: '0.7rem', backgroundColor: '#23aeb3', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(user.username)} 
                    className="del-btn" 
                    style={{ width: '60px', fontSize: '0.7rem', backgroundColor: '#f80202', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Excluir
                  </button>
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

    {showModal && editData && (
      <Modal 
        editData={editData} 
        setEditData={setEditData} 
        onSave={handleSaveEdit} 
        onClose={() => setShowModal(false)} 
      />
    )}
  </div>
);