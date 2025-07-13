import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { register } = useAuth();

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await register(userData);
      setData(response);
      return response;
    } catch (err) {
      setError(err.message || 'Error en el registro');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función simplificada para usuarios básicos
  const registerBasicUser = async (email, password, role = 'client') => {
    const userData = {
      email,
      password,
      confirmPassword: password,
      role,
      acceptTerms: true,
    };
    return registerUser(userData);
  };

  // Función específica para registrar profesionales
  const registerProfessional = async (professionalData) => {
    const userData = {
      ...professionalData,
      role: 'professional',
      acceptTerms: true,
    };
    
    return registerUser(userData);
  };

  return { 
    register: registerUser,           // Registro completo con objeto userData
    registerBasic: registerBasicUser, // Registro básico
    registerProfessional,            // Registro específico para profesionales
    loading,
    error, 
    responseData: data
  };
};

export default useRegister;