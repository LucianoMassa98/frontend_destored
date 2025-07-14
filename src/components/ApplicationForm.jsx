// components/ApplicationForm.jsx
import React, { useState } from 'react';
import { useApplyToProject } from '../hooks/useProjects';

const ApplicationForm = ({ project, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    cover_letter: '',
    proposed_rate: '',
    proposed_timeline: '',
    availability_start: ''
  });

  const { applyToProject, loading, error } = useApplyToProject();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const applicationData = {
        ...formData,
        proposed_rate: parseFloat(formData.proposed_rate) || 0,
        proposed_timeline: parseInt(formData.proposed_timeline) || 0
      };

      const response = await applyToProject(project.id, applicationData);
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      console.error('Error al aplicar al proyecto:', error);
    }
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Aplicar al Proyecto
      </h2>

      {/* Información del proyecto */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-700 mb-2">{project.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Presupuesto:</span>
            <div>{formatBudget(project.budget_type, project.budget_min, project.budget_max)}</div>
          </div>
          <div>
            <span className="font-medium">Categoría:</span>
            <div>{getCategoryLabel(project.category)}</div>
          </div>
          <div>
            <span className="font-medium">Fecha límite:</span>
            <div>{new Date(project.deadline).toLocaleDateString('es-ES')}</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Carta de presentación */}
        <div>
          <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700 mb-2">
            Carta de Presentación *
          </label>
          <textarea
            id="cover_letter"
            name="cover_letter"
            value={formData.cover_letter}
            onChange={handleChange}
            required
            rows={6}
            minLength={50}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Explica por qué eres el candidato ideal para este proyecto, tu experiencia relevante y cómo planeas abordar el trabajo..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Mínimo 50 caracteres. Actual: {formData.cover_letter.length}
          </p>
        </div>

        {/* Tarifa propuesta */}
        <div>
          <label htmlFor="proposed_rate" className="block text-sm font-medium text-gray-700 mb-2">
            Tarifa Propuesta ($) *
          </label>
          <input
            type="number"
            id="proposed_rate"
            name="proposed_rate"
            value={formData.proposed_rate}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tu tarifa para este proyecto"
          />
          <p className="text-sm text-gray-500 mt-1">
            Presupuesto del cliente: {formatBudget(project.budget_type, project.budget_min, project.budget_max)}
          </p>
        </div>

        {/* Tiempo estimado */}
        <div>
          <label htmlFor="proposed_timeline" className="block text-sm font-medium text-gray-700 mb-2">
            Tiempo Estimado (días) *
          </label>
          <input
            type="number"
            id="proposed_timeline"
            name="proposed_timeline"
            value={formData.proposed_timeline}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Número de días para completar el proyecto"
          />
        </div>

        {/* Fecha de inicio disponible */}
        <div>
          <label htmlFor="availability_start" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Inicio Disponible *
          </label>
          <input
            type="date"
            id="availability_start"
            name="availability_start"
            value={formData.availability_start}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={loading || formData.cover_letter.length < 50}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando Aplicación...' : 'Enviar Aplicación'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
