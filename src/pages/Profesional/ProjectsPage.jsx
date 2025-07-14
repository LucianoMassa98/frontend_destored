// pages/Profesional/ProjectsPage.jsx
import React, { useState } from 'react';
import { useAvailableProjects } from '../../hooks/useProjects';
import { useAuth } from '../../utils/AuthContext';
import ProjectCard from '../../components/ProjectCard';
import ProjectFilters from '../../components/ProjectFilters';
import ApplicationForm from '../../components/ApplicationForm';
import Loader from '../../components/Loader';
import Notification from '../../components/Notification';

const ProjectsPage = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    sortBy: 'created_at',
    sortOrder: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { projects, loading, error, pagination, refetch } = useAvailableProjects(currentPage, 10);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    // Note: You might need to implement filtering logic in the hook
  };

  const handleApplyToProject = (project) => {
    setSelectedProject(project);
    setShowApplicationForm(true);
  };

  const handleApplicationSuccess = (response) => {
    setNotification({
      type: 'success',
      message: 'Aplicación enviada exitosamente'
    });
    setShowApplicationForm(false);
    setSelectedProject(null);
    refetch();
  };

  const handleCloseApplicationForm = () => {
    setShowApplicationForm(false);
    setSelectedProject(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {showApplicationForm && selectedProject ? (
        <ApplicationForm
          project={selectedProject}
          onSuccess={handleApplicationSuccess}
          onCancel={handleCloseApplicationForm}
        />
      ) : (
        <>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Proyectos Disponibles</h1>
            <p className="text-gray-600 mt-2">
              Encuentra proyectos que coincidan con tus habilidades y experiencia
            </p>
          </div>

          {/* Filters */}
          <ProjectFilters
            onFiltersChange={handleFiltersChange}
            userRole={user.role}
          />

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
            <>
              <div className="mb-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {pagination ? (
                    <>
                      Mostrando {((currentPage - 1) * pagination.itemsPerPage) + 1} - {Math.min(currentPage * pagination.itemsPerPage, pagination.totalItems)} de {pagination.totalItems} proyectos
                    </>
                  ) : (
                    `${projects.length} proyectos encontrados`
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {projects.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      No hay proyectos disponibles
                    </h3>
                    <p className="text-gray-600 mb-4">
                      No se encontraron proyectos que coincidan con los filtros seleccionados.
                    </p>
                    <button
                      onClick={() => handleFiltersChange({ sortBy: 'created_at', sortOrder: 'desc' })}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Limpiar Filtros
                    </button>
                  </div>
                ) : (
                  projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onApply={handleApplyToProject}
                      showActions={true}
                    />
                  ))
                )}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>

                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm border rounded-md ${
                          page === currentPage
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
