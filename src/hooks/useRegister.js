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

    console.log('Datos enviados desde useRegister:', userData);

    try {
      const response = await register(userData);
      setData(response);
      return response;
    } catch (err) {
      console.error('Error en useRegister:', err);
      
      // Extraer mensajes específicos de validación
      let errorMessage = err.message || 'Error en el registro';
      
      // Si es un error de validación, intentar extraer detalles más específicos
      if (errorMessage.includes('Error de validación:')) {
        errorMessage = errorMessage.replace('Error de validación: ', '');
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función simplificada para usuarios básicos (ahora con campos requeridos)
  const registerBasic = async (email, password, firstName, lastName, role = 'client', phone = '') => {
    const userData = {
      email,
      password,
      confirmPassword: password,
      firstName,
      lastName,
      role,
      phone,
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
    registerBasic,                   // Registro básico con campos requeridos
    registerProfessional,            // Registro específico para profesionales
    loading,
    error, 
    responseData: data
  };
};

export default useRegister;