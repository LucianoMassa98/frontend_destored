// demo/ApplicationsDemo.jsx
/**
 * DEMO: Uso completo del sistema de aplicaciones
 * 
 * Este archivo muestra ejemplos de cómo usar todos los componentes y hooks
 * del sistema de aplicaciones. NO incluir en producción.
 */

import React, { useState } from 'react';
import { useApplications, useMyApplications, useProjectApplications, useApplicationActions } from '../hooks/useApplications';
import ApplicationsList from '../components/ApplicationsList';
import ApplicationDetails from '../components/ApplicationDetails';
import ApplicationsStats from '../components/ApplicationsStats';
import ApplicationForm from '../components/ApplicationForm';
import MyApplicationsPage from '../pages/Profesional/MyApplicationsPage';
import ProjectApplicationsPage from '../pages/Cliente/ProjectApplicationsPage';
import ApplicationsManagementPage from '../pages/Admin/ApplicationsManagementPage';

const ApplicationsDemo = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [demoProject] = useState({
    id: 'demo-project-id',
    title: 'Proyecto de Demostración',
    description: 'Este es un proyecto de demostración para mostrar el sistema de aplicaciones',
    budget_min: 1000,
    budget_max: 2000,
    budget_type: 'range',
    duration: 30,
    category: 'Desarrollo Web'
  });

  // Ejemplo 1: Obtener todas las aplicaciones con filtros
  const {
    applications: allApplications,
    loading: allLoading,
    error: allError,
    pagination,
    refetch: refetchAll
  } = useApplications({
    status: 'pending',
    page: 1,
    limit: 10
  });

  // Ejemplo 2: Obtener aplicaciones del profesional actual
  const {
    applications: myApplications,
    loading: myLoading,
    error: myError,
    refetch: refetchMy
  } = useMyApplications('user-professional-id');

  // Ejemplo 3: Obtener aplicaciones de un proyecto específico
  const {
    applications: projectApplications,
    loading: projectLoading,
    error: projectError,
    refetch: refetchProject
  } = useProjectApplications('demo-project-id');

  // Ejemplo 4: Acciones de aplicaciones
  const {
    loading: actionLoading,
    error: actionError,
    evaluateApplication,
    approveApplication,
    rejectApplication,
    withdrawApplication,
    calculatePriority
  } = useApplicationActions();

  // Ejemplo de evaluación de aplicación
  const handleEvaluateExample = async (applicationId) => {
    try {
      const evaluationData = {
        priority_score: 85,
        client_feedback: 'Candidato prometedor, buena experiencia',
        metadata: {
          evaluated_by: 'demo-client',
          evaluation_date: new Date().toISOString()
        }
      };
      
      await evaluateApplication(applicationId, evaluationData);
      console.log('Aplicación evaluada exitosamente');
    } catch (error) {
      console.error('Error al evaluar aplicación:', error);
    }
  };

  // Ejemplo de aprobación de aplicación
  const handleApproveExample = async (applicationId) => {
    try {
      const approvalData = {
        client_feedback: 'Excelente propuesta, aprobado',
        final_rate: 1500,
        rate_negotiation_notes: 'Tarifa acordada después de negociación'
      };
      
      await approveApplication(applicationId, approvalData);
      console.log('Aplicación aprobada exitosamente');
    } catch (error) {
      console.error('Error al aprobar aplicación:', error);
    }
  };

  // Ejemplo de rechazo de aplicación
  const handleRejectExample = async (applicationId) => {
    try {
      const rejectionData = {
        reason: 'El perfil no se ajusta a los requisitos del proyecto',
        client_feedback: 'Agradecemos su interés, pero necesitamos más experiencia en React',
        send_feedback_email: true
      };
      
      await rejectApplication(applicationId, rejectionData);
      console.log('Aplicación rechazada exitosamente');
    } catch (error) {
      console.error('Error al rechazar aplicación:', error);
    }
  };

  // Ejemplo de retiro de aplicación
  const handleWithdrawExample = async (applicationId) => {
    try {
      const withdrawalData = {
        reason: 'Ya no estoy disponible para este proyecto'
      };
      
      await withdrawApplication(applicationId, withdrawalData);
      console.log('Aplicación retirada exitosamente');
    } catch (error) {
      console.error('Error al retirar aplicación:', error);
    }
  };

  // Ejemplo de aplicación a proyecto
  const handleApplyExample = (project) => {
    const applicationData = {
      cover_letter: 'Estimado cliente, me interesa mucho su proyecto...',
      proposed_rate: 1200,
      proposed_timeline: 25,
      availability_start: '2025-08-01'
    };

    // Esto sería manejado por el ApplicationForm component
    console.log('Aplicando a proyecto:', project.id, applicationData);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Demo: Sistema de Aplicaciones Completo
      </h1>

      {/* Sección 1: Estadísticas */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Estadísticas de Aplicaciones</h2>
        <div className="max-w-md">
          <ApplicationsStats />
        </div>
      </section>

      {/* Sección 2: Lista de aplicaciones */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Lista de Aplicaciones (Todas)</h2>
        <ApplicationsList showDetails={true} />
      </section>

      {/* Sección 3: Lista de aplicaciones de profesional */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Mis Aplicaciones (Profesional)</h2>
        <ApplicationsList 
          professionalId="demo-professional-id" 
          showDetails={true} 
        />
      </section>

      {/* Sección 4: Lista de aplicaciones de proyecto */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Aplicaciones del Proyecto (Cliente)</h2>
        <ApplicationsList 
          projectId="demo-project-id" 
          showDetails={true} 
        />
      </section>

      {/* Sección 5: Formulario de aplicación */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Formulario de Aplicación</h2>
        <div className="max-w-2xl">
          <ApplicationForm
            project={demoProject}
            onSuccess={(response) => {
              console.log('Aplicación enviada:', response);
            }}
            onCancel={() => {
              console.log('Aplicación cancelada');
            }}
          />
        </div>
      </section>

      {/* Sección 6: Detalles de aplicación */}
      {selectedApplication && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">6. Detalles de Aplicación</h2>
          <ApplicationDetails
            application={selectedApplication}
            onUpdate={() => {
              console.log('Aplicación actualizada');
              // Recargar datos
              refetchAll();
              refetchMy();
              refetchProject();
            }}
            onClose={() => setSelectedApplication(null)}
          />
        </section>
      )}

      {/* Sección 7: Páginas completas */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">7. Páginas Completas</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Página de Profesional</h3>
            <p className="text-gray-600 mb-4">
              MyApplicationsPage - Para que los profesionales vean sus aplicaciones
            </p>
            {/* 
            <MyApplicationsPage />
            Descomenta para ver la página completa
            */}
          </div>

          <div className="border border-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Página de Cliente</h3>
            <p className="text-gray-600 mb-4">
              ProjectApplicationsPage - Para que los clientes vean aplicaciones de sus proyectos
            </p>
            {/* 
            <ProjectApplicationsPage />
            Descomenta para ver la página completa
            */}
          </div>

          <div className="border border-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Página de Administrador</h3>
            <p className="text-gray-600 mb-4">
              ApplicationsManagementPage - Para administrar todas las aplicaciones
            </p>
            {/* 
            <ApplicationsManagementPage />
            Descomenta para ver la página completa
            */}
          </div>
        </div>
      </section>

      {/* Sección 8: Ejemplos de acciones */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">8. Ejemplos de Acciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => handleEvaluateExample('demo-application-id')}
            disabled={actionLoading}
            className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Evaluar Aplicación
          </button>
          
          <button
            onClick={() => handleApproveExample('demo-application-id')}
            disabled={actionLoading}
            className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            Aprobar Aplicación
          </button>
          
          <button
            onClick={() => handleRejectExample('demo-application-id')}
            disabled={actionLoading}
            className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            Rechazar Aplicación
          </button>
          
          <button
            onClick={() => handleWithdrawExample('demo-application-id')}
            disabled={actionLoading}
            className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            Retirar Aplicación
          </button>
          
          <button
            onClick={() => calculatePriority('demo-application-id')}
            disabled={actionLoading}
            className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            Recalcular Prioridad
          </button>
          
          <button
            onClick={() => handleApplyExample(demoProject)}
            className="p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Aplicar a Proyecto
          </button>
        </div>
        
        {actionError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
            Error en acción: {actionError}
          </div>
        )}
      </section>

      {/* Información sobre el estado de carga */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">9. Estados de Carga</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium">Todas las Aplicaciones</h3>
            <p className={`text-sm ${allLoading ? 'text-yellow-600' : 'text-green-600'}`}>
              {allLoading ? 'Cargando...' : 'Cargado'}
            </p>
            {allError && <p className="text-sm text-red-600">Error: {allError}</p>}
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium">Mis Aplicaciones</h3>
            <p className={`text-sm ${myLoading ? 'text-yellow-600' : 'text-green-600'}`}>
              {myLoading ? 'Cargando...' : 'Cargado'}
            </p>
            {myError && <p className="text-sm text-red-600">Error: {myError}</p>}
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium">Aplicaciones del Proyecto</h3>
            <p className={`text-sm ${projectLoading ? 'text-yellow-600' : 'text-green-600'}`}>
              {projectLoading ? 'Cargando...' : 'Cargado'}
            </p>
            {projectError && <p className="text-sm text-red-600">Error: {projectError}</p>}
          </div>
        </div>
      </section>

      {/* Información sobre paginación */}
      {pagination && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">10. Información de Paginación</h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            <pre className="text-sm">
              {JSON.stringify(pagination, null, 2)}
            </pre>
          </div>
        </section>
      )}

      <div className="border-t border-gray-200 pt-8">
        <p className="text-center text-gray-600">
          🎉 ¡Sistema de Aplicaciones Completo Implementado! 🎉
        </p>
      </div>
    </div>
  );
};

export default ApplicationsDemo;
