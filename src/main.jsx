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

// Import your page components
import HomePage from './pages/HomePage.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  // Check if user is authenticated and has the required role
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.rol !== requiredRole) {
    return <Navigate to="/" replace />; // Redirect to home if wrong role
  }

  return children;
}

function AuthenticatedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  // If user is already logged in, redirect to dashboard or home
  if (user) {
    return <Navigate to={user.rol === 'Admini' ? '/dashboard' : '/'} replace />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
      // Protected route for admin dashboard
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute requiredRole="Admini">
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      // Add more protected routes as needed
      {
        path: '*',
        element: <Navigate to="/" replace />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);