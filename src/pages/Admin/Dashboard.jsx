import { useAuth } from '../../utils/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex-grow bg-gradient-to-br from-[#1a1a2e] via-[#283a5e] to-[#8b5cf6] min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
        <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">Panel de Administración</h1>
              <p className="text-gray-300 text-sm sm:text-base">Bienvenido, {user?.username || user?.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Card: Alta de Profesionales y Administradores */}
            <div className="bg-white/10 rounded-lg p-6 border border-white/20 flex flex-col justify-between shadow-lg">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-2xl">🧑‍💼</span> Alta de Profesionales y Admins
                </h3>
                <p className="text-gray-200 mb-4 text-sm">
                  Autoriza el alta de nuevos usuarios profesionales y administradores, realiza entrevistas técnicas y certifica su nivel de seniority.
                </p>
              </div>
              <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors w-full">
                Autorizar Profesionales
              </button>
              <button className="mt-2 bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 w-full">
                Autorizar Administradores
              </button>
            </div>

            {/* Card: Capacitaciones y Mentorías */}
            <div className="bg-white/10 rounded-lg p-6 border border-white/20 flex flex-col justify-between shadow-lg">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎓</span> Capacitaciones y Mentorías
                </h3>
                <p className="text-gray-200 mb-4 text-sm">
                  Publica y gestiona capacitaciones y mentorías, tanto gratuitas como pagas. Administra inscripciones y seguimiento.
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors w-full">
                  Publicar Nueva mentoría
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors w-full">
                  Gestionar tus Mentorías
                </button>
              </div>
            </div>

            {/* Card: Gestión de Usuarios */}
            <div className="bg-white/10 rounded-lg p-6 border border-white/20 flex flex-col justify-between shadow-lg">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-2xl">👥</span> Blogs
                </h3>
                <p className="text-gray-200 mb-4 text-sm">
                  Blog publico para todos los usuarios, donde se pueden publicar artículos, noticias y novedades de la plataforma.
                </p>
              </div>
              <button className="mt-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors w-full">
                Visitar
              </button>
            </div>

            {/* Card: Agenda */}
            <div className="bg-white/10 rounded-lg p-6 border border-white/20 flex flex-col justify-between shadow-lg">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-2xl">📅</span> Agenda
                </h3>
                <p className="text-gray-200 mb-4 text-sm">
                  Visualiza y gestiona eventos, reuniones y actividades importantes de la plataforma.
                </p>
              </div>
              <button className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 w-full">
                Ver Agenda
              </button>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}