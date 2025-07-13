import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import authService from '../services/authService';

export default function AuthDebug() {
  const { user, loading, isAuthenticated } = useAuth();
  const [testResult, setTestResult] = useState(null);
  const [testLoading, setTestLoading] = useState(false);
  const [testError, setTestError] = useState(null);

  const savedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const testLogin = async () => {
    setTestLoading(true);
    setTestError(null);
    setTestResult(null);

    try {
      const response = await authService.login({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false
      });
      
      console.log('Respuesta de test login:', response);
      setTestResult(response);
    } catch (err) {
      console.error('Error en test login:', err);
      setTestError(err.message);
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '11px',
      zIndex: 9999,
      maxWidth: '350px',
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <h4 style={{ marginBottom: '10px' }}>Auth Debug</h4>
      
      <div style={{ marginBottom: '10px' }}>
        <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
        <p><strong>User:</strong> {user ? JSON.stringify(user) : 'null'}</p>
        <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
        <p><strong>LocalStorage User:</strong> {savedUser || 'null'}</p>
        <p><strong>LocalStorage Token:</strong> {token ? 'exists' : 'null'}</p>
        <p><strong>Current URL:</strong> {window.location.pathname}</p>
      </div>

      <div style={{ borderTop: '1px solid #666', paddingTop: '10px' }}>
        <button
          onClick={testLogin}
          disabled={testLoading}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: testLoading ? 'not-allowed' : 'pointer',
            opacity: testLoading ? 0.6 : 1,
            fontSize: '10px'
          }}
        >
          {testLoading ? 'Testing...' : 'Test Login API'}
        </button>

        {testError && (
          <div style={{
            marginTop: '10px',
            padding: '8px',
            backgroundColor: '#f44336',
            borderRadius: '4px',
            fontSize: '10px'
          }}>
            Error: {testError}
          </div>
        )}

        {testResult && (
          <div style={{
            marginTop: '10px',
            padding: '8px',
            backgroundColor: '#2196F3',
            borderRadius: '4px',
            fontSize: '10px'
          }}>
            <strong>API Response:</strong>
            <pre style={{
              marginTop: '5px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
