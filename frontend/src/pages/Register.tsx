interface RegisterProps {
  data: any;
  setData: (field: string, val: string) => void;
  handleRegister: () => void;
  setView: (val: 'login' | 'register') => void;
  cleanInputs: () => void;
}


export const Register = ({ data, setData, handleRegister, setView, cleanInputs }: RegisterProps) => {
  const validatePassword = (pw: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pw);
  };

  const { password } = data;

  return( 
    <div>
      <h2>📝 Criar Conta</h2>
      <div className='area-inputs user-list-container'>
        <div className="input-group"><label>Nome Completo</label>
          <input type="text" value={data.fullName} onChange={(e) => setData('fullName', e.target.value)} />
        </div>
        <div className="input-group"><label>Nome de Usuário</label>
          <input type="text" value={data.username} onChange={(e) => setData('username', e.target.value)} />
        </div>
        <div className="input-group"><label>Telefone</label>
          <input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
        </div>
        <div className="input-group"><label>Email</label>
          <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
        </div>
        <div className="input-group"><label>Senha</label>
          <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
          <ul style={{ fontSize: '0.7rem', textAlign: 'left', color: '#666', marginTop: '5px' }}>
            <li style={{ color: password.length >= 8 ? 'green' : 'red' }}>Mínimo 8 caracteres</li>
            <li style={{ color: /[A-Z]/.test(password) ? 'green' : 'red' }}>Uma letra maiúscula</li>
            <li style={{ color: /\d/.test(password) ? 'green' : 'red' }}>Um número</li>
            <li style={{ color: /[@$!%*?&]/.test(password) ? 'green' : 'red' }}>Um caractere especial (@$!%*?&)</li>
          </ul>
        </div>
        <div className="input-group"><label>Confirmar Senha</label>
          <input type="password" value={data.confirmPassword} onChange={(e) => setData('confirmPassword', e.target.value)} />
        </div>
      </div>
      <button 
        className="btn-register" 
        onClick={handleRegister} 
        disabled={!/[A-Z]/.test(password) || !/\d/.test(password) || password.length < 8}
        style={{
          opacity: (/[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8) ? 1 : 0.5,
          cursor: (/[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8) ? 'pointer' : 'not-allowed'
        }}
      >
        Finalizar Cadastro
      </button>
      <p className="link-text">
        Já possui conta? <span onClick={() => { setView('login'); cleanInputs(); }}>Voltar</span>
      </p>
    </div>
  )
}