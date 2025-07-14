// hooks/useProjects.js
import { useState, useEffect } from 'react';
import projectService from '../services/projectService';
import { useAuth } from '../utils/AuthContext';

export const useProjects = (filters = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectService.getProjects(filters);
      setProjects(response.data || []);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [JSON.stringify(filters)]);

  const refetch = () => {
    fetchProjects();
  };

  return {
    projects,
    loading,
    error,
    pagination,
    refetch
  };
};

export const useMyProjects = (status = null) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchMyProjects = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await projectService.getMyProjects(status);
      const projectsData = response.data || [];
      
      // Obtener el conteo de aplicaciones para cada proyecto
      const projectsWithApplicationCount = await Promise.all(
        projectsData.map(async (project) => {
          try {
            const applicationsResponse = await projectService.getProjectApplications(project.id);
            return {
              ...project,
              applications_count: applicationsResponse.data?.length || 0
            };
          } catch (err) {
            // Si falla la obtención de aplicaciones, mantener el proyecto sin conteo
            console.warn(`No se pudieron obtener aplicaciones para el proyecto ${project.id}:`, err.message);
            return {
              ...project,
              applications_count: 0
            };
          }
        })
      );
      
      setProjects(projectsWithApplicationCount);
    } catch (err) {
      setError(err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, [user, status]);

  const refetch = () => {
    fetchMyProjects();
  };

  return {
    projects,
    loading,
    error,
    refetch
  };
};

export const useAvailableProjects = (page = 1, limit = 10) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { user } = useAuth();

  const fetchAvailableProjects = async () => {
    if (!user) return;
    
    // Normalizar rol para comparación
    const userRole = user.role?.toLowerCase();
    const isProfessional = userRole === 'professional' || userRole === 'profesional';
    
    if (!isProfessional) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await projectService.getAvailableProjects(page, limit);
      setProjects(response.data || []);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableProjects();
  }, [user, page, limit]);

  const refetch = () => {
    fetchAvailableProjects();
  };

  return {
    projects,
    loading,
    error,
    pagination,
    refetch
  };
};

// Hook para obtener un proyecto específico
export const useProject = (projectId) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProject = async () => {
    if (!projectId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await projectService.getProject(projectId);
      setProject(response.data);
    } catch (err) {
      setError(err.message);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  return {
    project,
    loading,
    error,
    refetch: fetchProject
  };
};

// Hook para aplicar a un proyecto
export const useApplyToProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const applyToProject = async (projectId, applicationData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await projectService.applyToProject(projectId, applicationData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    applyToProject,
    loading,
    error,
    setError
  };
};

export const useProjectApplications = (projectId) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    if (!projectId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await projectService.getProjectApplications(projectId);
      setApplications(response.data || []);
    } catch (err) {
      setError(err.message);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [projectId]);

  const refetch = () => {
    fetchApplications();
  };

  return {
    applications,
    loading,
    error,
    refetch
  };
};

// Hook para crear un proyecto
export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProject = async (projectData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await projectService.createProject(projectData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProject,
    loading,
    error,
    setError
  };
};

// Hook para actualizar un proyecto
export const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProject = async (projectId, updateData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await projectService.updateProject(projectId, updateData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProject,
    loading,
    error,
    setError
  };
};
