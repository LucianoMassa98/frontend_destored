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

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole && user.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Evitar acceso si ya está autenticado
function AuthenticatedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (user) {
    return <Navigate to={user.rol === 'Admini' ? '/dashboard' : '/'} replace />;
  }

  return children;
}

// Definición de rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginPage />,
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
        path: 'dashboard',
        element: (
          <ProtectedRoute requiredRole="Admini">
            <Dashboard />
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
