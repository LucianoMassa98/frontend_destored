// pages/Cliente/ProjectApplicationsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { useProjectApplications } from '../../hooks/useApplications';
import { useProject } from '../../hooks/useProjects';
import ApplicationsList from '../../components/ApplicationsList';
import Loader from '../../components/Loader';
import Notification from '../../components/Notification';

const ProjectApplicationsPage = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const [notification, setNotification] = useState(null);
  
  // Obtener información del proyecto
  const { project, loading: projectLoading, error: projectError } = useProject(projectId);
  
  // Obtener aplicaciones del proyecto
  const { applications, loading, error, refetch } = useProjectApplications(projectId);

  // Filtrar aplicaciones por estado para las estadísticas
  const getApplicationsByStatus = (status) => {
    return applications.filter(app => app.status === status).length;
  };

  const statsData = [
    {
      label: 'Total de Aplicaciones',
      value: applications.length,
      color: 'bg-blue-100 text-blue-800',
      icon: '📄'
    },
    {
      label: 'Pendientes',
      value: getApplicationsByStatus('pending'),
      color: 'bg-yellow-100 text-yellow-800',
      icon: '⏳'
    },
    {
      label: 'En Revisión',
      value: getApplicationsByStatus('under_review'),
      color: 'bg-blue-100 text-blue-800',
      icon: '👀'
    },
    {
      label: 'Aceptadas',
      value: getApplicationsByStatus('accepted'),
      color: 'bg-green-100 text-green-800',
      icon: '✅'
    }
  ];

  const handleApplicationUpdate = () => {
    refetch();
    setNotification({ type: 'success', message: 'Aplicación actualizada exitosamente' });
  };

  if (projectLoading) {
    return <Loader />;
  }

  if (projectError) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          Error al cargar el proyecto: {projectError}
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 px-4 py-3 rounded-md">
          Proyecto no encontrado
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

      {/* Información del proyecto */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-gray-600 mb-4">{project.description}</p>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'active' ? 'bg-green-100 text-green-800' :
              project.status === 'draft' ? 'bg-gray-100 text-gray-800' :
              project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {project.status === 'active' ? 'Activo' :
               project.status === 'draft' ? 'Borrador' :
               project.status === 'completed' ? 'Completado' :
               project.status}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Categoría:</span>
            <span className="ml-1">{project.category}</span>
          </div>
          <div>
            <span className="font-medium">Presupuesto:</span>
            <span className="ml-1">
              ${project.budget_min}
              {project.budget_type === 'range' && project.budget_max && ` - $${project.budget_max}`}
            </span>
          </div>
          <div>
            <span className="font-medium">Duración:</span>
            <span className="ml-1">{project.duration} días</span>
          </div>
          <div>
            <span className="font-medium">Fecha límite:</span>
            <span className="ml-1">
              {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Sin fecha límite'}
            </span>
          </div>
        </div>
      </div>

      {/* Estadísticas de aplicaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lista de aplicaciones */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Aplicaciones Recibidas</h2>
        <ApplicationsList
          projectId={projectId}
          showDetails={true}
        />
      </div>

      {/* Información adicional para el cliente */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Consejos para evaluar aplicaciones</h3>
        <ul className="list-disc list-inside text-blue-800 space-y-1">
          <li>Revisa cuidadosamente la experiencia y portfolio de cada profesional</li>
          <li>Considera tanto la tarifa propuesta como el tiempo de entrega</li>
          <li>Lee las cartas de presentación para entender el enfoque de cada profesional</li>
          <li>Puedes evaluar aplicaciones asignando una puntuación de prioridad</li>
          <li>Utiliza la función de comentarios para documentar tu proceso de decisión</li>
        </ul>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default ProjectApplicationsPage;
