import { useAuth } from '../utils/AuthContext';

export default function AuthDebug() {
  const { user, loading, isAuthenticated } = useAuth();

  const savedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>Auth Debug</h4>
      <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
      <p><strong>User:</strong> {user ? JSON.stringify(user) : 'null'}</p>
      <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
      <p><strong>LocalStorage User:</strong> {savedUser || 'null'}</p>
      <p><strong>LocalStorage Token:</strong> {token ? 'exists' : 'null'}</p>
      <p><strong>Current URL:</strong> {window.location.pathname}</p>
    </div>
  );
}
