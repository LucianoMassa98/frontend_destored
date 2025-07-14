import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserCircle, LogOut, Settings, Home, Briefcase, FileText } from "lucide-react";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const handleSettings = () => {
    setMenuOpen(false);
    navigate('/profile/settings');
  };

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const getHomeRoute = () => {
    const role = user?.role?.toLowerCase();
    if (role === 'client' || role === 'cliente') return '/cliente/home';
    if (role === 'professional' || role === 'profesional') return '/profesional/home';
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'gerencia') return '/gerencia/dashboard';
    return '/';
  };

  const getProjectsRoute = () => {
    const role = user?.role?.toLowerCase();
    if (role === 'client' || role === 'cliente') return '/cliente/proyectos';
    if (role === 'professional' || role === 'profesional') return '/profesional/proyectos';
    return null;
  };

  const getApplicationsRoute = () => {
    const role = user?.role?.toLowerCase();
    if (role === 'professional' || role === 'profesional') return '/profesional/aplicaciones';
    return null;
  };

  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-4 py-2 md:px-8">
      <div className="flex items-center gap-2">
        <img src="/Logo_Destored.svg" alt="Logo" className="h-10 w-auto" />
        <span className="font-bold text-lg text-gray-800 hidden sm:block">Destored</span>
      </div>
      {isAuthenticated && user && (
        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <UserCircle className="w-7 h-7 text-gray-700" />
            <span className="hidden sm:block font-medium text-gray-700">{user.username || user.email}</span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50 animate-fade-in">
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => handleNavigation(getHomeRoute())}
              >
                <Home className="w-5 h-5" />
                Inicio
              </button>
              
              {getProjectsRoute() && (
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={() => handleNavigation(getProjectsRoute())}
                >
                  <Briefcase className="w-5 h-5" />
                  Proyectos
                </button>
              )}

              {getApplicationsRoute() && (
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={() => handleNavigation(getApplicationsRoute())}
                >
                  <FileText className="w-5 h-5" />
                  Mis Aplicaciones
                </button>
              )}

              <div className="border-t border-gray-200 my-1"></div>
              
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={handleSettings}
              >
                <Settings className="w-5 h-5" />
                Configuración
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
