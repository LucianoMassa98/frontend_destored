import { useState } from 'react';
import useRegister from '../hooks/useRegister';

export default function RegisterPage() {
    const [touched, setTouched] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rol, setRol] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [urlPortafolio, setUrlPortafolio] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errors, setErrors] = useState({});

    // Usar registerBasic para compatibilidad con el formulario actual
    const { loading, error, responseData, registerBasic } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación básica
        if (!email || !password || !confirmPassword || !rol || !firstname || !lastname) {
            setErrors({ form: 'Por favor, complete todos los campos obligatorios.' });
            return;
        }

        if (password !== confirmPassword) {
            setErrors({ form: 'Las contraseñas no coinciden.' });
            return;
        }

        if (passwordError) {
            setErrors({ ...errors, password: passwordError });
            return;
        }

        try {
            // Mapear el rol del formulario al valor esperado por la API
            const rolApi = rol === 'Profesional Digital' ? 'profesional' : 'usuario';
            
            // Generar username si no se proporciona
            const usernameToUse = username || email.split('@')[0];

            // Datos adicionales para el registro
            const additionalData = {
                firstname,
                lastname,
                username: usernameToUse
            };

            // Si es profesional y tiene URL de portafolio, incluirla
            if (rolApi === 'profesional' && urlPortafolio) {
                additionalData.urlPortafolio = urlPortafolio;
            }

            await registerBasic(email, password, rolApi, additionalData);

            // Limpiar errores si el registro es exitoso
            setErrors({});
        } catch (err) {
            console.error('Error durante el registro:', err);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1a1a2e' }}>
                <div className="p-8 rounded shadow-2xl w-full max-w-sm" style={{ backgroundColor: '#16213e' }}>
                    <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
                        Registrarse
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* Campo Nombre */}
                        <div className="mb-4">
                            <label className="block text-white text-base font-semibold mb-2" htmlFor="firstname">
                                Nombre *
                            </label>
                            <div className="relative">
                                <input
                                    className={`shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 ${touched.firstname && errors.firstname ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#8b5cf6]'
                                        } bg-[#283a5e] placeholder-gray-400 text-lg`}
                                    id="firstname"
                                    type="text"
                                    placeholder="Tu nombre"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    onBlur={() => {
                                        setTouched({ ...touched, firstname: true });
                                        if (!firstname) {
                                            setErrors({ ...errors, firstname: 'El nombre es requerido.' });
                                        } else {
                                            const newErrors = { ...errors };
                                            delete newErrors.firstname;
                                            setErrors(newErrors);
                                        }
                                    }}
                                />
                                {touched.firstname && errors.firstname && (
                                    <div style={{ backgroundColor: 'red' }} className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-white text-xs rounded tooltip">
                                        {errors.firstname}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Campo Apellido */}
                        <div className="mb-4">
                            <label className="block text-white text-base font-semibold mb-2" htmlFor="lastname">
                                Apellido *
                            </label>
                            <div className="relative">
                                <input
                                    className={`shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 ${touched.lastname && errors.lastname ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#8b5cf6]'
                                        } bg-[#283a5e] placeholder-gray-400 text-lg`}
                                    id="lastname"
                                    type="text"
                                    placeholder="Tu apellido"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    onBlur={() => {
                                        setTouched({ ...touched, lastname: true });
                                        if (!lastname) {
                                            setErrors({ ...errors, lastname: 'El apellido es requerido.' });
                                        } else {
                                            const newErrors = { ...errors };
                                            delete newErrors.lastname;
                                            setErrors(newErrors);
                                        }
                                    }}
                                />
                                {touched.lastname && errors.lastname && (
                                    <div style={{ backgroundColor: 'red' }} className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-white text-xs rounded tooltip">
                                        {errors.lastname}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Campo Username (opcional) */}
                        <div className="mb-4">
                            <label className="block text-white text-base font-semibold mb-2" htmlFor="username">
                                Nombre de usuario (opcional)
                            </label>
                            <div className="relative">
                                <input
                                    className={`shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] bg-[#283a5e] placeholder-gray-400 text-lg`}
                                    id="username"
                                    type="text"
                                    placeholder="Nombre de usuario único"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <small className="text-gray-400 text-xs">
                                    Si no se proporciona, se usará la parte del email antes del @
                                </small>
                            </div>
                        </div>

                        {/* Campo URL Portafolio (solo para profesionales) */}
                        {rol === 'Profesional Digital' && (
                            <div className="mb-4">
                                <label className="block text-white text-base font-semibold mb-2" htmlFor="urlPortafolio">
                                    URL del Portafolio (opcional)
                                </label>
                                <div className="relative">
                                    <input
                                        className={`shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 ${touched.urlPortafolio && errors.urlPortafolio ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#8b5cf6]'
                                            } bg-[#283a5e] placeholder-gray-400 text-lg`}
                                        id="urlPortafolio"
                                        type="url"
                                        placeholder="https://tu-portafolio.com"
                                        value={urlPortafolio}
                                        onChange={(e) => setUrlPortafolio(e.target.value)}
                                        onBlur={() => {
                                            setTouched({ ...touched, urlPortafolio: true });
                                            if (urlPortafolio && !/^https?:\/\/.+\..+/.test(urlPortafolio)) {
                                                setErrors({ ...errors, urlPortafolio: 'Debe ser una URL válida (ej: https://tu-sitio.com)' });
                                            } else {
                                                const newErrors = { ...errors };
                                                delete newErrors.urlPortafolio;
                                                setErrors(newErrors);
                                            }
                                        }}
                                    />
                                    {touched.urlPortafolio && errors.urlPortafolio && (
                                        <div style={{ backgroundColor: 'red' }} className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-white text-xs rounded tooltip">
                                            {errors.urlPortafolio}
                                        </div>
                                    )}
                                    <small className="text-gray-400 text-xs">
                                        Si no tienes portafolio aún, puedes dejarlo vacío y actualizarlo después
                                    </small>
                                </div>
                            </div>
                        )}

                        {/* Campo Email */}
                        <div className="mb-4">
                            <label className="block text-white text-base font-semibold mb-2" htmlFor="email">
                                Correo electrónico *
                            </label>
                            <div className="relative">
                                <input
                                    className={`shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 ${touched.email && errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#8b5cf6]'
                                        } bg-[#283a5e] placeholder-gray-400 text-lg`}
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
                                />
                                {touched.email && errors.email && (
                                    <div style={{ backgroundColor: 'red' }} className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-white text-xs rounded tooltip">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Campo Contraseña */}
                        <div className="mb-4">
                            <label className="block text-white text-base font-semibold mb-2" htmlFor="password">
                                Contraseña *
                            </label>
                            <div className="relative">
                                <input
                                    className={`shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 ${touched.password && (errors.password || passwordError) ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#8b5cf6]'
                                        } bg-[#283a5e] placeholder-gray-400 text-lg`}
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña segura"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => {
                                        setTouched({ ...touched, password: true });
                                        if (!password) {
                                            setPasswordError('La contraseña es requerida.');
                                        } else if (password.length < 8) {
                                            setPasswordError('La contraseña debe tener al menos 8 caracteres.');
                                        } else if (!/(?=.*[a-z])/.test(password)) {
                                            setPasswordError('La contraseña debe contener al menos una letra minúscula.');
                                        } else if (!/(?=.*[A-Z])/.test(password)) {
                                            setPasswordError('La contraseña debe contener al menos una letra mayúscula.');
                                        } else if (!/(?=.*\d)/.test(password)) {
                                            setPasswordError('La contraseña debe contener al menos un número.');
                                        } else if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password)) {
                                            setPasswordError('La contraseña debe contener al menos un símbolo.');
                                        } else {
                                            setPasswordError('');
                                            const newErrors = { ...errors };
                                            delete newErrors.password;
                                            setErrors(newErrors);
                                        }
                                    }}
                                />
                                {touched.password && (errors.password || passwordError) && (
                                    <div style={{ backgroundColor: 'red' }} className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-white text-xs rounded tooltip">
                                        {errors.password || passwordError}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Campo Confirmar Contraseña */}
                        <div className="mb-4">
                            <label className="block text-white text-base font-semibold mb-2" htmlFor="confirmPassword">
                                Confirmar Contraseña *
                            </label>
                            <div className="relative">
                                <input
                                    className={`shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#8b5cf6]'
                                        } bg-[#283a5e] placeholder-gray-400 text-lg`}
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirma tu contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onBlur={() => {
                                        setTouched({ ...touched, confirmPassword: true });
                                        if (!confirmPassword) {
                                            setErrors({ ...errors, confirmPassword: 'Confirmar contraseña es requerido.' });
                                        } else if (password !== confirmPassword) {
                                            setErrors({ ...errors, confirmPassword: 'Las contraseñas no coinciden.' });
                                        } else {
                                            const newErrors = { ...errors };
                                            delete newErrors.confirmPassword;
                                            setErrors(newErrors);
                                        }
                                    }}
                                />
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <div style={{ backgroundColor: 'red' }} className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-white text-xs rounded tooltip">
                                        {errors.confirmPassword}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Campo Rol */}
                        <div className="mb-4">
                            <label className="block text-white text-base font-semibold mb-2" htmlFor="rol">
                                Rol *
                            </label>
                            <div className="relative">
                                <select
                                    className={`shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] bg-[#283a5e] placeholder-gray-400 text-lg`}
                                    id="rol"
                                    value={rol}
                                    onChange={(e) => setRol(e.target.value)}
                                    onBlur={() => {
                                        setTouched({ ...touched, rol: true });
                                        if (!rol) {
                                            setErrors({ ...errors, rol: 'El rol es requerido.' });
                                        } else {
                                            const newErrors = { ...errors };
                                            delete newErrors.rol;
                                            setErrors(newErrors);
                                        }
                                    }}
                                >
                                    <option value="">Selecciona un rol</option>
                                    <option value="Profesional Digital">Profesional Digital</option>
                                    <option value="Cliente">Cliente</option>
                                </select>
                                {touched.rol && errors.rol && (
                                    <div style={{ backgroundColor: 'red' }} className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-white text-xs rounded tooltip">
                                        {errors.rol}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <button
                                className="bg-[#8b5cf6] hover:bg-[#7c4dff] text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 text-lg w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Registrando...' : 'Registrarse'}
                            </button>
                            
                            {/* Errores generales */}
                            {errors.form && (
                                <div className="text-red-500 text-sm mt-2 text-center">
                                    {errors.form}
                                </div>
                            )}
                            
                            {/* Error del hook */}
                            {error && (
                                <div className="text-red-500 text-sm mt-2 text-center">
                                    Error al registrar: {error.message || 'Algo salió mal'}
                                </div>
                            )}
                            
                            {/* Mensaje de éxito */}
                            {responseData && (
                                <div className="text-green-500 text-sm mt-2 text-center">
                                    ¡Registro exitoso! {responseData.message || 'Usuario registrado correctamente'}
                                </div>
                            )}
                            
                            <a className="inline-block align-baseline font-semibold text-sm text-[#8b5cf6] hover:text-[#7c4dff] transition duration-300 ease-in-out mt-4" href="login">
                                ¿Ya tienes una cuenta? Inicia sesión
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}