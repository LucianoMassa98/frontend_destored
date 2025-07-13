import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';

const ChangePasswordForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  
  const { changePassword } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword) {
      setMessage('Por favor completa todos los campos');
      setMessageType('error');
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage('Las nuevas contraseñas no coinciden');
      setMessageType('error');
      return;
    }

    if (formData.newPassword.length < 8) {
      setMessage('La nueva contraseña debe tener al menos 8 caracteres');
      setMessageType('error');
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setMessage('La nueva contraseña debe ser diferente a la actual');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');
    
    try {
      await changePassword(formData.currentPassword, formData.newPassword, formData.confirmNewPassword);
      setMessage('Contraseña actualizada exitosamente');
      setMessageType('success');
      
      // Resetear formulario
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (error) {
      setMessage(error.message || 'Error al cambiar la contraseña');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Cambiar Contraseña</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
            Contraseña Actual
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            required
            className="w-full px-3 py-2 border border-gray-600 rounded-md placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Tu contraseña actual"
            value={formData.currentPassword}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
            Nueva Contraseña
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            required
            className="w-full px-3 py-2 border border-gray-600 rounded-md placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Nueva contraseña (mín. 8 caracteres)"
            value={formData.newPassword}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-300 mb-2">
            Confirmar Nueva Contraseña
          </label>
          <input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            autoComplete="new-password"
            required
            className="w-full px-3 py-2 border border-gray-600 rounded-md placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Confirmar nueva contraseña"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        {message && (
          <div className={`p-3 rounded-md text-sm ${
            messageType === 'success' 
              ? 'bg-green-800 text-green-200 border border-green-600' 
              : 'bg-red-800 text-red-200 border border-red-600'
          }`}>
            {message}
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Actualizando...
              </div>
            ) : (
              'Actualizar Contraseña'
            )}
          </button>
          
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
