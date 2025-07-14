// pages/Admin/ApplicationsManagementPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { useApplications } from '../../hooks/useApplications';
import ApplicationsList from '../../components/ApplicationsList';
import ApplicationsStats from '../../components/ApplicationsStats';
import Loader from '../../components/Loader';
import Notification from '../../components/Notification';

const ApplicationsManagementPage = () => {
  const { user } = useAuth();
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Filtros según la pestaña activa
  const getFilters = () => {
    switch (activeTab) {
      case 'pending':
        return { status: 'pending' };
      case 'under_review':
        return { status: 'under_review' };
      case 'accepted':
        return { status: 'accepted' };
      case 'rejected':
        return { status: 'rejected' };
      case 'withdrawn':
        return { status: 'withdrawn' };
      case 'expired':
        return { status: 'expired' };
      default:
        return {};
    }
  };

  const { applications, loading, error, refetch } = useApplications(getFilters());

  const tabs = [
    { id: 'all', label: 'Todas', count: null },
    { id: 'pending', label: 'Pendientes', count: null },
    { id: 'under_review', label: 'En Revisión', count: null },
    { id: 'accepted', label: 'Aceptadas', count: null },
    { id: 'rejected', label: 'Rechazadas', count: null },
    { id: 'withdrawn', label: 'Retiradas', count: null },
    { id: 'expired', label: 'Expiradas', count: null }
  ];

  const handleApplicationUpdate = () => {
    refetch();
    setNotification({ type: 'success', message: 'Aplicación actualizada exitosamente' });
  };

  // Verificar permisos de administrador
  if (user?.role !== 'admin' && user?.role !== 'gerencia') {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          No tienes permisos para acceder a esta página.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Aplicaciones</h1>
        <p className="text-gray-600">
          Administra todas las aplicaciones del sistema
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Panel de estadísticas */}
        <div className="lg:col-span-1">
          <ApplicationsStats />
        </div>

        {/* Panel principal */}
        <div className="lg:col-span-3">
          {/* Navegación por pestañas */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                    {tab.count !== null && (
                      <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Actualizar Lista
              </button>
              <button
                onClick={() => {
                  // Implementar exportación de datos
                  setNotification({ type: 'info', message: 'Función de exportación próximamente...' });
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Exportar Datos
              </button>
              <button
                onClick={() => {
                  // Implementar recalculación masiva de prioridades
                  setNotification({ type: 'info', message: 'Función de recálculo masivo próximamente...' });
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Recalcular Prioridades
              </button>
            </div>
          </div>

          {/* Lista de aplicaciones */}
          <ApplicationsList
            showDetails={true}
          />

          {/* Información adicional para administradores */}
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Información para Administradores</h3>
            <ul className="list-disc list-inside text-yellow-800 space-y-1">
              <li>Las aplicaciones se muestran con todos los detalles disponibles</li>
              <li>Puedes filtrar por estado usando las pestañas superiores</li>
              <li>Cada aplicación puede ser evaluada, aprobada o rechazada según el contexto</li>
              <li>Las estadísticas se actualizan en tiempo real</li>
              <li>Usa las acciones rápidas para operaciones masivas</li>
            </ul>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default ApplicationsManagementPage;
