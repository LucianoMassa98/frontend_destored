// services/applicationService.js

const mode = import.meta.env.VITE_MODE || 'development';

// Configuración de la URL base según el modo
var API_URL;
if(mode === 'development') {
  API_URL = import.meta.env.VITE_DEV_API_URL; 
} else if(mode === 'test') {
  API_URL = import.meta.env.VITE_TEST_API_URL;
} else {
  API_URL = import.meta.env.VITE_PROD_API_URL;
}

class ApplicationService {
  constructor() {
    this.baseURL = `${API_URL}/api/v1`;
  }

  // Método auxiliar para hacer peticiones HTTP
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Agregar token de autorización si está disponible
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('🚀 ApplicationService - makeRequest URL:', url);
    console.log('⚙️ ApplicationService - makeRequest config:', config);

    try {
      const response = await fetch(url, config);
      
      console.log('📡 ApplicationService - Response status:', response.status);
      console.log('📡 ApplicationService - Response ok:', response.ok);
      
      let data = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('📄 ApplicationService - Response data:', data);
      }

      if (!response.ok) {
        const errorMessage = data?.message || `HTTP error! status: ${response.status}`;
        console.error('❌ ApplicationService - HTTP Error:', errorMessage);
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      console.error(`💥 ApplicationService - Error en petición a ${url}:`, error);
      throw error;
    }
  }

  // Obtener aplicaciones con filtros
  async getApplications(filters = {}) {
    console.log('🎯 ApplicationService - getApplications INITIATED');
    console.log('🔍 ApplicationService - Input filters:', filters);
    
    const searchParams = new URLSearchParams();
    
    // Agregar filtros a los parámetros de búsqueda
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/applications${queryString ? `?${queryString}` : ''}`;
    
    console.log('🌐 ApplicationService - getApplications URL:', `${this.baseURL}${endpoint}`);
    console.log('🔍 ApplicationService - Filters:', filters);
    
    const result = await this.makeRequest(endpoint);

    // Log mejorado para debugging
    console.log('====== APPLICATIONS RESULT ======');
    console.log('📦 ApplicationService - getApplications result:', result);
    console.log('📊 Applications count:', result?.applications?.length || 0);
    console.log('📄 Pagination:', result?.pagination);
    console.log('📈 Meta data:', result?.meta);
    console.log('==================================');
    
    // Normalizar la respuesta para asegurar la estructura esperada
    return {
      applications: result?.applications || [],
      pagination: result?.pagination || {
        current_page: 1,
        per_page: 20,
        total_pages: 1,
        total_count: result?.applications?.length || 0,
        has_next: false,
        has_prev: false
      },
      meta: result?.meta || {
        total_applications: result?.applications?.length || 0,
        status_summary: this.calculateStatusSummary(result?.applications || []),
        avg_response_time_hours: null,
        success_rate: null
      }
    };
  }

  // Método auxiliar para calcular resumen de estados
  calculateStatusSummary(applications) {
    const summary = {
      pending: 0,
      under_review: 0,
      accepted: 0,
      rejected: 0,
      withdrawn: 0,
      expired: 0
    };

    applications.forEach(app => {
      if (summary.hasOwnProperty(app.status)) {
        summary[app.status]++;
      }
    });

    return summary;
  }

  // Obtener estadísticas de aplicaciones
  async getApplicationStats() {
    console.log('📈 ApplicationService - getApplicationStats URL:', `${this.baseURL}/applications/stats`);
    
    const result = await this.makeRequest('/applications/stats');
    console.log('📊 ApplicationService - getApplicationStats result:', result);
    
    return result;
  }

  // Obtener aplicación específica
  async getApplication(applicationId) {
    return await this.makeRequest(`/applications/${applicationId}`);
  }

  // Evaluar aplicación (cambiar prioridad y agregar comentarios)
  async evaluateApplication(applicationId, evaluationData) {
    return await this.makeRequest(`/applications/${applicationId}/evaluate`, {
      method: 'PUT',
      body: JSON.stringify(evaluationData),
    });
  }

  // Aprobar aplicación
  async approveApplication(applicationId, approvalData) {
    return await this.makeRequest(`/applications/${applicationId}/approve`, {
      method: 'PUT',
      body: JSON.stringify(approvalData),
    });
  }

  // Rechazar aplicación
  async rejectApplication(applicationId, rejectionData) {
    return await this.makeRequest(`/applications/${applicationId}/reject`, {
      method: 'PUT',
      body: JSON.stringify(rejectionData),
    });
  }

  // Retirar aplicación (solo profesionales)
  async withdrawApplication(applicationId, withdrawalData) {
    return await this.makeRequest(`/applications/${applicationId}/withdraw`, {
      method: 'PUT',
      body: JSON.stringify(withdrawalData),
    });
  }

  // Recalcular prioridad de aplicación
  async calculatePriority(applicationId) {
    return await this.makeRequest(`/applications/${applicationId}/calculate-priority`, {
      method: 'POST',
    });
  }

  // Método auxiliar para obtener aplicaciones del profesional actual
  async getMyApplications(professionalId, filters = {}) {
    console.log('👤 ApplicationService - getMyApplications called');
    console.log('👤 Professional ID:', professionalId);
    console.log('🔍 Additional filters:', filters);
    
    const response = await this.getApplications({
      professional_id: professionalId,
      ...filters
    });

    console.log('👤 ApplicationService - My applications response:', response);
    return response;
  }

  // Método auxiliar para obtener aplicaciones de un proyecto específico
  async getProjectApplications(projectId, filters = {}) {
    console.log('📁 ApplicationService - getProjectApplications called');
    console.log('📁 Project ID:', projectId);
    console.log('🔍 Additional filters:', filters);
    
    const response = await this.getApplications({
      project_id: projectId,
      ...filters
    });

    console.log('📁 ApplicationService - Project applications response:', response);
    return response;
  }
}

const applicationService = new ApplicationService();
export default applicationService;
