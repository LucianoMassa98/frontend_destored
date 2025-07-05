import { useAuth } from '../../utils/AuthContext';
import { useState } from 'react';

function GerenciaDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data para demostración - en producción vendría de la API
  const [metricsData] = useState({
    totalUsers: 1247,
    activeProjects: 23,
    completedProjects: 156,
    totalRevenue: 847500,
    userGrowth: 12.5,
    projectSuccess: 94.2,
    avgProjectDuration: 45,
    resourceUtilization: 87
  });

  const [projectStats] = useState([
    { name: 'En Progreso', count: 23, color: 'bg-blue-500', percentage: 40 },
    { name: 'En Revisión', count: 8, color: 'bg-yellow-500', percentage: 14 },
    { name: 'Completados', count: 156, color: 'bg-green-500', percentage: 90 },
    { name: 'Pausados', count: 3, color: 'bg-red-500', percentage: 5 }
  ]);

  const [recentActivities] = useState([
    { id: 1, action: 'Nuevo proyecto iniciado', project: 'E-commerce Platform', time: '2 horas', type: 'project' },
    { id: 2, action: 'Usuario registrado', user: 'Ana García', time: '3 horas', type: 'user' },
    { id: 3, action: 'Proyecto completado', project: 'Mobile App', time: '5 horas', type: 'completion' },
    { id: 4, action: 'Convocatoria publicada', title: 'Frontend Developer', time: '1 día', type: 'job' }
  ]);

  const [convocatorias] = useState([
    { id: 1, title: 'Senior React Developer', applications: 45, status: 'Activa', deadline: '2025-07-20' },
    { id: 2, title: 'DevOps Engineer', applications: 23, status: 'En Revisión', deadline: '2025-07-15' },
    { id: 3, title: 'UX/UI Designer', applications: 67, status: 'Activa', deadline: '2025-07-25' }
  ]);

  const handleLogout = () => {
    logout();
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Métricas Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Usuarios Totales</p>
              <p className="text-2xl font-bold text-white">{metricsData.totalUsers.toLocaleString()}</p>
              <p className="text-blue-200 text-xs">+{metricsData.userGrowth}% este mes</p>
            </div>
            <div className="bg-blue-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Proyectos Activos</p>
              <p className="text-2xl font-bold text-white">{metricsData.activeProjects}</p>
              <p className="text-green-200 text-xs">{metricsData.projectSuccess}% éxito</p>
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
              <p className="text-purple-100 text-sm">Ingresos Totales</p>
              <p className="text-2xl font-bold text-white">${metricsData.totalRevenue.toLocaleString()}</p>
              <p className="text-purple-200 text-xs">Este trimestre</p>
            </div>
            <div className="bg-purple-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Utilización Recursos</p>
              <p className="text-2xl font-bold text-white">{metricsData.resourceUtilization}%</p>
              <p className="text-orange-200 text-xs">Promedio {metricsData.avgProjectDuration} días/proyecto</p>
            </div>
            <div className="bg-orange-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Estado de Proyectos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Estado de Proyectos</h3>
          <div className="space-y-4">
            {projectStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                  <span className="text-gray-300">{stat.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-white font-medium">{stat.count}</span>
                  <div className="w-16 bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${stat.color}`}
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('reports')}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Ver Reporte Detallado
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Actividad Reciente</h3>
          <div className="space-y-3">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'project' ? 'bg-blue-500' :
                  activity.type === 'user' ? 'bg-green-500' :
                  activity.type === 'completion' ? 'bg-purple-500' :
                  'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs">
                    {activity.project || activity.user || activity.title} - hace {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => setActiveTab('reports')}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-left hover:from-indigo-600 hover:to-purple-700 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Generar Reporte</h3>
              <p className="text-indigo-100 text-sm">Reportes ejecutivos detallados</p>
            </div>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </button>

        <button 
          onClick={() => setActiveTab('convocatorias')}
          className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-left hover:from-green-600 hover:to-blue-700 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Convocatorias</h3>
              <p className="text-green-100 text-sm">Administrar ofertas laborales</p>
            </div>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0l-2 2m-6-2l2 2" />
            </svg>
          </div>
        </button>

        <button 
          onClick={() => setActiveTab('resources')}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg p-6 text-left hover:from-yellow-600 hover:to-orange-700 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Recursos</h3>
              <p className="text-yellow-100 text-sm">Asignar recursos estratégicos</p>
            </div>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Reportes Ejecutivos</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Generar Nuevo Reporte
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Reporte de Usuarios</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Usuarios Activos</span>
              <span className="text-white">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Nuevos Registros</span>
              <span className="text-green-400">+156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Tasa de Retención</span>
              <span className="text-white">89.2%</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
            Ver Detalle
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Reporte de Proyectos</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Proyectos Totales</span>
              <span className="text-white">190</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Completados</span>
              <span className="text-green-400">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Tasa de Éxito</span>
              <span className="text-white">94.2%</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
            Ver Detalle
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Reporte Financiero</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Ingresos Totales</span>
              <span className="text-white">$847,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Crecimiento</span>
              <span className="text-green-400">+12.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">ROI Promedio</span>
              <span className="text-white">245%</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
            Ver Detalle
          </button>
        </div>
      </div>
    </div>
  );

  const renderConvocatorias = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Administrar Convocatorias</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
          Nueva Convocatoria
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {convocatorias.map(convocatoria => (
          <div key={convocatoria.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{convocatoria.title}</h3>
                <p className="text-gray-300">Deadline: {convocatoria.deadline}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                convocatoria.status === 'Activa' ? 'bg-green-500 text-green-100' :
                'bg-yellow-500 text-yellow-100'
              }`}>
                {convocatoria.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">
                  <strong className="text-white">{convocatoria.applications}</strong> postulaciones
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                  Ver Postulaciones
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors">
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Asignación de Recursos Estratégicos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recursos Humanos</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Desarrolladores Frontend</span>
              <span className="text-white">45/50</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Desarrolladores Backend</span>
              <span className="text-white">32/40</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">DevOps Engineers</span>
              <span className="text-white">12/15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Project Managers</span>
              <span className="text-white">8/10</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Presupuesto por Departamento</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Desarrollo</span>
              <span className="text-white">$450,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Marketing</span>
              <span className="text-white">$120,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Operaciones</span>
              <span className="text-white">$80,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">R&D</span>
              <span className="text-white">$200,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Dashboard de Gerencia</h1>
            <p className="text-gray-300">Bienvenido al panel de control, {user.username}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'reports', label: 'Reportes', icon: '📈' },
              { id: 'convocatorias', label: 'Convocatorias', icon: '💼' },
              { id: 'resources', label: 'Recursos', icon: '🎯' }
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
        {activeTab === 'reports' && renderReports()}
        {activeTab === 'convocatorias' && renderConvocatorias()}
        {activeTab === 'resources' && renderResources()}
      </div>
    </div>
  );
}

export default GerenciaDashboard;
