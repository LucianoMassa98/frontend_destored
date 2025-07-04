import { Outlet } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import Loader from "./components/Loader.jsx";
import Header from "./components/Header.jsx";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 font-sans">
      {/* Header global */}
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
