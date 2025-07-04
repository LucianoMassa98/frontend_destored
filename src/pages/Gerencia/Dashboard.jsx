import { useAuth } from '../../utils/AuthContext';

function GerenciaDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <div className="w-full max-w-4xl">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4 text-center">Dashboard de Gerencia</h1>
          <p className="text-gray-300 text-center mb-4">
            Bienvenido al panel de control de gerencia, {user.username}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-600 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Informes Ejecutivos</h3>
            <p className="text-blue-100">Visualiza reportes y métricas clave</p>
          </div>
          
          <div className="bg-green-600 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Gestión de Equipos</h3>
            <p className="text-green-100">Administra personal y departamentos</p>
          </div>
          
          <div className="bg-purple-600 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Análisis Financiero</h3>
            <p className="text-purple-100">Controla presupuestos y gastos</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default GerenciaDashboard;
