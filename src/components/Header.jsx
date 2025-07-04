import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { UserCircle, LogOut, Settings } from "lucide-react";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
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
                onClick={() => { setMenuOpen(false); /* Aquí iría navegación a configuración */ }}
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
