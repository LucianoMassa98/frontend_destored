// services/projectService.js
import authService from './authService';




const mode = import.meta.env.VITE_MODE;

// Configuración de la URL base según el modo
let baseURL;

if (mode === 'development') {
  console.log('Modo de desarrollo: usando API_URL:', import.meta.env.VITE_DEV_API_URL);
  baseURL = import.meta.env.VITE_DEV_API_URL;
} else if (mode === 'test') {
  console.log('Modo de prueba: usando API_URL:', import.meta.env.VITE_TEST_API_URL);
  baseURL = import.meta.env.VITE_TEST_API_URL;
} else {
  console.log('Modo de producción: usando API_URL:', import.meta.env.VITE_PROD_API_URL);
  baseURL = import.meta.env.VITE_PROD_API_URL;
}

// Definición de API_BASE_URL con el path completo
const API_BASE_URL = `${baseURL}/api/v1`;

class ProjectService {
  async getProjects(params = {}) {
    const queryParams = new URLSearchParams();
    
    // Agregar parámetros de consulta
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.category) queryParams.append('category', params.category);
    if (params.status) queryParams.append('status', params.status);
    if (params.budget_min) queryParams.append('budget_min', params.budget_min);
    if (params.budget_max) queryParams.append('budget_max', params.budget_max);
    if (params.remote_work !== undefined) queryParams.append('remote_work', params.remote_work);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = `${API_BASE_URL}/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener proyectos');
    }

    return response.json();
  }

  async getMyProjects(status = null) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('Token requerido');
    }

    const queryParams = new URLSearchParams();
    if (status) queryParams.append('status', status);

    const url = `${API_BASE_URL}/projects/my-projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener mis proyectos');
    }

    return response.json();
  }

  async getAvailableProjects(page = 1, limit = 10) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('Token requerido');
    }

    const url = `${API_BASE_URL}/projects/available?page=${page}&limit=${limit}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener proyectos disponibles');
    }

    return response.json();
  }

  async getProject(projectId) {
    const url = `${API_BASE_URL}/projects/${projectId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener el proyecto');
    }

    return response.json();
  }

  async createProject(projectData) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('Token requerido');
    }

    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear el proyecto');
    }

    return response.json();
  }

  async updateProject(projectId, updateData) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('Token requerido');
    }

    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar el proyecto');
    }

    return response.json();
  }

  async applyToProject(projectId, applicationData) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('Token requerido');
    }

    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al aplicar al proyecto');
    }

    return response.json();
  }

  async getProjectApplications(projectId) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error('Token requerido');
    }

    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/applications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener las aplicaciones del proyecto');
    }

    return response.json();
  }
}

export default new ProjectService();
