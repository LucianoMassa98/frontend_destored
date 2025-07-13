import { useState } from 'react';
import authService from '../services/authService';

const AuthEndpointTester = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const testEndpoint = async (endpointName, testFunction) => {
    setLoading(prev => ({ ...prev, [endpointName]: true }));
    try {
      const result = await testFunction();
      setResults(prev => ({ 
        ...prev, 
        [endpointName]: { 
          success: true, 
          data: result,
          timestamp: new Date().toLocaleTimeString()
        } 
      }));
    } catch (error) {
      setResults(prev => ({ 
        ...prev, 
        [endpointName]: { 
          success: false, 
          error: error.message,
          timestamp: new Date().toLocaleTimeString()
        } 
      }));
    } finally {
      setLoading(prev => ({ ...prev, [endpointName]: false }));
    }
  };

  const tests = [
    {
      name: 'refresh',
      label: 'Test Refresh Token',
      test: () => authService.refreshToken('test-refresh-token')
    },
    {
      name: 'verifyEmail',
      label: 'Test Verify Email',
      test: () => authService.verifyEmail('test-token')
    },
    {
      name: 'resendVerification',
      label: 'Test Resend Verification',
      test: () => authService.resendVerification('test@example.com')
    },
    {
      name: 'forgotPassword',
      label: 'Test Forgot Password',
      test: () => authService.forgotPassword('test@example.com')
    },
    {
      name: 'resetPassword',
      label: 'Test Reset Password',
      test: () => authService.resetPassword('test-token', 'newpassword123', 'newpassword123')
    },
    {
      name: 'changePassword',
      label: 'Test Change Password',
      test: () => authService.changePassword('currentpass', 'newpass123', 'newpass123')
    }
  ];

  const runAllTests = async () => {
    for (const test of tests) {
      await testEndpoint(test.name, test.test);
      // Pequeña pausa entre tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Auth Endpoints Tester</h2>
        <button
          onClick={runAllTests}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Ejecutar Todos los Tests
        </button>
      </div>

      <div className="space-y-4">
        {tests.map(test => (
          <div key={test.name} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-white">{test.label}</h3>
              <button
                onClick={() => testEndpoint(test.name, test.test)}
                disabled={loading[test.name]}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded disabled:opacity-50"
              >
                {loading[test.name] ? 'Ejecutando...' : 'Probar'}
              </button>
            </div>

            {results[test.name] && (
              <div className={`p-3 rounded text-sm ${
                results[test.name].success 
                  ? 'bg-green-800 text-green-200' 
                  : 'bg-red-800 text-red-200'
              }`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">
                    {results[test.name].success ? '✓ Éxito' : '✗ Error'}
                  </span>
                  <span className="text-xs opacity-75">
                    {results[test.name].timestamp}
                  </span>
                </div>
                
                {results[test.name].success ? (
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(results[test.name].data, null, 2)}
                  </pre>
                ) : (
                  <p>{results[test.name].error}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-medium text-white mb-2">Información</h3>
        <div className="text-sm text-gray-300 space-y-1">
          <p>• Los tests utilizan datos de prueba y pueden fallar por diseño</p>
          <p>• Esto es normal y esperado para validar el manejo de errores</p>
          <p>• Un endpoint que retorna error 401/400 funciona correctamente</p>
          <p>• Revisa la consola del navegador para logs detallados</p>
        </div>
      </div>
    </div>
  );
};

export default AuthEndpointTester;
