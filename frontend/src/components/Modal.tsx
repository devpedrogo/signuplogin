interface ModalProps {
  selectedUser: string;
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmUpdate: () => void;
  onClose: () => void;
}

export const Modal = ({ selectedUser, newPassword, setNewPassword, confirmUpdate, onClose }: ModalProps) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3 style={{ color: 'gray' }}>Editar Senha: {selectedUser}</h3>
      <input 
        type="password" 
        placeholder="Nova Senha" 
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />
      <div className="modal-actions">
        <button className="btn-login" onClick={confirmUpdate}>Salvar</button>
        <button className="btn-register" style={{ backgroundColor: '#95a5a6' }} onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  </div>
);