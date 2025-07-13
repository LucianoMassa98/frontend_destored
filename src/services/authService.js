// services/authService.js

const mode = import.meta.env.VITE_MODE || 'development';

// Configuración de la URL base según el modo

var API_URL;
if(mode === 'development') {
  console.log('Modo de desarrollo: usando API_URL:', import.meta.env.VITE_DEV_API_URL);
  API_URL = import.meta.env.VITE_DEV_API_URL; 
} else if(mode === 'test') {
  console.log('Modo de prueba: usando API_URL:', import.meta.env.VITE_TEST_API_URL);
  API_URL = import.meta.env.VITE_TEST_API_URL;
} else {
  console.log('Modo de producción: usando API_URL:', import.meta.env.VITE_PROD_API_URL);
  API_URL = import.meta.env.VITE_PROD_API_URL;
} 


class AuthService {
  constructor() {
    this.baseURL = `${API_URL}/api/v1`;
  }

  // Método auxiliar para hacer peticiones HTTP
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Agregar token de autorización si está disponible
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      console.log(`Haciendo petición a: ${url}`);
      console.log('Configuración de petición:', config);
      
      const response = await fetch(url, config);
      
      // Verificar si la respuesta tiene contenido antes de parsear JSON
      let data = null;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const text = await response.text();
        if (text) {
          try {
            data = JSON.parse(text);
          } catch (parseError) {
            console.error('Error parsing JSON:', parseError, 'Response text:', text);
            data = { message: 'Error parsing server response' };
          }
        }
      } else {
        const text = await response.text();
        data = { message: text || `HTTP error! status: ${response.status}` };
      }

      console.log(`Respuesta de ${endpoint}:`, { status: response.status, data });

      if (!response.ok) {
        throw new Error(data?.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`Error en ${endpoint}:`, error);
      throw error;
    }
  }

  // Registrar nuevo usuario
  async register(userData) {
    const payload = {
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role || 'client',
      phone: userData.phone,
      acceptTerms: userData.acceptTerms || true,
    };

    return this.makeRequest('/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Iniciar sesión
  async login(credentials) {
    const payload = {
      email: credentials.email,
      password: credentials.password,
      rememberMe: credentials.rememberMe || false,
    };

    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Refrescar token de acceso
  async refreshToken(refreshToken) {
    const payload = {
      refreshToken: refreshToken,
    };

    return this.makeRequest('/refresh', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Verificar email con token
  async verifyEmail(token) {
    const payload = {
      token: token,
    };

    return this.makeRequest('/verify-email', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Reenviar email de verificación
  async resendVerification(email) {
    const payload = {
      email: email,
    };

    return this.makeRequest('/resend-verification', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Solicitar reset de contraseña
  async forgotPassword(email) {
    const payload = {
      email: email,
    };

    return this.makeRequest('/forgot-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Resetear contraseña con token
  async resetPassword(token, password, confirmPassword) {
    const payload = {
      token: token,
      password: password,
      confirmPassword: confirmPassword,
    };

    return this.makeRequest('/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Cambiar contraseña (usuario autenticado)
  async changePassword(currentPassword, newPassword, confirmNewPassword) {
    const payload = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    };

    return this.makeRequest('/change-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Cerrar sesión
  async logout() {
    return this.makeRequest('/logout', {
      method: 'POST',
    });
  }

  // Verificar si el token es válido
  isTokenValid() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      // Verificar si el token tiene el formato JWT
      const parts = token.split('.');
      if (parts.length !== 3) {
        // No es un JWT válido, pero podría ser un token simple
        return true;
      }

      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Error verificando token:', error);
      // Si hay error decodificando, asumir que es válido (token simple)
      return true;
    }
  }

  // Obtener token del localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Obtener refresh token del localStorage
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  // Guardar tokens en localStorage
  saveTokens(accessToken, refreshToken) {
    localStorage.setItem('token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  // Limpiar tokens del localStorage
  clearTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}

export const authService = new AuthService();
export default authService;
