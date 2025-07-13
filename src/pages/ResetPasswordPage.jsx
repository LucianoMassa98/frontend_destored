import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setMessage('Token de restablecimiento no encontrado en la URL');
      setMessageType('error');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setMessage('Token de restablecimiento no válido');
      setMessageType('error');
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      setMessage('Por favor completa todos los campos');
      setMessageType('error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      setMessageType('error');
      return;
    }

    if (formData.password.length < 8) {
      setMessage('La contraseña debe tener al menos 8 caracteres');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');
    
    try {
      await resetPassword(token, formData.password, formData.confirmPassword);
      setMessage('Contraseña actualizada exitosamente. Ya puedes iniciar sesión.');
      setMessageType('success');
      
      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setMessage(error.message || 'Error al restablecer la contraseña. El token puede estar expirado.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token && messageType === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center">
              <img
                className="h-12 w-auto"
                src="/Logo_Destored.svg"
                alt="Destored"
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Error
            </h2>
          </div>
          <div className="bg-red-800 text-red-200 border border-red-600 p-4 rounded-md text-center">
            <p>{message}</p>
            <button
              onClick={() => navigate('/forgot-password')}
              className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              Solicitar nuevo enlace
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <img
              className="h-12 w-auto"
              src="/Logo_Destored.svg"
              alt="Destored"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Restablecer Contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Ingresa tu nueva contraseña
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">
                Nueva Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Nueva contraseña (mín. 8 caracteres)"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar nueva contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-md ${
              messageType === 'success' 
                ? 'bg-green-800 text-green-200 border border-green-600' 
                : 'bg-red-800 text-red-200 border border-red-600'
            }`}>
              <p className="text-sm">{message}</p>
              {messageType === 'success' && (
                <p className="text-xs mt-2 text-green-300">
                  Serás redirigido al login en unos segundos...
                </p>
              )}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Actualizando...
                </div>
              ) : (
                'Actualizar Contraseña'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
