import { useState } from 'react';

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const registerUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      // Solo enviar los datos obligatorios: email, password, rol
      const userPayload = {
        email: userData.email,
        password: userData.password,
        rol: userData.rol
      };

   

      // Remover campos undefined para evitar problemas
      Object.keys(userPayload).forEach(key => {
        if (userPayload[key] === undefined) {
          delete userPayload[key];
        }
      });

      console.log('Payload being sent:', JSON.stringify(userPayload, null, 2)); // Para debug

      const response = await fetch('https://destored-backend-production.up.railway.app/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Función simplificada para usuarios básicos (no profesionales)
  const registerBasicUser = async (email, password, rol) => {
    const userData = {
      email,
      password,
      rol
    };
    return registerUser(userData);
  };

  // Función específica para registrar profesionales
  const registerProfessional = async (professionalData) => {
    const userData = {
      ...professionalData,
      rol: 'profesional'
    };
    
    return registerUser(userData);
  };

  return { 
    register: registerUser,           // Registro completo con objeto userData
    registerBasic: registerBasicUser, // Registro básico (compatible con tu implementación actual)
    registerProfessional,            // Registro específico para profesionales
    loading: isLoading,
    error, 
    responseData: data
  };
};

export default useRegister;