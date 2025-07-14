// components/ApplicationsList.jsx
import React, { useState } from 'react';
import { useApplications } from '../hooks/useApplications';
import { useAuth } from '../utils/AuthContext';
import ApplicationDetails from './ApplicationDetails';
import Loader from './Loader';
import Notification from './Notification';

const ApplicationsList = ({ projectId, professionalId, showDetails = true }) => {
  const { user } = useAuth();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const [filters, setFilters] = useState({
    status: '',
    project_id: projectId || '',
    professional_id: professionalId || '',
    page: 1,
    limit: 10,
    date_from: '',
    date_to: '',
    rate_min: '',
    rate_max: ''
  });

  const { applications, loading, error, pagination, refetch } = useApplications(filters);

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'under_review', label: 'En Revisión' },
    { value: 'accepted', label: 'Aceptada' },
    { value: 'rejected', label: 'Rechazada' },
    { value: 'withdrawn', label: 'Retirada' },
    { value: 'expired', label: 'Expirada' }
  ];

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'under_review': 'bg-blue-100 text-blue-800',
      'accepted': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'withdrawn': 'bg-gray-100 text-gray-800',
      'expired': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      'pending': 'Pendiente',
      'under_review': 'En Revisión',
      'accepted': 'Aceptada',
      'rejected': 'Rechazada',
      'withdrawn': 'Retirada',
      'expired': 'Expirada'
    };
    return statusTexts[status] || status;
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset page when filtering
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      project_id: projectId || '',
      professional_id: professionalId || '',
      page: 1,
      limit: 10,
      date_from: '',
      date_to: '',
      rate_min: '',
      rate_max: ''
    });
  };

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
    setShowDetailModal(true);
  };

  const handleApplicationUpdate = () => {
    refetch();
    setNotification({ type: 'success', message: 'Aplicación actualizada exitosamente' });
  };

  if (loading && applications.length === 0) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Filtros</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Desde
            </label>
            <input
              type="date"
              value={filters.date_from}
              onChange={(e) => handleFilterChange('date_from', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Hasta
            </label>
            <input
              type="date"
              value={filters.date_to}
              onChange={(e) => handleFilterChange('date_to', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aplicaciones por página
            </label>
            <select
              value={filters.limit}
              onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarifa Mínima
            </label>
            <input
              type="number"
              step="0.01"
              value={filters.rate_min}
              onChange={(e) => handleFilterChange('rate_min', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarifa Máxima
            </label>
            <input
              type="number"
              step="0.01"
              value={filters.rate_max}
              onChange={(e) => handleFilterChange('rate_max', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Limpiar Filtros
          </button>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Actualizar
          </button>
        </div>
      </div>

      {/* Lista de aplicaciones */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">
            Aplicaciones ({pagination.totalItems || applications.length})
          </h3>
        </div>

        {error && (
          <div className="p-6 bg-red-50 border border-red-200 text-red-600">
            Error: {error}
          </div>
        )}

        {applications.length === 0 && !loading && !error ? (
          <div className="p-6 text-center text-gray-500">
            No se encontraron aplicaciones con los filtros actuales.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {applications.map((application) => (
              <div
                key={application.id}
                className="p-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleApplicationClick(application)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900">
                        Aplicación #{application.id.slice(-8)}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusText(application.status)}
                      </span>
                      {application.priority_score > 0 && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          Prioridad: {application.priority_score}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Tarifa Propuesta:</span>
                        <span className="ml-1">${application.proposed_rate}</span>
                      </div>
                      <div>
                        <span className="font-medium">Tiempo Estimado:</span>
                        <span className="ml-1">{application.proposed_timeline} días</span>
                      </div>
                      <div>
                        <span className="font-medium">Fecha:</span>
                        <span className="ml-1">{new Date(application.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {application.cover_letter && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {application.cover_letter}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {showDetails && (
                    <div className="ml-4">
                      <svg 
                        className="w-5 h-5 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paginación */}
        {pagination && pagination.totalItems > filters.limit && (
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Mostrando {((filters.page - 1) * filters.limit) + 1} a {Math.min(filters.page * filters.limit, pagination.totalItems)} de {pagination.totalItems} aplicaciones
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page <= 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Anterior
              </button>
              
              <span className="px-3 py-1 text-sm">
                Página {filters.page} de {Math.ceil(pagination.totalItems / filters.limit)}
              </span>
              
              <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page >= Math.ceil(pagination.totalItems / filters.limit)}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowDetailModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <ApplicationDetails
                application={selectedApplication}
                onUpdate={handleApplicationUpdate}
                onClose={() => setShowDetailModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {loading && applications.length > 0 && (
        <div className="text-center py-4">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ApplicationsList;
