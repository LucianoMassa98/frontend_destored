import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './utils/AuthContext.jsx';

// Pages
import Dashboard from './pages/Admin/Dashboard.jsx';
import GerenciaDashboard from './pages/Gerencia/Dashboard.jsx';
import ProfesionalHome from './pages/Profesional/Home.jsx';
import ClienteHome from './pages/Cliente/Home.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

// Loader centralizado
function Loader() {
  return (
    <div className="flex-grow flex items-center justify-center h-full">
      <div className="text-white">Cargando...</div>
    </div>
  );
}

// Protección por autenticación + rol
function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.toLowerCase() || 'client';
  
  if (requiredRole && userRole !== requiredRole) {
    console.log(`Rol incorrecto. Requerido: ${requiredRole}, Usuario: ${userRole}`);
    return <Navigate to="/" replace />;
  }

  return children;
}

// Evitar acceso si ya está autenticado
function AuthenticatedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (user) {
    // Redirigir según el rol del usuario
    const role = user.role?.toLowerCase() || 'client';
    switch (role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'gerencia':
        return <Navigate to="/gerencia/dashboard" replace />;
      case 'professional':
        return <Navigate to="/profesional/home" replace />;
      case 'client':
        return <Navigate to="/cliente/home" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
}

// Componente para manejar la ruta raíz
function RootRedirect() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (user) {
    // Si el usuario está autenticado, redirigir según su rol
    switch (user.role?.toLowerCase() || 'client') {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'gerencia':
        return <Navigate to="/gerencia/dashboard" replace />;
      case 'professional':
        return <Navigate to="/profesional/home" replace />;
      case 'client':
        return <Navigate to="/cliente/home" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // Si no está autenticado, mostrar login
  return <Navigate to="/login" replace />;
}

// Definición de rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <RootRedirect />,
      },
      {
        path: 'register',
        element: (
          <AuthenticatedRoute>
            <RegisterPage />
          </AuthenticatedRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <AuthenticatedRoute>
            <LoginPage />
          </AuthenticatedRoute>
        ),
      },
      {
        path: 'admin/dashboard',
        element: (
          <ProtectedRoute requiredRole="admin">
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'gerencia/dashboard',
        element: (
          <ProtectedRoute requiredRole="gerencia">
            <GerenciaDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profesional/home',
        element: (
          <ProtectedRoute requiredRole="professional">
            <ProfesionalHome />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cliente/home',
        element: (
          <ProtectedRoute requiredRole="client">
            <ClienteHome />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

// Render app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
