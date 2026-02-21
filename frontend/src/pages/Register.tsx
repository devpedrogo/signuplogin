interface RegisterProps {
  data: any;
  setData: (field: string, val: string) => void;
  handleRegister: () => void;
  setView: (val: 'login' | 'register') => void;
  cleanInputs: () => void;
}

export const Register = ({ data, setData, handleRegister, setView, cleanInputs }: RegisterProps) => (
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
      </div>
      <div className="input-group"><label>Confirmar Senha</label>
        <input type="password" value={data.confirmPassword} onChange={(e) => setData('confirmPassword', e.target.value)} />
      </div>
    </div>
    <button className="btn-register" onClick={handleRegister}>Finalizar Cadastro</button>
    <p className="link-text">
      Já possui conta? <span onClick={() => { setView('login'); cleanInputs(); }}>Voltar</span>
    </p>
  </div>
);