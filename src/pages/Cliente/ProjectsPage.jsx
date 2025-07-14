// pages/Cliente/ProjectsPage.jsx
import React, { useState } from 'react';
import { useMyProjects } from '../../hooks/useProjects';
import { useAuth } from '../../utils/AuthContext';
import ProjectCard from '../../components/ProjectCard';
import ProjectForm from '../../components/ProjectForm';
import ProjectDetails from '../../components/ProjectDetails';
import Loader from '../../components/Loader';
import Notification from '../../components/Notification';

const ProjectsPage = () => {
  const { user } = useAuth();
  const { projects, loading, error, refetch } = useMyProjects();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'open', label: 'Abierto' },
    { value: 'in_progress', label: 'En Progreso' },
    { value: 'completed', label: 'Completado' },
    { value: 'cancelled', label: 'Cancelado' },
    { value: 'paused', label: 'Pausado' }
  ];

  const handleCreateSuccess = (response) => {
    setNotification({
      type: 'success',
      message: 'Proyecto creado exitosamente'
    });
    setShowCreateForm(false);
    refetch();
  };

  const handleUpdateSuccess = (response) => {
    setNotification({
      type: 'success',
      message: 'Proyecto actualizado exitosamente'
    });
    setEditingProject(null);
    refetch();
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setEditingProject(null);
  };

  const handleViewProject = (project) => {
    setSelectedProjectId(project.id);
  };

  const handleCloseDetails = () => {
    setSelectedProjectId(null);
  };

  const filteredProjects = statusFilter 
    ? projects.filter(project => project.status === statusFilter)
    : projects;

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {(showCreateForm || editingProject) ? (
        <ProjectForm
          project={editingProject}
          onSuccess={editingProject ? handleUpdateSuccess : handleCreateSuccess}
          onCancel={handleCloseForm}
        />
      ) : (
        <>
          {/* Project Details Modal */}
          {selectedProjectId && (
            <ProjectDetails
              projectId={selectedProjectId}
              onClose={handleCloseDetails}
            />
          )}

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mis Proyectos</h1>
              <p className="text-gray-600 mt-2">
                Gestiona tus proyectos y revisa las aplicaciones recibidas
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Crear Nuevo Proyecto
            </button>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Filtrar por estado:
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="ml-auto text-sm text-gray-600">
                {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && <Loader />}

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Projects List */}
          {!loading && !error && (
            <div className="space-y-6">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {statusFilter ? 'No hay proyectos con este estado' : 'No tienes proyectos aún'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {statusFilter ? 
                      'Prueba con un filtro diferente para ver otros proyectos.' :
                      'Crea tu primer proyecto para encontrar profesionales talentosos.'
                    }
                  </p>
                  {!statusFilter && (
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Crear Mi Primer Proyecto
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="relative">
                      <ProjectCard
                        project={project}
                        onEdit={setEditingProject}
                        onView={handleViewProject}
                        showActions={true}
                      />
                      
                     
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
