// components/ProjectCard.jsx
import React from 'react';
import { useAuth } from '../utils/AuthContext';

const ProjectCard = ({ project, onApply, onView, onEdit, showActions = true }) => {
  const { user } = useAuth();

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

  const getPriorityColor = (priority) => {
    const priorityColors = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-blue-100 text-blue-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return priorityColors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityLabel = (priority) => {
    const priorityLabels = {
      'low': 'Baja',
      'medium': 'Media',
      'high': 'Alta',
      'urgent': 'Urgente'
    };
    return priorityLabels[priority] || priority;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'open': 'bg-green-100 text-green-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800',
      'paused': 'bg-yellow-100 text-yellow-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      'open': 'Abierto',
      'in_progress': 'En Progreso',
      'completed': 'Completado',
      'cancelled': 'Cancelado',
      'paused': 'Pausado'
    };
    return statusTexts[status] || status;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 card-hover">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
              {getStatusText(project.status)}
            </span>
            {project.priority && (
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(project.priority)}`}>
                {getPriorityLabel(project.priority)}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-green-600">
            {formatBudget(project.budget_type, project.budget_min, project.budget_max)}
          </div>
          <div className="text-sm text-gray-500">
            {getCategoryLabel(project.category)}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Skills */}
      {project.required_skills && project.required_skills.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Habilidades requeridas:</h4>
          <div className="flex flex-wrap gap-2">
            {project.required_skills.map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Project Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Fecha límite:</span>
          <div>{formatDate(project.deadline)}</div>
        </div>
        <div>
          <span className="font-medium">Trabajo remoto:</span>
          <div>{project.remote_work ? 'Sí' : 'No'}</div>
        </div>
        <div>
          <span className="font-medium">Aplicaciones:</span>
          <div>{project.applications_count || 0}</div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2 pt-4 border-t border-gray-200">
          {onView && (
            <button
              onClick={() => onView(project)}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Ver Detalles
            </button>
          )}
          
          {isUserRole('professional') && onApply && project.status === 'open' && (
            <button
              onClick={() => onApply(project)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Aplicar
            </button>
          )}
          
          {isUserRole('client') && onEdit && project.client_id === user.id && (
            <button
              onClick={() => onEdit(project)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Editar
            </button>
          )}
        </div>
      )}

      {/* Client info for professionals */}
      {isUserRole('professional') && project.client && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Cliente:</span> {project.client.name || project.client.email}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
