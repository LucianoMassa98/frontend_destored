import { useEffect, useRef } from 'react';
import { useAuth } from '../utils/AuthContext';
import authService from '../services/authService';

const useTokenRefresh = () => {
  const { user, logout } = useAuth();
  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    if (!user) {
      // Si no hay usuario, limpiar el intervalo
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
      return;
    }

    const refreshToken = async () => {
      try {
        const currentRefreshToken = authService.getRefreshToken();
        
        if (!currentRefreshToken) {
          console.log('No hay refresh token disponible');
          logout();
          return;
        }

        console.log('Intentando refrescar token...');
        const response = await authService.refreshToken(currentRefreshToken);
        
        if (response && response.accessToken) {
          authService.saveTokens(response.accessToken, response.refreshToken || currentRefreshToken);
          console.log('Token refrescado exitosamente');
        } else {
          console.log('No se pudo refrescar el token');
          logout();
        }
      } catch (error) {
        console.error('Error refrescando token:', error);
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
            console.log('Token expira pronto, refrescando...');
            refreshToken();
          }
        }
      } catch (error) {
        console.error('Error verificando expiración del token:', error);
        // Si hay error decodificando, intentar refrescar de todas formas
        refreshToken();
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
  }, [user, logout]);

  return null; // Este hook no retorna nada, solo maneja el refresh automático
};

export default useTokenRefresh;
