import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X, UserPlus, LogIn } from "lucide-react";
import { useAuth } from "./utils/AuthContext";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      {/* Only show header if user is not logged in */}
      {!user && (
        <header className="bg-black p-4 flex items-center justify-between shadow-md flex-wrap">
          <div className="flex items-center">
            <img
              src="/Logo_Destored.svg"
              alt="Logo Destored"
              className="w-12 h-12 mr-3"
            />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold flex items-center">
              <span className="text-white">DESTO</span>
              <span className="text-[#8b5cf6]">RED</span>
            </h1>
          </div>
          <div className="block lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          <nav
            className={`${
              isOpen ? "block" : "hidden"
            } w-full lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0 bg-black lg:bg-transparent p-4 lg:p-0 rounded-md`}
          >
            <ul className="flex flex-col lg:flex-row lg:gap-8 text-xl font-semibold text-white">
              <li>
                <Link 
                  to="/login" 
                  className="flex items-center px-3 py-2 rounded-md text-xl font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300 ease-in-out" 
                  onClick={toggleMenu}
                >
                  <LogIn className="mr-2" size={20} /> Iniciar Sesión
                </Link>
              </li>
              <li className="mt-2 lg:mt-0">
                <Link 
                  to="/register" 
                  className="flex items-center px-3 py-2 rounded-md text-xl font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300 ease-in-out" 
                  onClick={toggleMenu}
                >
                  <UserPlus className="mr-2" size={20} /> Registrarse
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      )}
      
      <main className={`flex-grow container mx-auto px-4 ${!user ? 'mt-8' : 'mt-0'}`}>
        <Outlet /> {/* This is where your nested routes will render */}
      </main>
    </div>
  );
}

export default App;