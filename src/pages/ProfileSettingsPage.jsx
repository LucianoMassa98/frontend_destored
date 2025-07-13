import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import ChangePasswordForm from '../components/ChangePasswordForm';

const ProfileSettingsPage = () => {
  const { user } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handlePasswordChangeSuccess = () => {
    setShowChangePassword(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-white mb-6">Configuración del Perfil</h1>
            
            {/* Información del usuario */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-white mb-4">Información Personal</h2>
              <div className="bg-gray-700 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Nombre:</span>
                  <span className="text-white">{user?.firstName} {user?.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Email:</span>
                  <span className="text-white">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Rol:</span>
                  <span className="text-white capitalize">{user?.role}</span>
                </div>
                {user?.phone && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Teléfono:</span>
                    <span className="text-white">{user.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Seguridad */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-white mb-4">Seguridad</h2>
              
              {!showChangePassword ? (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-medium">Contraseña</h3>
                      <p className="text-gray-300 text-sm">Cambiar tu contraseña de acceso</p>
                    </div>
                    <button
                      onClick={() => setShowChangePassword(true)}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
                </div>
              ) : (
                <ChangePasswordForm
                  onClose={() => setShowChangePassword(false)}
                  onSuccess={handlePasswordChangeSuccess}
                />
              )}
            </div>

            {/* Estado de la cuenta */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-white mb-4">Estado de la Cuenta</h2>
              <div className="bg-gray-700 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Email verificado:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user?.emailVerified 
                      ? 'bg-green-800 text-green-200' 
                      : 'bg-red-800 text-red-200'
                  }`}>
                    {user?.emailVerified ? 'Verificado' : 'No verificado'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Estado de la cuenta:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user?.isActive 
                      ? 'bg-green-800 text-green-200' 
                      : 'bg-red-800 text-red-200'
                  }`}>
                    {user?.isActive ? 'Activa' : 'Inactiva'}
                  </span>
                </div>
              </div>
            </div>

            {/* Acciones adicionales */}
            <div>
              <h2 className="text-lg font-medium text-white mb-4">Acciones</h2>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="space-y-3">
                  {!user?.emailVerified && (
                    <button
                      onClick={() => window.location.href = '/resend-verification'}
                      className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Reenviar Verificación de Email
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
