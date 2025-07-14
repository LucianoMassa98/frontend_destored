// components/ProjectFilters.jsx
import React, { useState } from 'react';

const ProjectFilters = ({ onFiltersChange, userRole }) => {
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    budget_min: '',
    budget_max: '',
    remote_work: '',
    sortBy: 'created_at',
    sortOrder: 'desc'
  });

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

  const statusOptions = [
    { value: 'draft', label: 'Borrador' },
    { value: 'open', label: 'Abierto' },
    { value: 'in_review', label: 'En Revisión' },
    { value: 'in_progress', label: 'En Progreso' },
    { value: 'completed', label: 'Completado' },
    { value: 'cancelled', label: 'Cancelado' },
    { value: 'on_hold', label: 'En Espera' },
    { value: 'disputed', label: 'En Disputa' }
  ];

  const sortOptions = [
    { value: 'created_at', label: 'Fecha de Creación' },
    { value: 'deadline', label: 'Fecha Límite' },
    { value: 'budget_min', label: 'Presupuesto' },
    { value: 'title', label: 'Título' }
  ];

  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    
    // Filtrar valores vacíos antes de enviar
    const cleanFilters = Object.entries(newFilters).reduce((acc, [key, val]) => {
      if (val !== '' && val !== null && val !== undefined) {
        acc[key] = val;
      }
      return acc;
    }, {});
    
    onFiltersChange(cleanFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      status: '',
      budget_min: '',
      budget_max: '',
      remote_work: '',
      sortBy: 'created_at',
      sortOrder: 'desc'
    };
    setFilters(clearedFilters);
    onFiltersChange({ sortBy: 'created_at', sortOrder: 'desc' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Limpiar Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los estados</option>
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>

        {/* Presupuesto Mínimo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Presupuesto Mínimo ($)
          </label>
          <input
            type="number"
            value={filters.budget_min}
            onChange={(e) => handleFilterChange('budget_min', e.target.value)}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        {/* Presupuesto Máximo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Presupuesto Máximo ($)
          </label>
          <input
            type="number"
            value={filters.budget_max}
            onChange={(e) => handleFilterChange('budget_max', e.target.value)}
            min={filters.budget_min || "0"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Sin límite"
          />
        </div>

        {/* Trabajo Remoto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trabajo Remoto
          </label>
          <select
            value={filters.remote_work}
            onChange={(e) => handleFilterChange('remote_work', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Cualquiera</option>
            <option value="true">Solo remoto</option>
            <option value="false">Solo presencial</option>
          </select>
        </div>

        {/* Ordenar por */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ordenar por
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Orden */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Orden
          </label>
          <select
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;
