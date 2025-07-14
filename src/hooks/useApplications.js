// hooks/useApplications.js
import { useState, useEffect } from 'react';
import applicationService from '../services/applicationService';

// Hook para obtener aplicaciones con filtros
export const useApplications = (filters = {}, autoFetch = true) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [meta, setMeta] = useState(null);

  const fetchApplications = async (customFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedFilters = { ...filters, ...customFilters };
      console.log('🚀 useApplications - Filters:', mergedFilters);
      
      const response = await applicationService.getApplications(mergedFilters);
      console.log('📦 useApplications - Response:', response);
      
      // La respuesta ahora viene con la estructura normalizada
      if (response) {
        console.log('✅ useApplications - Applications found:', response.applications?.length || 0);
        console.log('📊 useApplications - Pagination:', response.pagination);
        console.log('📈 useApplications - Meta:', response.meta);
        
        setApplications(response.applications || []);
        setPagination(response.pagination || {});
        setMeta(response.meta || null);
      } else {
        console.log('❌ useApplications - No response received');
        setApplications([]);
        setPagination({});
        setMeta(null);
      }
    } catch (err) {
      console.error('💥 useApplications - Error:', err);
      setError(err.message);
      setApplications([]);
      setPagination({});
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 useApplications - useEffect triggered');
    console.log('🔄 useApplications - autoFetch:', autoFetch);
    console.log('🔄 useApplications - filters:', filters);
    
    if (autoFetch) {
      console.log('🚀 useApplications - Starting fetchApplications...');
      fetchApplications();
    } else {
      console.log('⏸️ useApplications - Skipping fetch (autoFetch = false)');
    }
  }, [JSON.stringify(filters), autoFetch]);

  return {
    applications,
    loading,
    error,
    pagination,
    meta,
    refetch: fetchApplications,
    setError,
    setLoading
  };
};

// Hook para obtener estadísticas de aplicaciones
export const useApplicationStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📈 useApplicationStats - Fetching stats...');
      const response = await applicationService.getApplicationStats();
      console.log('📈 useApplicationStats - Response:', response);
      
      // La respuesta puede venir con wrapper o directamente
      if (response) {
        if (response.status === 'success' && response.data) {
          console.log('✅ useApplicationStats - Stats received (with wrapper):', response.data);
          setStats(response.data);
        } else {
          console.log('✅ useApplicationStats - Stats received (direct):', response);
          setStats(response);
        }
      } else {
        console.log('❌ useApplicationStats - No response received');
      }
    } catch (err) {
      console.error('💥 useApplicationStats - Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};

// Hook para obtener una aplicación específica
export const useApplication = (applicationId) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplication = async () => {
    if (!applicationId) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await applicationService.getApplication(applicationId);
      
      // La respuesta viene directamente con los datos
      if (response) {
        setApplication(response);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [applicationId]);

  return {
    application,
    loading,
    error,
    refetch: fetchApplication
  };
};

// Hook para acciones de aplicaciones (evaluar, aprobar, rechazar, etc.)
export const useApplicationActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeAction = async (actionFn, ...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await actionFn(...args);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const evaluateApplication = async (applicationId, evaluationData) => {
    return executeAction(applicationService.evaluateApplication, applicationId, evaluationData);
  };

  const approveApplication = async (applicationId, approvalData) => {
    return executeAction(applicationService.approveApplication, applicationId, approvalData);
  };

  const rejectApplication = async (applicationId, rejectionData) => {
    return executeAction(applicationService.rejectApplication, applicationId, rejectionData);
  };

  const withdrawApplication = async (applicationId, withdrawalData) => {
    return executeAction(applicationService.withdrawApplication, applicationId, withdrawalData);
  };

  const calculatePriority = async (applicationId) => {
    return executeAction(applicationService.calculatePriority, applicationId);
  };

  return {
    loading,
    error,
    evaluateApplication,
    approveApplication,
    rejectApplication,
    withdrawApplication,
    calculatePriority,
    setError
  };
};

// Hook específico para las aplicaciones del profesional
export const useMyApplications = (professionalId, filters = {}) => {
  console.log('🎯 useMyApplications - Called with professionalId:', professionalId);
  console.log('🎯 useMyApplications - Additional filters:', filters);
  
  if (!professionalId) {
    console.log('⚠️ useMyApplications - No professionalId provided, skipping fetch');
    return {
      applications: [],
      loading: false,
      error: null,
      pagination: {},
      meta: null,
      refetch: () => {},
      setError: () => {},
      setLoading: () => {}
    };
  }
  
  const finalFilters = { professional_id: professionalId, ...filters };
  console.log('🎯 useMyApplications - Final filters:', finalFilters);
  
  const result = useApplications(finalFilters);
  console.log('🎯 useMyApplications - Hook result:', {
    applicationsCount: result.applications?.length || 0,
    loading: result.loading,
    error: result.error,
    meta: result.meta
  });
  
  return result;
};

// Hook específico para las aplicaciones de un proyecto
export const useProjectApplications = (projectId, filters = {}) => {
  return useApplications({ project_id: projectId, ...filters });
};
