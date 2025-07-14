// components/ApplicationsStats.jsx
import React from 'react';
import { useApplicationStats } from '../hooks/useApplications';
import Loader from './Loader';

const ApplicationsStats = () => {
  const { stats, loading, error } = useApplicationStats();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Estadísticas de Aplicaciones</h3>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Estadísticas de Aplicaciones</h3>
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Estadísticas de Aplicaciones</h3>
        <div className="text-gray-500">No hay datos disponibles</div>
      </div>
    );
  }

  const statusStats = [
    {
      label: 'Pendientes',
      value: stats.by_status?.pending || 0,
      color: 'bg-yellow-100 text-yellow-800',
      icon: '⏳'
    },
    {
      label: 'En Revisión',
      value: stats.by_status?.under_review || 0,
      color: 'bg-blue-100 text-blue-800',
      icon: '👀'
    },
    {
      label: 'Aceptadas',
      value: stats.by_status?.accepted || 0,
      color: 'bg-green-100 text-green-800',
      icon: '✅'
    },
    {
      label: 'Rechazadas',
      value: stats.by_status?.rejected || 0,
      color: 'bg-red-100 text-red-800',
      icon: '❌'
    },
    {
      label: 'Retiradas',
      value: stats.by_status?.withdrawn || 0,
      color: 'bg-gray-100 text-gray-800',
      icon: '↩️'
    },
    {
      label: 'Expiradas',
      value: stats.by_status?.expired || 0,
      color: 'bg-red-100 text-red-800',
      icon: '⏰'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6">Estadísticas de Aplicaciones</h3>
      
      {/* Estadística principal */}
      <div className="text-center mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
        <div className="text-sm text-blue-800">Total de Aplicaciones</div>
      </div>

      {/* Estadísticas por estado */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {statusStats.map((stat, index) => (
          <div key={index} className="text-center p-3 border border-gray-200 rounded-lg">
            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${stat.color} mb-2`}>
              <span className="text-sm">{stat.icon}</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tiempo promedio de respuesta */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Tiempo Promedio de Respuesta</span>
          <span className="text-lg font-semibold text-green-600">
            {stats.avg_response_time_hours ? `${stats.avg_response_time_hours}h` : 'N/A'}
          </span>
        </div>
        {stats.avg_response_time_hours && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ 
                  width: `${Math.min((stats.avg_response_time_hours / 72) * 100, 100)}%` 
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0h</span>
              <span>72h</span>
            </div>
          </div>
        )}
      </div>

      {/* Indicadores de rendimiento */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Indicadores de Rendimiento</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Tasa de Aceptación</span>
            <span className="text-sm font-medium">
              {stats.total > 0 
                ? `${Math.round(((stats.by_status?.accepted || 0) / stats.total) * 100)}%`
                : '0%'
              }
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Tasa de Rechazo</span>
            <span className="text-sm font-medium">
              {stats.total > 0 
                ? `${Math.round(((stats.by_status?.rejected || 0) / stats.total) * 100)}%`
                : '0%'
              }
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Aplicaciones Activas</span>
            <span className="text-sm font-medium">
              {(stats.by_status?.pending || 0) + (stats.by_status?.under_review || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsStats;
