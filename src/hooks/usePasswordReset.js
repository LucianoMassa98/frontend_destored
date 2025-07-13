import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';

const usePasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const { forgotPassword, resetPassword, changePassword } = useAuth();

  const requestPasswordReset = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await forgotPassword(email);
      setSuccess(true);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Error al solicitar el reset de contraseña');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordWithToken = async (token, password, confirmPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await resetPassword(token, password, confirmPassword);
      setSuccess(true);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Error al restablecer la contraseña');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const changeUserPassword = async (currentPassword, newPassword, confirmNewPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await changePassword(currentPassword, newPassword, confirmNewPassword);
      setSuccess(true);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Error al cambiar la contraseña');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    requestPasswordReset,
    resetPasswordWithToken,
    changeUserPassword,
  };
};

export default usePasswordReset;
