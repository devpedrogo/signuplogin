import api from '../services/api';
import { useEffect, useState } from 'react';

interface UserListProps {
  onBack: () => void;
}

export const UserList = ({ onBack }: UserListProps) => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await api.get('/dashboard-info');
        setUsers(response.data.usuarios);
      } catch (e) {
        console.error("Erro ao carregar lista completa", e);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="dash-card" style={{ maxWidth: '1000px', width: '90vw' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ backgroundColor: '#95a5a6', width: 'auto', padding: '8px 15px' }}>
          ⬅ Voltar
        </button>
        <h2 style={{ margin: 0 }}>📋 Relatório Geral de Usuários</h2>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'black', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Nome</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Email</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Telefone</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{user.full_name}</td>
                <td style={{ padding: '10px' }}>{user.email}</td>
                <td style={{ padding: '10px' }}>{user.phone}</td>
                <td style={{ padding: '10px' }}>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};