import { Outlet } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import Loader from "./components/Loader.jsx"; // si lo dejás separado, sino usa el inline

function App() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 font-sans">
      {/* Header opcional */}
      {user && (
        <header className="w-full py-4 px-6 bg-gray-900 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Panel de Control</h1>
            <div>Bienvenido, {user.username}</div>
          </div>
        </header>
      )}

              <Outlet />


    </div>
  );
}

export default App;
