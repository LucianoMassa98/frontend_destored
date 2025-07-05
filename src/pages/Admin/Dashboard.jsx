import { useAuth } from '../../utils/AuthContext';
import { useState } from 'react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data para demostración - en producción vendría de la API
  const [adminData] = useState({
    pendingProfessionals: 8,
    pendingAdmins: 2,
    activeMentorships: 15,
    totalUsers: 1247,
    completedInterviews: 45,
    platformRevenue: 125000
  });

  const [pendingApplications] = useState([
    { 
      id: 1, 
      name: 'Ana García Martínez', 
      role: 'Frontend Developer', 
      experience: '5 años', 
      stack: 'React, TypeScript, Next.js',
      status: 'Pendiente Entrevista',
      appliedDate: '2025-07-01'
    },
    { 
      id: 2, 
      name: 'Carlos López Ruiz', 
      role: 'Backend Developer', 
      experience: '7 años', 
      stack: 'Node.js, Python, PostgreSQL',
      status: 'Entrevista Programada',
      appliedDate: '2025-06-28'
    },
    { 
      id: 3, 
      name: 'María Rodríguez', 
      role: 'DevOps Engineer', 
      experience: '4 años', 
      stack: 'AWS, Docker, Kubernetes',
      status: 'En Evaluación',
      appliedDate: '2025-07-02'
    }
  ]);

  const [adminApplications] = useState([
    { 
      id: 1, 
      name: 'Roberto Silva', 
      role: 'Tech Lead', 
      experience: '10 años', 
      previousRole: 'Senior Developer en TechCorp',
      status: 'Pendiente Aprobación',
      appliedDate: '2025-06-30'
    },
    { 
      id: 2, 
      name: 'Patricia Luna', 
      role: 'Project Manager', 
      experience: '8 años', 
      previousRole: 'PM en StartupXYZ',
      status: 'En Revisión',
      appliedDate: '2025-07-01'
    }
  ]);

  const [mentorships] = useState([
    { 
      id: 1, 
      title: 'React Avanzado para Seniors', 
      mentor: 'Ana García', 
      type: 'Paga', 
      price: 150, 
      participants: 23,
      status: 'Activa',
      startDate: '2025-07-15'
    },
    { 
      id: 2, 
      title: 'Introducción a DevOps', 
      mentor: 'Carlos López', 
      type: 'Gratuita', 
      price: 0, 
      participants: 45,
      status: 'Activa',
      startDate: '2025-07-10'
    },
    { 
      id: 3, 
      title: 'Arquitectura de Microservicios', 
      mentor: 'Roberto Silva', 
      type: 'Paga', 
      price: 200, 
      participants: 18,
      status: 'Programada',
      startDate: '2025-07-20'
    }
  ]);

  const handleLogout = () => {
    logout();
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Profesionales Pendientes</p>
              <p className="text-2xl font-bold text-white">{adminData.pendingProfessionals}</p>
              <p className="text-blue-200 text-xs">Requieren entrevista</p>
            </div>
            <div className="bg-blue-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Admins Pendientes</p>
              <p className="text-2xl font-bold text-white">{adminData.pendingAdmins}</p>
              <p className="text-purple-200 text-xs">Esperando aprobación</p>
            </div>
            <div className="bg-purple-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Mentorías Activas</p>
              <p className="text-2xl font-bold text-white">{adminData.activeMentorships}</p>
              <p className="text-green-200 text-xs">En curso</p>
            </div>
            <div className="bg-green-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Usuarios Totales</p>
              <p className="text-2xl font-bold text-white">{adminData.totalUsers.toLocaleString()}</p>
              <p className="text-yellow-200 text-xs">Plataforma</p>
            </div>
            <div className="bg-yellow-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Entrevistas Realizadas</p>
              <p className="text-2xl font-bold text-white">{adminData.completedInterviews}</p>
              <p className="text-indigo-200 text-xs">Este mes</p>
            </div>
            <div className="bg-indigo-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm">Ingresos Plataforma</p>
              <p className="text-2xl font-bold text-white">${adminData.platformRevenue.toLocaleString()}</p>
              <p className="text-pink-200 text-xs">Este trimestre</p>
            </div>
            <div className="bg-pink-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={() => setActiveTab('professionals')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-left hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">🧑‍💼</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Autorizar Profesionales</h3>
          <p className="text-blue-100 text-sm">Entrevistas y certificación de seniority</p>
        </button>

        <button 
          onClick={() => setActiveTab('admins')}
          className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-left hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">👑</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Autorizar Admins</h3>
          <p className="text-purple-100 text-sm">Aprobar nuevos administradores</p>
        </button>

        <button 
          onClick={() => setActiveTab('mentorships')}
          className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-left hover:from-green-600 hover:to-teal-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">🎓</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Gestionar Mentorías</h3>
          <p className="text-green-100 text-sm">Capacitaciones gratuitas y pagas</p>
        </button>

        <button 
          onClick={() => setActiveTab('analytics')}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg p-6 text-left hover:from-yellow-600 hover:to-orange-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">📊</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
          <p className="text-yellow-100 text-sm">Métricas y reportes de la plataforma</p>
        </button>
      </div>

      {/* Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Solicitudes Pendientes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div>
                <p className="text-white font-medium">Ana García - Frontend Dev</p>
                <p className="text-gray-300 text-sm">5 años exp. - React, TypeScript</p>
              </div>
              <span className="px-2 py-1 bg-yellow-500 text-yellow-100 rounded-full text-xs">
                Pendiente
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div>
                <p className="text-white font-medium">Carlos López - Backend Dev</p>
                <p className="text-gray-300 text-sm">7 años exp. - Node.js, Python</p>
              </div>
              <span className="px-2 py-1 bg-blue-500 text-blue-100 rounded-full text-xs">
                Entrevista
              </span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('professionals')}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Ver Todas las Solicitudes
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Mentorías Recientes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div>
                <p className="text-white font-medium">React Avanzado</p>
                <p className="text-gray-300 text-sm">Ana García - 23 participantes</p>
              </div>
              <span className="px-2 py-1 bg-green-500 text-green-100 rounded-full text-xs">
                Activa
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div>
                <p className="text-white font-medium">Intro a DevOps</p>
                <p className="text-gray-300 text-sm">Carlos López - 45 participantes</p>
              </div>
              <span className="px-2 py-1 bg-blue-500 text-blue-100 rounded-full text-xs">
                Gratuita
              </span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('mentorships')}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Gestionar Mentorías
          </button>
        </div>
      </div>
    </div>
  );

  const renderProfessionals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Autorización de Profesionales</h2>
        <div className="flex space-x-2">
          <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
            <option>Todos los estados</option>
            <option>Pendiente Entrevista</option>
            <option>Entrevista Programada</option>
            <option>En Evaluación</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingApplications.map(application => (
          <div key={application.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {application.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{application.name}</h3>
                    <p className="text-gray-300">{application.role} - {application.experience} de experiencia</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Stack Tecnológico:</span>
                    <p className="text-white">{application.stack}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Fecha de aplicación:</span>
                    <p className="text-white">{application.appliedDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  application.status === 'Pendiente Entrevista' ? 'bg-yellow-500 text-yellow-100' :
                  application.status === 'Entrevista Programada' ? 'bg-blue-500 text-blue-100' :
                  'bg-purple-500 text-purple-100'
                }`}>
                  {application.status}
                </span>
                
                <div className="flex space-x-2">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Programar Entrevista
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Ver CV
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Evaluar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdmins = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Autorización de Administradores</h2>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
          Invitar Nuevo Admin
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {adminApplications.map(application => (
          <div key={application.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {application.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{application.name}</h3>
                    <p className="text-gray-300">{application.role} - {application.experience} de experiencia</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Experiencia Previa:</span>
                    <p className="text-white">{application.previousRole}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Fecha de aplicación:</span>
                    <p className="text-white">{application.appliedDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  application.status === 'Pendiente Aprobación' ? 'bg-yellow-500 text-yellow-100' :
                  'bg-blue-500 text-blue-100'
                }`}>
                  {application.status}
                </span>
                
                <div className="flex space-x-2">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Aprobar
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Revisar Perfil
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMentorships = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestión de Mentorías y Capacitaciones</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
          Publicar Nueva Mentoría
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mentorships.map(mentorship => (
          <div key={mentorship.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{mentorship.title}</h3>
                    <p className="text-gray-300">Mentor: {mentorship.mentor}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Tipo:</span>
                    <p className="text-white">{mentorship.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Precio:</span>
                    <p className="text-white">{mentorship.price === 0 ? 'Gratuita' : `$${mentorship.price}`}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Participantes:</span>
                    <p className="text-white">{mentorship.participants}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  mentorship.status === 'Activa' ? 'bg-green-500 text-green-100' :
                  'bg-blue-500 text-blue-100'
                }`}>
                  {mentorship.status}
                </span>
                
                <div className="flex space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Ver Detalles
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Editar
                  </button>
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Gestionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Analytics y Métricas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Crecimiento de Usuarios</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Profesionales</span>
              <span className="text-white">847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Clientes</span>
              <span className="text-white">365</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Administradores</span>
              <span className="text-white">35</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Actividad de Mentorías</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Mentorías Completadas</span>
              <span className="text-white">78</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Promedio de Participantes</span>
              <span className="text-white">32</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Ingresos por Mentorías</span>
              <span className="text-white">$45,600</span>
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
            <h1 className="text-2xl sm:text-3xl font-bold">Panel de Administración</h1>
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
              { id: 'professionals', label: 'Profesionales', icon: '🧑‍💼' },
              { id: 'admins', label: 'Administradores', icon: '👑' },
              { id: 'mentorships', label: 'Mentorías', icon: '🎓' },
              { id: 'analytics', label: 'Analytics', icon: '📊' }
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
        {activeTab === 'professionals' && renderProfessionals()}
        {activeTab === 'admins' && renderAdmins()}
        {activeTab === 'mentorships' && renderMentorships()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
}