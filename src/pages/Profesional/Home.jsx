import { useAuth } from '../../utils/AuthContext';
import { useState } from 'react';

function ProfesionalHome() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data para demostración - en producción vendría de la API
  const [profileData, setProfileData] = useState({
    isComplete: false,
    completionPercentage: 45,
    role: '',
    techStack: [],
    portfolio: '',
    certifications: [],
    availability: '',
    hourlyRate: '',
    projectsCompleted: 1,
    canBeTrackLeader: false
  });

  const [projects] = useState([
    { id: 1, title: 'Desarrollo Web E-commerce', status: 'En progreso', deadline: '2025-08-15' },
    { id: 2, title: 'App Móvil Fintech', status: 'Postulado', deadline: '2025-07-30' },
    { id: 3, title: 'Sistema CRM', status: 'Disponible', deadline: '2025-09-01' }
  ]);

  const [mentorships] = useState([
    { id: 1, title: 'Mentorías en React Avanzado', type: 'Gratuita', mentor: 'Ana García' },
    { id: 2, title: 'Tech Leadership Workshop', type: 'Premium', mentor: 'Carlos Ruiz' },
    { id: 3, title: 'Arquitectura de Software', type: 'Personalizada', mentor: 'María López' }
  ]);

  const handleLogout = () => {
    logout();
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Profile Completion Alert */}
      {!profileData.isComplete && (
        <div className="bg-yellow-600 border border-yellow-500 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-yellow-100">¡Completa tu perfil!</h3>
              <p className="text-yellow-200">Tu perfil está {profileData.completionPercentage}% completo</p>
            </div>
            <button 
              onClick={() => setActiveTab('profile')}
              className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Completar
            </button>
          </div>
          <div className="mt-3 bg-yellow-500 rounded-full h-2">
            <div 
              className="bg-yellow-300 h-2 rounded-full transition-all duration-300"
              style={{ width: `${profileData.completionPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Proyectos Completados</p>
              <p className="text-2xl font-bold text-white">{profileData.projectsCompleted}</p>
            </div>
            <div className="bg-blue-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Proyectos Activos</p>
              <p className="text-2xl font-bold text-white">2</p>
            </div>
            <div className="bg-green-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Mentorías</p>
              <p className="text-2xl font-bold text-white">{mentorships.length}</p>
            </div>
            <div className="bg-purple-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Tarifa/Hora</p>
              <p className="text-2xl font-bold text-white">${profileData.hourlyRate || '--'}</p>
            </div>
            <div className="bg-orange-400 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Track Leader Eligibility */}
      {profileData.projectsCompleted >= 3 && !profileData.canBeTrackLeader && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">¡Felicidades!</h3>
              <p className="text-indigo-100">Has completado {profileData.projectsCompleted} proyectos. Ahora puedes postularte como Track Leader.</p>
            </div>
            <button className="mt-4 sm:mt-0 bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              Postularme como Track Leader
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Proyectos Recientes</h3>
          <div className="space-y-3">
            {projects.slice(0, 3).map(project => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-medium">{project.title}</p>
                  <p className="text-gray-300 text-sm">{project.deadline}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'En progreso' ? 'bg-blue-500 text-blue-100' :
                  project.status === 'Postulado' ? 'bg-yellow-500 text-yellow-100' :
                  'bg-green-500 text-green-100'
                }`}>
                  {project.status}
                </span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('projects')}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Ver todos los proyectos
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Mentorías Disponibles</h3>
          <div className="space-y-3">
            {mentorships.slice(0, 3).map(mentorship => (
              <div key={mentorship.id} className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-medium">{mentorship.title}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    mentorship.type === 'Gratuita' ? 'bg-green-500 text-green-100' :
                    mentorship.type === 'Premium' ? 'bg-yellow-500 text-yellow-100' :
                    'bg-purple-500 text-purple-100'
                  }`}>
                    {mentorship.type}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">por {mentorship.mentor}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('mentorships')}
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Ver todas las mentorías
          </button>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Completar Perfil Profesional</h2>
        <p className="text-gray-300 mb-4">Completa tu información para acceder a más oportunidades</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Rol Principal</label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
              <option value="">Selecciona tu rol</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="fullstack">Fullstack Developer</option>
              <option value="mobile">Mobile Developer</option>
              <option value="devops">DevOps Engineer</option>
              <option value="qa">QA Engineer</option>
            </select>
          </div>

          {/* Stack Tecnológico */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Stack Tecnológico</label>
            <input 
              type="text" 
              placeholder="React, Node.js, Python..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            />
          </div>

          {/* Portafolio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">URL del Portafolio</label>
            <input 
              type="url" 
              placeholder="https://mi-portafolio.com"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            />
          </div>

          {/* Tarifa por hora */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tarifa por Hora (USD)</label>
            <input 
              type="number" 
              placeholder="25"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            />
          </div>

          {/* Disponibilidad */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Disponibilidad</label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
              <option value="">Selecciona tu disponibilidad</option>
              <option value="fulltime">Tiempo completo</option>
              <option value="parttime">Medio tiempo</option>
              <option value="freelance">Freelance</option>
              <option value="project">Solo proyectos</option>
            </select>
          </div>

          {/* Certificaciones */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Certificaciones</label>
            <textarea 
              placeholder="AWS Certified Developer, Google Cloud Professional..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-24"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            Guardar Perfil
          </button>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Proyectos Disponibles</h2>
        <div className="flex gap-2">
          <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
            <option>Todos los estados</option>
            <option>Disponible</option>
            <option>Postulado</option>
            <option>En progreso</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                project.status === 'En progreso' ? 'bg-blue-500 text-blue-100' :
                project.status === 'Postulado' ? 'bg-yellow-500 text-yellow-100' :
                'bg-green-500 text-green-100'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Proyecto de desarrollo que requiere experiencia en tecnologías modernas.
            </p>
            <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
              <span>Deadline: {project.deadline}</span>
              <span>$50-80/hora</span>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              {project.status === 'Disponible' ? 'Postularme' : 'Ver Detalles'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMentorships = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Capacitaciones y Mentorías</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mentorships.map(mentorship => (
          <div key={mentorship.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white">{mentorship.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                mentorship.type === 'Gratuita' ? 'bg-green-500 text-green-100' :
                mentorship.type === 'Premium' ? 'bg-yellow-500 text-yellow-100' :
                'bg-purple-500 text-purple-100'
              }`}>
                {mentorship.type}
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Capacitación especializada con tech leaders de la comunidad.
            </p>
            <p className="text-sm text-gray-400 mb-4">Mentor: {mentorship.mentor}</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
              {mentorship.type === 'Gratuita' ? 'Unirme Gratis' : 'Ver Precios'}
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
            <h1 className="text-2xl sm:text-3xl font-bold">Panel Profesional</h1>
            <p className="text-gray-300">Bienvenido, {user.username}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
              { id: 'profile', label: 'Mi Perfil', icon: '👤' },
              { id: 'projects', label: 'Proyectos', icon: '💼' },
              { id: 'mentorships', label: 'Capacitaciones', icon: '📚' }
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
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'mentorships' && renderMentorships()}
      </div>
    </div>
  );
}

export default ProfesionalHome;
