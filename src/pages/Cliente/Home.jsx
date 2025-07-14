import { useAuth } from '../../utils/AuthContext';
import { useState } from 'react';

export default function ClienteHome() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data para demostración - en producción vendría de la API
  const [clientData] = useState({
    activeProjects: 3,
    completedProjects: 12,
    totalSpent: 45000,
    pendingConsultations: 2,
    averageRating: 4.8
  });

  const [recentProjects] = useState([
    { id: 1, title: 'E-commerce Platform', status: 'En Desarrollo', progress: 75, developer: 'Ana García', deadline: '2025-08-15' },
    { id: 2, title: 'App Móvil iOS', status: 'En Revisión', progress: 90, developer: 'Carlos López', deadline: '2025-07-20' },
    { id: 3, title: 'Sistema CRM', status: 'Iniciando', progress: 25, developer: 'María Rodríguez', deadline: '2025-09-01' }
  ]);

  const [availableServices] = useState([
    { id: 1, title: 'Desarrollo Web Frontend', price: 'Desde $2,500', category: 'Desarrollo', icon: '🌐' },
    { id: 2, title: 'Aplicaciones Móviles', price: 'Desde $5,000', category: 'Mobile', icon: '📱' },
    { id: 3, title: 'Consultoría Técnica', price: 'Desde $100/hora', category: 'Consultoría', icon: '💡' },
    { id: 4, title: 'Marketing Digital', price: 'Desde $1,200', category: 'Marketing', icon: '📈' }
  ]);

  const [consultations] = useState([
    { id: 1, type: 'Consultoría Inicial', date: '2025-07-10', time: '14:00', consultant: 'Tech Leader - Roberto Silva' },
    { id: 2, type: 'Revisión de Proyecto', date: '2025-07-12', time: '10:00', consultant: 'Senior Dev - Patricia Luna' }
  ]);

  const handleLogout = () => {
    logout();
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/cliente/proyectos"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="bg-blue-600 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Crear Proyecto</h4>
              <p className="text-sm text-gray-600">Publica un nuevo proyecto</p>
            </div>
          </a>
          
          <a
            href="/cliente/proyectos"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="bg-green-600 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Gestionar Proyectos</h4>
              <p className="text-sm text-gray-600">Ver y editar tus proyectos</p>
            </div>
          </a>

          <div className="flex items-center p-4 bg-purple-50 rounded-lg">
            <div className="bg-purple-600 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Ver Aplicaciones</h4>
              <p className="text-sm text-gray-600">Revisar candidatos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Proyectos Activos</p>
              <p className="text-2xl font-bold text-white">{clientData.activeProjects}</p>
            </div>
            <div className="bg-blue-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Completados</p>
              <p className="text-2xl font-bold text-white">{clientData.completedProjects}</p>
            </div>
            <div className="bg-green-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Inversión Total</p>
              <p className="text-2xl font-bold text-white">${clientData.totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-purple-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Consultas Pendientes</p>
              <p className="text-2xl font-bold text-white">{clientData.pendingConsultations}</p>
            </div>
            <div className="bg-yellow-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Calificación Promedio</p>
              <p className="text-2xl font-bold text-white">{clientData.averageRating}⭐</p>
            </div>
            <div className="bg-indigo-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={() => setActiveTab('requirements')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-left hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">📝</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Describir Requerimiento</h3>
          <p className="text-blue-100 text-sm">Define tu proyecto y necesidades específicas</p>
        </button>

        <button 
          onClick={() => setActiveTab('consultations')}
          className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-left hover:from-green-600 hover:to-teal-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">🤝</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Consultoría Gratuita</h3>
          <p className="text-green-100 text-sm">Agenda una sesión con nuestros expertos</p>
        </button>

        <button 
          onClick={() => setActiveTab('projects')}
          className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-left hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">🚀</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Publicar Proyecto</h3>
          <p className="text-purple-100 text-sm">Recibe propuestas de profesionales</p>
        </button>

        <button 
          onClick={() => setActiveTab('services')}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg p-6 text-left hover:from-yellow-600 hover:to-orange-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">📈</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Planes Personalizados</h3>
          <p className="text-yellow-100 text-sm">Desarrollo supervisado por Tech Leaders</p>
        </button>
      </div>

      {/* Proyectos Recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Mis Proyectos Activos</h3>
          <div className="space-y-4">
            {recentProjects.map(project => (
              <div key={project.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">{project.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'En Desarrollo' ? 'bg-blue-500 text-blue-100' :
                    project.status === 'En Revisión' ? 'bg-yellow-500 text-yellow-100' :
                    'bg-green-500 text-green-100'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">Desarrollador: {project.developer}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Progreso</span>
                  <span className="text-white text-sm">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-xs mt-2">Deadline: {project.deadline}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('projects')}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Ver Todos los Proyectos
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Próximas Consultas</h3>
          <div className="space-y-4">
            {consultations.map(consultation => (
              <div key={consultation.id} className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">{consultation.type}</h4>
                <div className="flex items-center space-x-2 text-gray-300 text-sm mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{consultation.date} - {consultation.time}</span>
                </div>
                <p className="text-gray-400 text-sm">{consultation.consultant}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('consultations')}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Agendar Nueva Consulta
          </button>
        </div>
      </div>
    </div>
  );

  const renderRequirements = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Describir Requerimiento</h2>
        <p className="text-gray-300 mb-6">Cuéntanos en detalle qué necesitas para tu proyecto</p>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Proyecto</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <option value="">Selecciona el tipo</option>
                <option value="web">Desarrollo Web</option>
                <option value="mobile">Aplicación Móvil</option>
                <option value="desktop">Software de Escritorio</option>
                <option value="marketing">Campaña de Marketing</option>
                <option value="consultoria">Consultoría Técnica</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Presupuesto Estimado</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <option value="">Selecciona rango</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000-15000">$5,000 - $15,000</option>
                <option value="15000-50000">$15,000 - $50,000</option>
                <option value="50000+">$50,000+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Descripción del Proyecto</label>
            <textarea 
              placeholder="Describe en detalle qué necesitas, objetivos, funcionalidades específicas..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-32"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Fecha Límite</label>
              <input 
                type="date" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Prioridad</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors">
              Guardar Borrador
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Enviar Requerimiento
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConsultations = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Consultas y Asesorías</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
          Agendar Nueva Consulta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Consultoría Inicial Gratuita</h3>
          <p className="text-gray-300 mb-4">
            Sesión de 30 minutos con un Tech Leader para definir tu proyecto y recibir asesoría experta.
          </p>
          <ul className="text-gray-300 text-sm mb-4 space-y-1">
            <li>✓ Análisis de requerimientos</li>
            <li>✓ Recomendaciones técnicas</li>
            <li>✓ Estimación de tiempos y costos</li>
            <li>✓ Plan de desarrollo sugerido</li>
          </ul>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
            Agendar Gratis
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Consultoría Especializada</h3>
          <p className="text-gray-300 mb-4">
            Sesiones personalizadas con expertos en áreas específicas según tus necesidades.
          </p>
          <ul className="text-gray-300 text-sm mb-4 space-y-1">
            <li>✓ Arquitectura de software</li>
            <li>✓ Estrategia de marketing digital</li>
            <li>✓ Optimización de procesos</li>
            <li>✓ Escalabilidad y performance</li>
          </ul>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
            Ver Especialistas
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Mis Consultas Programadas</h3>
        <div className="space-y-4">
          {consultations.map(consultation => (
            <div key={consultation.id} className="bg-gray-700 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium">{consultation.type}</h4>
                <p className="text-gray-300 text-sm">{consultation.date} - {consultation.time}</p>
                <p className="text-gray-400 text-sm">{consultation.consultant}</p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                  Reprogramar
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors">
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Mis Proyectos</h2>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
          Publicar Nuevo Proyecto
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {recentProjects.map(project => (
          <div key={project.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-gray-300">Desarrollador: {project.developer}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.status === 'En Desarrollo' ? 'bg-blue-500 text-blue-100' :
                project.status === 'En Revisión' ? 'bg-yellow-500 text-yellow-100' :
                'bg-green-500 text-green-100'
              }`}>
                {project.status}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Progreso del proyecto</span>
                <span className="text-white font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Deadline: {project.deadline}</span>
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                  Ver Detalles
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors">
                  Contactar Dev
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Servicios Disponibles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availableServices.map(service => (
          <div key={service.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{service.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <span className="text-sm text-gray-400">{service.category}</span>
                </div>
              </div>
              <span className="text-green-400 font-medium">{service.price}</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Servicio profesional de alta calidad con garantía de satisfacción y soporte continuo.
            </p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
              Solicitar Cotización
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Portal del Cliente</h1>
            <p className="text-gray-300">Bienvenido, {user?.username || user?.name}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
              { id: 'requirements', label: 'Requerimientos', icon: '📝' },
              { id: 'consultations', label: 'Consultas', icon: '🤝' },
              { id: 'projects', label: 'Mis Proyectos', icon: '🚀' },
              { id: 'services', label: 'Servicios', icon: '📈' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'requirements' && renderRequirements()}
        {activeTab === 'consultations' && renderConsultations()}
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'services' && renderServices()}
      </div>
    </div>
  );
}
