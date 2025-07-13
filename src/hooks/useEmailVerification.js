import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';

const useEmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const { verifyEmail, resendVerification } = useAuth();

  const verifyEmailToken = async (token) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await verifyEmail(token);
      setSuccess(true);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Error al verificar el email');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await resendVerification(email);
      setSuccess(true);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Error al reenviar el email de verificación');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    verifyEmailToken,
    resendVerificationEmail,
  };
};

export default useEmailVerification;
