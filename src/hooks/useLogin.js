import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const loginUser = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await login(credentials);
      return response;
    } catch (err) {
      setError(err.message || 'Error en el login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};

export default useLogin;