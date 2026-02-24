interface ModalProps {
  selectedUser: string;
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmUpdate: () => void;
  onClose: () => void;
}

export const Modal = ({ editData, setEditData, onSave, onClose }: any) => (
  <div className="modal-overlay">
    <div className="modal-content user-list-container">
      <h3 style={{color: 'black'}}>📝 Editar Perfil</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
        <label>Nome Completo</label>
        <input type="text" value={editData.full_name} onChange={e => setEditData({...editData, full_name: e.target.value})} />
        
        <label>E-mail</label>
        <input type="email" value={editData.email} onChange={e => setEditData({...editData, email: e.target.value})} />
        
        <label>Telefone</label>
        <input type="tel" value={editData.phone} onChange={e => setEditData({...editData, phone: e.target.value})} />
        
        <label>Username</label>
        <input type="text" value={editData.username} onChange={e => setEditData({...editData, username: e.target.value})} />
        
        <label>Nova Senha (opcional)</label>
        <input type="password" placeholder="Deixe vazio para não alterar" onChange={e => setEditData({...editData, password: e.target.value})} />
      </div>
      <div className="modal-actions" style={{ marginTop: '20px' }}>
        <button className="btn-login" onClick={onSave}>Salvar</button>
        <button className="btn-register" style={{ backgroundColor: '#95a5a6' }} onClick={onClose}>Cancelar</button>
      </div>
    </div>
  </div>
);