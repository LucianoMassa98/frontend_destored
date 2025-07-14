// contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshIntervalRef = useRef(null);

  // Check for existing session on app startup
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const token = authService.getToken();
        
        if (savedUser && token && authService.isTokenValid()) {
          const parsedUser = JSON.parse(savedUser);
          // Asegurar que el usuario tenga una estructura mínima válida
          const validUser = {
            ...parsedUser,
            role: parsedUser.role
          };
          console.log('Usuario cargado desde localStorage:', validUser);
          console.log('Rol del usuario:', parsedUser.role);
          setUser(validUser);
        } else {
          console.log('No hay sesión válida o token expirado');
          // Intentar refrescar token si existe refresh token
          const refreshToken = authService.getRefreshToken();
          if (refreshToken) {
            try {
              const response = await authService.refreshToken(refreshToken);
              if (response.accessToken) {
                authService.saveTokens(response.accessToken, response.refreshToken);
                // Recargar datos del usuario si es necesario
                const savedUser = localStorage.getItem('user');
                if (savedUser) {
                  const parsedUser = JSON.parse(savedUser);
                  // Asegurar que el usuario tenga una estructura mínima válida
                  const validUser = {
                    ...parsedUser,
                    role: parsedUser.role
                  };
                  setUser(validUser);
                }
              }
            } catch (error) {
              console.error('Error refrescando token:', error);
              authService.clearTokens();
              localStorage.removeItem('user');
            }
          } else {
            // Clear invalid data
            authService.clearTokens();
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        authService.clearTokens();
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    // Añadir un pequeño delay para asegurar que localStorage esté disponible
    const timer = setTimeout(checkAuthStatus, 100);
    return () => clearTimeout(timer);
  }, []);

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      console.log('Logout realizado');
      setUser(null);
      authService.clearTokens();
      localStorage.removeItem('user');
      // Limpiar intervalo de refresh
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    }
  };

  // Token refresh automático
  useEffect(() => {
    if (!user) {
      // Si no hay usuario, limpiar el intervalo
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
      return;
    }

    const refreshTokenAutomatic = async () => {
      try {
        const currentRefreshToken = authService.getRefreshToken();
        
        if (!currentRefreshToken) {
          console.log('No hay refresh token disponible');
          logout();
          return;
        }

        console.log('Intentando refrescar token automáticamente...');
        const response = await authService.refreshToken(currentRefreshToken);
        
        if (response && response.accessToken) {
          authService.saveTokens(response.accessToken, response.refreshToken || currentRefreshToken);
          console.log('Token refrescado exitosamente');
        } else {
          console.log('No se pudo refrescar el token');
          logout();
        }
      } catch (error) {
        console.error('Error refrescando token automáticamente:', error);
        // Si el refresh falla, hacer logout
        logout();
      }
    };

    const checkTokenExpiration = () => {
      const token = authService.getToken();
      
      if (!token) {
        logout();
        return;
      }

      try {
        // Intentar decodificar el token JWT
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          const currentTime = Date.now() / 1000;
          const timeUntilExpiry = payload.exp - currentTime;
          
          // Si el token expira en menos de 5 minutos, refrescarlo
          if (timeUntilExpiry < 300) { // 5 minutos
            console.log('Token expira pronto, refrescando automáticamente...');
            refreshTokenAutomatic();
          }
        }
      } catch (error) {
        console.error('Error verificando expiración del token:', error);
      }
    };

    // Verificar inmediatamente al montar
    checkTokenExpiration();

    // Configurar intervalo para verificar cada 4 minutos
    refreshIntervalRef.current = setInterval(checkTokenExpiration, 4 * 60 * 1000);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [user]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      
      console.log('Respuesta completa de login:', response);
      
      // La API devuelve: { status, message, data: { user, accessToken, refreshToken }, timestamp }
      if (response.status === 'success' && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        
        console.log('Datos del usuario desde API:', user);
        console.log('Rol del usuario desde API:', user.role);
        
        // Asegurar que el usuario tenga una estructura mínima válida
        const validUser = {
          ...user,
          role: user.role
        };
        
        // Guardar tokens
        authService.saveTokens(accessToken, refreshToken);
        
        // Guardar datos del usuario
        setUser(validUser);
        localStorage.setItem('user', JSON.stringify(validUser));
        console.log('Login exitoso - Usuario guardado:', validUser);
        console.log('Rol guardado:', validUser.role);
        
        return response;
      } else {
        throw new Error(response.message || 'Error en el login');
      }
      
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      console.log('Registro exitoso:', response);
      return response;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await authService.verifyEmail(token);
      console.log('Email verificado exitosamente:', response);
      return response;
    } catch (error) {
      console.error('Error verificando email:', error);
      throw error;
    }
  };

  const resendVerification = async (email) => {
    try {
      const response = await authService.resendVerification(email);
      console.log('Email de verificación reenviado:', response);
      return response;
    } catch (error) {
      console.error('Error reenviando verificación:', error);
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword(email);
      console.log('Solicitud de reset de contraseña enviada:', response);
      return response;
    } catch (error) {
      console.error('Error solicitando reset de contraseña:', error);
      throw error;
    }
  };

  const resetPassword = async (token, password, confirmPassword) => {
    try {
      const response = await authService.resetPassword(token, password, confirmPassword);
      console.log('Contraseña reseteada exitosamente:', response);
      return response;
    } catch (error) {
      console.error('Error reseteando contraseña:', error);
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword, confirmNewPassword) => {
    try {
      const response = await authService.changePassword(currentPassword, newPassword, confirmNewPassword);
      console.log('Contraseña cambiada exitosamente:', response);
      return response;
    } catch (error) {
      console.error('Error cambiando contraseña:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
    changePassword,
    loading,
    isAuthenticated: !!user,
  };

  console.log('AuthContext state:', { user: !!user, loading, isAuthenticated: !!user });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};