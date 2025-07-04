import { useAuth } from '../../utils/AuthContext';


export default function ClienteHome() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex-grow bg-gradient-to-br from-[#1a1a2e] via-[#283a5e] to-[#8b5cf6] min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 p-10 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Bienvenido, {user?.username || user?.name}</h1>
              <p className="text-gray-300 text-lg">¿Listo para impulsar tu negocio?</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Sección: Describir necesidades */}
          <section className="mb-8">
            <div className="bg-white/20 rounded-xl p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Describe tus necesidades</h2>
                <p className="text-gray-200 mb-4">Cuéntanos qué tipo de software o campaña publicitaria necesitas. Nuestro equipo te ayudará a encontrar la mejor solución.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors">Describir Requerimiento</button>
              </div>
              <div className="text-5xl">📝</div>
            </div>
          </section>

          {/* Sección: Consultoría gratuita */}
          <section className="mb-8">
            <div className="bg-white/20 rounded-xl p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Consultoría inicial sin costo</h2>
                <p className="text-gray-200 mb-4">Agenda una reunión con un Tech Leader para definir tu requerimiento y recibir asesoría experta sin compromiso.</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors">Agendar Consultoría</button>
              </div>
              <div className="text-5xl">🤝</div>
            </div>
          </section>

          {/* Sección: Publicar proyectos */}
          <section className="mb-8">
            <div className="bg-white/20 rounded-xl p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Publica proyectos y contrata servicios</h2>
                <p className="text-gray-200 mb-4">Publica tus proyectos, revisa postulaciones de profesionales y contrata el servicio que mejor se adapte a tus necesidades.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors">Publicar Proyecto</button>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors">Ver Postulaciones</button>
                </div>
              </div>
              <div className="text-5xl">🚀</div>
            </div>
          </section>

          {/* Sección: Planes personalizados */}
          <section>
            <div className="bg-white/20 rounded-xl p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Planes de desarrollo personalizados</h2>
                <p className="text-gray-200 mb-4">Adquiere un plan de desarrollo a medida, gestionado y supervisado por un Tech Leader para asegurar el éxito de tu proyecto.</p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-semibold transition-colors">Ver Planes Personalizados</button>
              </div>
              <div className="text-5xl">📈</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
