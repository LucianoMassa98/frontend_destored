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
      // Estructura completa del usuario según la API
      const userPayload = {
        // Campos básicos requeridos
        username: userData.username || '',
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        email: userData.email,
        password: userData.password,
        rol: userData.rol,
        
        // Campos con valores por defecto
        isActive: userData.isActive !== undefined ? userData.isActive : true,
        emailConfirm: userData.emailConfirm !== undefined ? userData.emailConfirm : false,
        
        // Tech Stack (solo para profesionales)
        techStack: userData.rol === 'profesional' ? {
          frontend: userData.techStack?.frontend || [],
          backend: userData.techStack?.backend || [],
          database: userData.techStack?.database || [],
          devOps: userData.techStack?.devOps || []
        } : undefined,
        
        // Campos específicos para profesionales
        ...(userData.rol === 'profesional' && {
          urlPortafolio: userData.urlPortafolio || '',
          disponibilidad: userData.disponibilidad !== undefined ? userData.disponibilidad : true,
          tarifaHora: userData.tarifaHora || 0,
          nivelSeniority: userData.nivelSeniority || 'Junior',
          notasEntrevistaTecnica: userData.notasEntrevistaTecnica || '',
          estadoAutorizacion: userData.estadoAutorizacion || 'pending',
          puntuacion: userData.puntuacion || 0,
          
          // Campos de autorización
          autorizadoPorAdminId: userData.autorizadoPorAdminId || 0,
          fechaAutorizacion: userData.fechaAutorizacion || new Date().toISOString(),
          administradorAutorizador: userData.administradorAutorizador || '',
          usuariosAutorizados: userData.usuariosAutorizados || [],
          
          // Arrays relacionados (inicialmente vacíos)
          proyectosCreados: [],
          capacitacionMentorias: [],
          planesCreados: [],
          planesAdquiridos: [],
          proyectosAsignados: [],
          proyectosSupervisados: []
        })
      };

      // Remover campos undefined para evitar problemas
      Object.keys(userPayload).forEach(key => {
        if (userPayload[key] === undefined) {
          delete userPayload[key];
        }
      });

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
  const registerBasicUser = async (email, password, rol, additionalData = {}) => {
    const userData = {
      email,
      password,
      rol,
      username: additionalData.username || email.split('@')[0], // username por defecto
      firstname: additionalData.firstname || '',
      lastname: additionalData.lastname || '',
      ...additionalData
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