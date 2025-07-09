// contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

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

  // Check for existing session on app startup
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (savedUser && token) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          console.log('Usuario cargado desde localStorage:', parsedUser);
        } else {
          console.log('No hay datos de usuario en localStorage');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    // Añadir un pequeño delay para asegurar que localStorage esté disponible
    const timer = setTimeout(checkAuthStatus, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = (userData, accessToken) => {
    console.log('Login realizado con:', userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', accessToken);
  };

  const logout = () => {
    console.log('Logout realizado');
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    logout,
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