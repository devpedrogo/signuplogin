interface LoginProps {
  identifier: string;
  setIdentifier: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  handleLogin: () => void;
  setView: (val: 'login' | 'register') => void;
  cleanInputs: () => void;
}

export const Login = ({ identifier, setIdentifier, password, setPassword, handleLogin, setView, cleanInputs }: LoginProps) => (
  <div>
    <h2>🔐 Login</h2>
    <div className="input-group">
      <label>Usuário ou Email</label>
      <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
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
);