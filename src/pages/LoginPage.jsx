import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useLogin from './../hooks/useLogin';
import { useAuth } from '../utils/AuthContext';

const roleRoutes = {
  admin: '/admin/dashboard',
  gerencia: '/gerencia/dashboard',
  profesional: '/profesional/home',
  cliente: '/cliente/home'
};

export default function LoginPage() {
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginTrigger, setLoginTrigger] = useState(false);

  const { loading, error, responseData } = useLogin(
    loginTrigger ? email : '',
    loginTrigger ? password : ''
  );

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e && e.preventDefault();

    // Validar campos antes de disparar login
    if (email && password && !errors.email && !errors.password) {
      setLoginTrigger(true);
    }
  };

  useEffect(() => {
    if (responseData || error) {
      setLoginTrigger(false);
    }
  }, [responseData, error]);

  const redirectByRole = (user) => {
    const path = roleRoutes[user.rol] || '/';
    navigate(path);
  };

  useEffect(() => {
    if (responseData && responseData.user) {
      login(responseData.user, responseData.accessToken);
      redirectByRole(responseData.user);
    }
  }, [responseData, login, navigate]);

  return (
    <div className="flex flex-col flex-grow h-full min-h-screen items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#283a5e] to-[#8b5cf6] px-2 relative overflow-hidden">

      {/* Imagen decorativa en mobile */}
      <div
        className="absolute top-0 left-0 w-full h-40 md:hidden bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(/fondo.webp)' }}
      ></div>

      <div className="relative w-full max-w-xl bg-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-center backdrop-blur-md border border-white/20 mt-4 mb-4">

        {/* Imagen lateral en desktop */}
        <div
          className="absolute left-0 top-0 h-full w-[200px] bg-cover bg-center bg-no-repeat opacity-30 rounded-l-2xl hidden md:block"
          style={{ backgroundImage: 'url(/fondo.webp)' }}
        ></div>

        <div className="w-full md:pl-[220px] flex flex-col items-center">
          <img src="/Logo_Destored.svg" alt="Logo Destored" className="w-16 h-16 mb-2" />

          <h2 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow">
            Iniciar Sesión
          </h2>

          <form className="w-full max-w-md mx-auto space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-white text-base font-semibold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {
                  setTouched({ ...touched, email: true });
                  if (!email) {
                    setErrors({ ...errors, email: 'El email es requerido.' });
                  } else if (!/\S+@\S+\.\S+/.test(email)) {
                    setErrors({ ...errors, email: 'Formato de email inválido.' });
                  } else {
                    const newErrors = { ...errors };
                    delete newErrors.email;
                    setErrors(newErrors);
                  }
                }}
                className={`shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 ${
                  touched.email && errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'focus:ring-[#8b5cf6]'
                } bg-[#283a5e] placeholder-gray-400 text-lg`}
              />
              {touched.email && errors.email && (
                <div className="mt-1 px-3 py-1 bg-red-500 text-white text-xs rounded shadow text-center">
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-white text-base font-semibold mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña segura"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => {
                    setTouched({ ...touched, password: true });
                    if (!password) {
                      setErrors({ ...errors, password: 'La contraseña es requerida.' });
                    } else {
                      const newErrors = { ...errors };
                      delete newErrors.password;
                      setErrors(newErrors);
                    }
                  }}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 pr-12 text-white leading-tight focus:outline-none focus:ring-2 ${
                    touched.password && errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'focus:ring-[#8b5cf6]'
                  } bg-[#283a5e] placeholder-gray-400 text-lg`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 text-gray-300 hover:text-white focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  style={{ padding: 0 }}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <div className="mt-1 px-3 py-1 bg-red-500 text-white text-xs rounded shadow text-center">
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#8b5cf6] hover:bg-[#7c4dff] text-white font-bold py-3 px-6 rounded-lg w-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>

            <div className="flex flex-col md:flex-row justify-between items-center mt-2 gap-2">
              <a
                href="/recuperar"
                className="text-[#8b5cf6] hover:text-[#7c4dff] font-semibold text-sm transition"
              >
                ¿Olvidaste tu contraseña?
              </a>
              <a
                href="/register"
                className="text-[#8b5cf6] hover:text-[#7c4dff] font-semibold text-sm transition"
              >
                ¿No tienes cuenta? Regístrate
              </a>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-500 text-white text-sm rounded text-center shadow">
                Error al iniciar sesión: {error.message || 'Credenciales inválidas'}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
