import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Token de verificación no encontrado en la URL');
      return;
    }

    const handleVerification = async () => {
      try {
        const response = await verifyEmail(token);
        setStatus('success');
        setMessage('Email verificado exitosamente. Ya puedes iniciar sesión.');
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'Error al verificar el email. El token puede estar expirado o ser inválido.');
      }
    };

    handleVerification();
  }, [searchParams, verifyEmail, navigate]);

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
            Verificación de Email
          </h2>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="bg-gray-800 px-6 py-8 rounded-lg text-center">
              {status === 'verifying' && (
                <div>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
                  <p className="text-white">Verificando tu email...</p>
                </div>
              )}
              
              {status === 'success' && (
                <div>
                  <div className="text-green-400 text-6xl mb-4">✓</div>
                  <h3 className="text-lg font-medium text-white mb-2">¡Verificación exitosa!</h3>
                  <p className="text-gray-300">{message}</p>
                  <p className="text-sm text-gray-400 mt-4">Serás redirigido al login en unos segundos...</p>
                </div>
              )}
              
              {status === 'error' && (
                <div>
                  <div className="text-red-400 text-6xl mb-4">✗</div>
                  <h3 className="text-lg font-medium text-white mb-2">Error de verificación</h3>
                  <p className="text-gray-300 mb-6">{message}</p>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Ir al Login
                    </button>
                    <button
                      onClick={() => navigate('/resend-verification')}
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Solicitar nuevo email de verificación
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
