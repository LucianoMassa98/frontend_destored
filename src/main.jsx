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
import ClienteProjectsPage from './pages/Cliente/ProjectsPage.jsx';
import ProfesionalProjectsPage from './pages/Profesional/ProjectsPage.jsx';
import ProfesionalApplicationsPage from './pages/Profesional/MyApplicationsPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import VerifyEmailPage from './pages/VerifyEmailPage.jsx';
import ResendVerificationPage from './pages/ResendVerificationPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import ProfileSettingsPage from './pages/ProfileSettingsPage.jsx';

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
  
  if (requiredRole) {
    // Normalizar roles para compatibilidad
    let normalizedUserRole = userRole;
    let normalizedRequiredRole = requiredRole.toLowerCase();
    
    // Mapear roles en español a inglés para comparación
    if (userRole === 'profesional') normalizedUserRole = 'professional';
    if (userRole === 'cliente') normalizedUserRole = 'client';
    
    if (normalizedRequiredRole === 'profesional') normalizedRequiredRole = 'professional';
    if (normalizedRequiredRole === 'cliente') normalizedRequiredRole = 'client';
    
    // Debug logs
    console.log('ProtectedRoute Debug:', {
      userRole,
      normalizedUserRole,
      requiredRole,
      normalizedRequiredRole,
      user
    });
    
    // Permitir acceso si los roles coinciden en cualquier formato
    const hasAccess = normalizedUserRole === normalizedRequiredRole || 
                     userRole === requiredRole || 
                     userRole === normalizedRequiredRole ||
                     normalizedUserRole === requiredRole;
    
    if (!hasAccess) {
      console.log(`Acceso denegado. Requerido: ${requiredRole}, Usuario: ${userRole}`);
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

// Evitar acceso si ya está autenticado
function AuthenticatedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (user) {
    // Redirigir según el rol del usuario
    const role = user.role?.toLowerCase();
    switch (role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'gerencia':
        return <Navigate to="/gerencia/dashboard" replace />;
      case 'professional':
      case 'profesional':
        return <Navigate to="/profesional/home" replace />;
      case 'client':
      case 'cliente':
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
    switch (user.role?.toLowerCase()) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'gerencia':
        return <Navigate to="/gerencia/dashboard" replace />;
      case 'professional':
      case 'profesional':
        return <Navigate to="/profesional/home" replace />;
      case 'client':
      case 'cliente':
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
        path: 'verify-email',
        element: <VerifyEmailPage />,
      },
      {
        path: 'resend-verification',
        element: <ResendVerificationPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: 'profile/settings',
        element: (
          <ProtectedRoute>
            <ProfileSettingsPage />
          </ProtectedRoute>
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
          <ProtectedRoute requiredRole="profesional">
            <ProfesionalHome />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cliente/home',
        element: (
          <ProtectedRoute requiredRole="cliente">
            <ClienteHome />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cliente/proyectos',
        element: (
          <ProtectedRoute requiredRole="cliente">
            <ClienteProjectsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profesional/proyectos',
        element: (
          <ProtectedRoute requiredRole="profesional">
            <ProfesionalProjectsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profesional/aplicaciones',
        element: (
          <ProtectedRoute requiredRole="profesional">
            <ProfesionalApplicationsPage />
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
