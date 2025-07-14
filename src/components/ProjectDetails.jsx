// components/ProjectDetails.jsx
import React, { useState } from 'react';
import { useProject, useProjectApplications } from '../hooks/useProjects';
import { useAuth } from '../utils/AuthContext';
import Loader from './Loader';

const ProjectDetails = ({ projectId, onClose }) => {
  const { user } = useAuth();
  const { project, loading: projectLoading, error: projectError } = useProject(projectId);
  const { applications, loading: applicationsLoading, error: applicationsError } = useProjectApplications(projectId);

  // Helper function para normalizar roles
  const isUserRole = (expectedRole) => {
    if (!user?.role) return false;
    const userRole = user.role.toLowerCase();
    const expected = expectedRole.toLowerCase();
    
    // Mapeos de roles
    if (expected === 'professional') {
      return userRole === 'professional' || userRole === 'profesional';
    }
    if (expected === 'client') {
      return userRole === 'client' || userRole === 'cliente';
    }
    
    return userRole === expected;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const formatBudget = (budgetType, budgetMin, budgetMax) => {
    if (budgetType === 'fixed') {
      return `$${budgetMin} (Fijo)`;
    } else if (budgetType === 'hourly') {
      return budgetMax ? `$${budgetMin}/hora (${budgetMax}h estimadas)` : `$${budgetMin}/hora`;
    }
    return 'Por negociar';
  };

  const getCategoryLabel = (category) => {
    const categoryLabels = {
      'web_development': 'Desarrollo Web',
      'mobile_development': 'Desarrollo Móvil',
      'desktop_development': 'Desarrollo de Escritorio',
      'ui_ux_design': 'Diseño UI/UX',
      'graphic_design': 'Diseño Gráfico',
      'data_science': 'Ciencia de Datos',
      'machine_learning': 'Machine Learning',
      'blockchain': 'Blockchain',
      'devops': 'DevOps',
      'cybersecurity': 'Ciberseguridad',
      'quality_assurance': 'Control de Calidad',
      'project_management': 'Gestión de Proyectos',
      'digital_marketing': 'Marketing Digital',
      'content_creation': 'Creación de Contenido',
      'other': 'Otro'
    };
    return categoryLabels[category] || category;
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'accepted': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'withdrawn': 'bg-gray-100 text-gray-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      'pending': 'Pendiente',
      'accepted': 'Aceptada',
      'rejected': 'Rechazada',
      'withdrawn': 'Retirada'
    };
    return statusTexts[status] || status;
  };

  if (projectLoading) return <Loader />;

  if (projectError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {projectError}
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h2>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {getCategoryLabel(project.category)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Detalles del Proyecto</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Descripción:</span>
                  <p className="text-gray-600 mt-1">{project.description}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Presupuesto:</span>
                  <div className="text-gray-600">{formatBudget(project.budget_type, project.budget_min, project.budget_max)}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Fecha límite:</span>
                  <div className="text-gray-600">{formatDate(project.deadline)}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Trabajo remoto:</span>
                  <div className="text-gray-600">{project.remote_work ? 'Sí' : 'No'}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Habilidades Requeridas</h3>
              <div className="flex flex-wrap gap-2">
                {project.required_skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                )) || <span className="text-gray-500">No especificadas</span>}
              </div>
            </div>
          </div>

          {/* Applications Section - Only for project owner */}
          {isUserRole('client') && project.client_id === user.id && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Aplicaciones ({applications.length})
              </h3>

              {applicationsLoading && <Loader />}

              {applicationsError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {applicationsError}
                </div>
              )}

              {!applicationsLoading && !applicationsError && (
                <div className="space-y-4">
                  {applications.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-4xl mb-2">📝</div>
                      <p className="text-gray-600">No hay aplicaciones aún</p>
                    </div>
                  ) : (
                    applications.map((application) => (
                      <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                        {/* Application Header */}
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {application.professional?.name || application.professional?.email}
                            </h4>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                              {getStatusText(application.status)}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              ${application.proposed_rate}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.proposed_timeline} días
                            </div>
                          </div>
                        </div>

                        {/* Application Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Aplicado el:</span>
                            <div>{formatDate(application.created_at)}</div>
                          </div>
                          <div>
                            <span className="font-medium">Disponible desde:</span>
                            <div>{formatDate(application.availability_start)}</div>
                          </div>
                        </div>

                        {/* Cover Letter */}
                        <div className="mb-3">
                          <h5 className="font-medium text-gray-900 mb-1">Carta de presentación:</h5>
                          <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">
                            {application.cover_letter}
                          </p>
                        </div>

                        {/* Professional Info */}
                        {application.professional && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Profesional:</span> {application.professional.name || application.professional.email}
                            {application.professional.rating && (
                              <span className="ml-2">⭐ {application.professional.rating}/5</span>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        {application.status === 'pending' && (
                          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                              Aceptar
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                              Rechazar
                            </button>
                            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 text-sm">
                              Ver Perfil
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
