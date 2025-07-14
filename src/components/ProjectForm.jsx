// components/ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import { useCreateProject, useUpdateProject } from '../hooks/useProjects';

const ProjectForm = ({ project = null, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget_type: 'fixed',
    budget_min: '',
    budget_max: '',
    deadline: '',
    required_skills: [],
    remote_work: false,
    priority: 'medium',
    experience_level: 'mid',
    visibility: 'public'
  });

  const [skillInput, setSkillInput] = useState('');
  const [error, setError] = useState(null);
  const { createProject, loading: createLoading } = useCreateProject();
  const { updateProject, loading: updateLoading } = useUpdateProject();

  const loading = createLoading || updateLoading;
  const isEditing = !!project;

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        category: project.category || '',
        budget_type: project.budget_type || 'fixed',
        budget_min: project.budget_min || '',
        budget_max: project.budget_max || '',
        deadline: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : '',
        required_skills: project.required_skills || [],
        remote_work: project.remote_work || false,
        priority: project.priority || 'medium',
        experience_level: project.experience_level || 'mid',
        visibility: project.visibility || 'public'
      });
    }
  }, [project]);

  const categories = [
    { value: 'web_development', label: 'Desarrollo Web' },
    { value: 'mobile_development', label: 'Desarrollo Móvil' },
    { value: 'desktop_development', label: 'Desarrollo de Escritorio' },
    { value: 'ui_ux_design', label: 'Diseño UI/UX' },
    { value: 'graphic_design', label: 'Diseño Gráfico' },
    { value: 'data_science', label: 'Ciencia de Datos' },
    { value: 'machine_learning', label: 'Machine Learning' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'devops', label: 'DevOps' },
    { value: 'cybersecurity', label: 'Ciberseguridad' },
    { value: 'quality_assurance', label: 'Control de Calidad' },
    { value: 'project_management', label: 'Gestión de Proyectos' },
    { value: 'digital_marketing', label: 'Marketing Digital' },
    { value: 'content_creation', label: 'Creación de Contenido' },
    { value: 'other', label: 'Otro' }
  ];

  const budgetTypes = [
    { value: 'fixed', label: 'Precio Fijo' },
    { value: 'hourly', label: 'Por Hora' }
  ];

  const priorities = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' },
    { value: 'urgent', label: 'Urgente' }
  ];

  const experienceLevels = [
    { value: 'junior', label: 'Junior' },
    { value: 'mid', label: 'Intermedio' },
    { value: 'senior', label: 'Senior' },
    { value: 'expert', label: 'Experto' }
  ];

  const visibilityOptions = [
    { value: 'public', label: 'Público' },
    { value: 'private', label: 'Privado' },
    { value: 'invite_only', label: 'Solo por Invitación' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !formData.required_skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        required_skills: [...prev.required_skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      required_skills: prev.required_skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validaciones adicionales
    if (formData.title.length < 5 || formData.title.length > 200) {
      setError('El título debe tener entre 5 y 200 caracteres');
      return;
    }
    
    if (formData.description.length < 50 || formData.description.length > 2000) {
      setError('La descripción debe tener entre 50 y 2000 caracteres');
      return;
    }
    
    if (!formData.budget_min || parseFloat(formData.budget_min) <= 0) {
      setError('El presupuesto debe ser mayor a 0');
      return;
    }
    
    try {
      const projectData = {
        ...formData,
        budget_min: parseFloat(formData.budget_min) || 0,
        budget_max: formData.budget_type === 'hourly' && formData.budget_max ? 
          parseFloat(formData.budget_max) : 
          parseFloat(formData.budget_min) || 0
      };

      let response;
      if (isEditing) {
        response = await updateProject(project.id, projectData);
      } else {
        response = await createProject(projectData);
      }

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      console.error('Error al guardar proyecto:', error);
      
      // Manejar errores específicos de validación
      if (error.message.includes('Validation len on description')) {
        setError('La descripción debe tener entre 50 y 2000 caracteres');
      } else if (error.message.includes('Validation len on title')) {
        setError('El título debe tener entre 5 y 200 caracteres');
      } else if (error.message.includes('validation')) {
        setError('Error de validación: ' + error.message);
      } else {
        setError(error.message || 'Error al guardar el proyecto');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditing ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Título del Proyecto *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            minLength={5}
            maxLength={200}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa el título del proyecto (5-200 caracteres)"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.title.length}/200 caracteres (mínimo 5)
          </p>
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Descripción *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            minLength={50}
            maxLength={2000}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe detalladamente el proyecto (mínimo 50 caracteres)"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.description.length}/2000 caracteres (mínimo 50)
          </p>
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Categoría *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>
        </div>

        {/* Presupuesto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Presupuesto *
          </label>
          <div className="flex gap-4 mb-4">
            {budgetTypes.map(type => (
              <label key={type.value} className="flex items-center">
                <input
                  type="radio"
                  name="budget_type"
                  value={type.value}
                  checked={formData.budget_type === type.value}
                  onChange={handleChange}
                  className="mr-2"
                />
                {type.label}
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="budget_min" className="block text-sm font-medium text-gray-700 mb-2">
                {formData.budget_type === 'fixed' ? 'Precio ($)' : 'Tarifa por Hora ($)'}
              </label>
              <input
                type="number"
                id="budget_min"
                name="budget_min"
                value={formData.budget_min}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {formData.budget_type === 'hourly' && (
              <div>
                <label htmlFor="budget_max" className="block text-sm font-medium text-gray-700 mb-2">
                  Horas Estimadas
                </label>
                <input
                  type="number"
                  id="budget_max"
                  name="budget_max"
                  value={formData.budget_max}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  placeholder="Ej: 40"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Fecha límite */}
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha Límite *
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Prioridad */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
            Prioridad *
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {priorities.map(priority => (
              <option key={priority.value} value={priority.value}>{priority.label}</option>
            ))}
          </select>
        </div>

        {/* Nivel de Experiencia */}
        <div>
          <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700 mb-2">
            Nivel de Experiencia Requerido *
          </label>
          <select
            id="experience_level"
            name="experience_level"
            value={formData.experience_level}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {experienceLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>

        {/* Visibilidad */}
        <div>
          <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-2">
            Visibilidad del Proyecto *
          </label>
          <select
            id="visibility"
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {visibilityOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Habilidades requeridas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Habilidades Requeridas
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(e)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Agregar habilidad"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Agregar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.required_skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Trabajo remoto */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remote_work"
              checked={formData.remote_work}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              Permite trabajo remoto
            </span>
          </label>
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : (isEditing ? 'Actualizar Proyecto' : 'Crear Proyecto')}
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

export default ProjectForm;
