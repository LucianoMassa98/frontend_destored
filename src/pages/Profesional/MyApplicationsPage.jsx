// pages/Profesional/MyApplicationsPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { useMyApplications } from '../../hooks/useApplications';
import Loader from '../../components/Loader';
import Notification from '../../components/Notification';

const MyApplicationsPage = () => {
  const { user } = useAuth();
  const [notification, setNotification] = useState(null);
  
  console.log('👤 MyApplicationsPage - User:', user);
  
  // Usar el hook personalizado para obtener las aplicaciones del profesional
  const { applications, loading, error, pagination, meta, refetch } = useMyApplications(user?.id);

  console.log('🔍 MyApplicationsPage - Applications:', applications);
  console.log('📊 MyApplicationsPage - Pagination:', pagination);
  console.log('📈 MyApplicationsPage - Meta:', meta);

  // Filtrar aplicaciones por estado para las estadísticas locales
  const getApplicationsByStatus = (status) => {
    return applications.filter(app => app.status === status).length;
  };

  // Usar estadísticas del meta si están disponibles, sino calcular localmente
  const getStatsValue = (status) => {
    if (meta?.status_summary && meta.status_summary[status] !== undefined) {
      return meta.status_summary[status];
    }
    return getApplicationsByStatus(status);
  };

  const totalApplications = meta?.total_applications || applications.length;

  // Calcular estadísticas adicionales
  const successRate = totalApplications > 0 
    ? (getStatsValue('accepted') / totalApplications) * 100 
    : 0;

  const activeApplications = getStatsValue('pending') + getStatsValue('under_review');
  
  // Calcular tendencias (para mostrar si está mejorando o empeorando)
  const calculateTrend = (current, target) => {
    if (target === 0) return 0;
    return ((current - target) / target) * 100;
  };

  // Funciones auxiliares para el estado
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

  // Estadísticas principales para las tarjetas
  const mainStatsData = [
    {
      label: 'Total de Aplicaciones',
      value: totalApplications,
      color: 'bg-blue-100 text-blue-800',
      bgColor: 'bg-blue-50',
      icon: '📄',
      trend: null
    },
    {
      label: 'Aplicaciones Activas',
      value: activeApplications,
      color: 'bg-purple-100 text-purple-800',
      bgColor: 'bg-purple-50',
      icon: '⚡',
      description: 'Pendientes + En Revisión'
    },
    {
      label: 'Tasa de Éxito',
      value: `${successRate.toFixed(1)}%`,
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50',
      icon: '🎯',
      description: 'Aplicaciones Aceptadas'
    },
    {
      label: 'Tiempo Promedio',
      value: meta?.avg_response_time_hours ? `${meta.avg_response_time_hours}h` : 'N/A',
      color: 'bg-orange-100 text-orange-800',
      bgColor: 'bg-orange-50',
      icon: '⏱️',
      description: 'Respuesta del Cliente'
    }
  ];

  // Estadísticas detalladas por estado
  const statusStatsData = [
    {
      label: 'Pendientes',
      value: getStatsValue('pending'),
      color: 'bg-yellow-100 text-yellow-800',
      icon: '⏳',
      percentage: totalApplications > 0 ? (getStatsValue('pending') / totalApplications * 100).toFixed(1) : 0
    },
    {
      label: 'En Revisión',
      value: getStatsValue('under_review'),
      color: 'bg-blue-100 text-blue-800',
      icon: '👀',
      percentage: totalApplications > 0 ? (getStatsValue('under_review') / totalApplications * 100).toFixed(1) : 0
    },
    {
      label: 'Aceptadas',
      value: getStatsValue('accepted'),
      color: 'bg-green-100 text-green-800',
      icon: '✅',
      percentage: totalApplications > 0 ? (getStatsValue('accepted') / totalApplications * 100).toFixed(1) : 0
    },
    {
      label: 'Rechazadas',
      value: getStatsValue('rejected'),
      color: 'bg-red-100 text-red-800',
      icon: '❌',
      percentage: totalApplications > 0 ? (getStatsValue('rejected') / totalApplications * 100).toFixed(1) : 0
    },
    {
      label: 'Retiradas',
      value: getStatsValue('withdrawn'),
      color: 'bg-gray-100 text-gray-800',
      icon: '↩️',
      percentage: totalApplications > 0 ? (getStatsValue('withdrawn') / totalApplications * 100).toFixed(1) : 0
    },
    {
      label: 'Expiradas',
      value: getStatsValue('expired'),
      color: 'bg-red-100 text-red-800',
      icon: '⌛',
      percentage: totalApplications > 0 ? (getStatsValue('expired') / totalApplications * 100).toFixed(1) : 0
    }
  ];

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Aplicaciones</h1>
            <p className="text-gray-600">
              Gestiona y revisa todas tus aplicaciones a proyectos
            </p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span>🔄</span>
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
        </div>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mainStatsData.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-200`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
              {stat.trend && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.trend > 0 ? '↗️' : '↘️'} {Math.abs(stat.trend).toFixed(1)}%
                </span>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-gray-700">{stat.label}</p>
              {stat.description && (
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard de Estados Detallado */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Distribución por Estado</h3>
          <div className="text-sm text-gray-500">
            {totalApplications} aplicaciones totales
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statusStatsData.map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color} mb-3`}>
                <span className="text-lg">{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm font-medium text-gray-700 mb-1">{stat.label}</p>
              <p className="text-xs text-gray-500">{stat.percentage}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas de Rendimiento */}
      {meta && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Métricas de Rendimiento</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-3xl font-bold text-blue-600 mb-1">
                  {meta.success_rate ? `${(meta.success_rate * 100).toFixed(1)}%` : `${successRate.toFixed(1)}%`}
                </p>
                <p className="text-sm font-medium text-gray-700">Tasa de Éxito</p>
                <p className="text-xs text-gray-500 mt-1">
                  {getStatsValue('accepted')} de {totalApplications} aplicaciones
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-3xl font-bold text-green-600 mb-1">
                  {meta.avg_response_time_hours ? `${meta.avg_response_time_hours}h` : 'N/A'}
                </p>
                <p className="text-sm font-medium text-gray-700">Tiempo Promedio</p>
                <p className="text-xs text-gray-500 mt-1">Respuesta del cliente</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-3xl font-bold text-purple-600 mb-1">
                  {activeApplications}
                </p>
                <p className="text-sm font-medium text-gray-700">Activas</p>
                <p className="text-xs text-gray-500 mt-1">Pendientes + En revisión</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de aplicaciones */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">
                📋 Mis Aplicaciones
              </h3>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {totalApplications}
              </span>
            </div>
            {pagination && pagination.total_pages > 1 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📄</span>
                <span>Página {pagination.current_page} de {pagination.total_pages}</span>
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <Loader />
            <p className="text-gray-500 mt-2">Cargando aplicaciones...</p>
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-50 border border-red-200 text-red-600 m-4 rounded-lg">
            <div className="flex items-center gap-2">
              <span>❌</span>
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {applications.length === 0 && !loading && !error ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Aún no tienes aplicaciones!</h3>
            <p className="text-gray-500 mb-4">
              Comienza aplicando a proyectos que coincidan con tus habilidades.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Ver Proyectos Disponibles
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {applications.map((application, index) => (
              <div
                key={application.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {application.project?.title || `Proyecto #${application.project_id?.slice(-8) || 'Unknown'}`}
                        </h4>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusText(application.status)}
                      </span>
                      {application.priority_score && application.priority_score > 0 && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          ⭐ {application.priority_score}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <span className="text-green-600">💰</span>
                        <div>
                          <span className="font-medium text-gray-700">Tarifa Propuesta:</span>
                          <p className="text-gray-900 font-semibold">
                            {application.proposed_rate ? `$${application.proposed_rate}` : 'No especificada'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <span className="text-blue-600">⏰</span>
                        <div>
                          <span className="font-medium text-gray-700">Tiempo Estimado:</span>
                          <p className="text-gray-900 font-semibold">
                            {application.proposed_timeline ? `${application.proposed_timeline} días` : 'No especificado'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <span className="text-purple-600">📅</span>
                        <div>
                          <span className="font-medium text-gray-700">Fecha de Aplicación:</span>
                          <p className="text-gray-900 font-semibold">
                            {application.created_at ? new Date(application.created_at).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {application.project && (
                      <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600">🎯</span>
                            <h5 className="text-sm font-semibold text-gray-900">
                              Detalles del Proyecto
                            </h5>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            application.project.status === 'open' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {application.project.status === 'open' ? '🟢 Abierto' : application.project.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Proyecto:</span>
                            <p className="text-gray-900">{application.project.title}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Categoría:</span>
                            <p className="text-gray-900">{application.project.category || 'No especificada'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Presupuesto:</span>
                            <p className="text-gray-900">
                              {application.project.budget_min && application.project.budget_max 
                                ? `$${application.project.budget_min} - $${application.project.budget_max}`
                                : 'No especificado'}
                            </p>
                          </div>
                          {application.project.client && (
                            <div>
                              <span className="font-medium text-gray-700">Cliente:</span>
                              <p className="text-gray-900">
                                {application.project.client.first_name} {application.project.client.last_name}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {application.cover_letter && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-indigo-600">📝</span>
                          <h6 className="text-sm font-semibold text-gray-900">Carta de Presentación</h6>
                        </div>
                        <div className="bg-gray-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
                          <p className="text-sm text-gray-700 italic">
                            "{application.cover_letter}"
                          </p>
                        </div>
                      </div>
                    )}

                    {application.availability_start && (
                      <div className="mb-4 flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <span className="text-yellow-600">📅</span>
                        <div>
                          <span className="font-medium text-gray-700">Disponibilidad desde:</span>
                          <span className="ml-2 font-semibold text-gray-900">
                            {new Date(application.availability_start).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Información de evaluación si está disponible */}
                    {application.evaluation && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-blue-600">⭐</span>
                          <h6 className="text-sm font-semibold text-blue-900">Evaluación Recibida</h6>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-blue-800">Rating:</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(application.evaluation.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                                  ⭐
                                </span>
                              ))}
                              <span className="text-sm font-semibold text-blue-900 ml-1">
                                ({application.evaluation.rating}/5)
                              </span>
                            </div>
                          </div>
                          {application.evaluation.feedback && (
                            <div className="bg-white p-3 rounded border border-blue-100">
                              <p className="text-sm text-blue-800 italic">
                                "{application.evaluation.feedback}"
                              </p>
                            </div>
                          )}
                          {application.evaluation.evaluated_at && (
                            <p className="text-xs text-blue-600">
                              📅 Evaluado el {new Date(application.evaluation.evaluated_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Información de decisión si está disponible */}
                    {application.decision && (
                      <div className={`mb-4 p-4 rounded-lg border ${
                        application.status === 'accepted' 
                          ? 'bg-green-50 border-green-200' 
                          : application.status === 'rejected'
                          ? 'bg-red-50 border-red-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={
                            application.status === 'accepted' 
                              ? 'text-green-600' 
                              : application.status === 'rejected'
                              ? 'text-red-600'
                              : 'text-gray-600'
                          }>
                            {application.status === 'accepted' ? '✅' : application.status === 'rejected' ? '❌' : '📋'}
                          </span>
                          <h6 className={`text-sm font-semibold ${
                            application.status === 'accepted' 
                              ? 'text-green-900' 
                              : application.status === 'rejected'
                              ? 'text-red-900'
                              : 'text-gray-900'
                          }`}>
                            Decisión Final
                          </h6>
                        </div>
                        <div className={`bg-white p-3 rounded border ${
                          application.status === 'accepted' 
                            ? 'border-green-100' 
                            : application.status === 'rejected'
                            ? 'border-red-100'
                            : 'border-gray-100'
                        }`}>
                          <p className={`text-sm ${
                            application.status === 'accepted' 
                              ? 'text-green-800' 
                              : application.status === 'rejected'
                              ? 'text-red-800'
                              : 'text-gray-800'
                          }`}>
                            {application.decision.reason}
                          </p>
                        </div>
                        {application.decision.decided_at && (
                          <p className={`text-xs mt-2 ${
                            application.status === 'accepted' 
                              ? 'text-green-600' 
                              : application.status === 'rejected'
                              ? 'text-red-600'
                              : 'text-gray-600'
                          }`}>
                            📅 Decidido el {new Date(application.decision.decided_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplicationsPage;
