import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Por favor ingresa tu email');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');
    
    try {
      await forgotPassword(email);
      setMessage('Instrucciones para restablecer tu contraseña han sido enviadas a tu email.');
      setMessageType('success');
      
      // Redirigir al login después de 5 segundos
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } catch (error) {
      setMessage(error.message || 'Error al enviar las instrucciones de restablecimiento');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

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
            Recuperar Contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Ingresa tu email para recibir instrucciones de restablecimiento
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  Enviando...
                </div>
              ) : (
                'Enviar Instrucciones'
              )}
            </button>
          </div>

          <div className="text-center space-y-2">
            <Link
              to="/login"
              className="font-medium text-orange-400 hover:text-orange-300 block"
            >
              Volver al Login
            </Link>
            <Link
              to="/register"
              className="font-medium text-gray-400 hover:text-gray-300 text-sm"
            >
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
