import { useState } from 'react';
import useRegister from '../hooks/useRegister';

export default function RegisterPage() {
    const [touched, setTouched] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rol, setRol] = useState('');
    const [errors, setErrors] = useState({});

    // Update: Use the correct aliases returned by the hook
    const { loading, error, responseData, register } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!email || !password || !confirmPassword || !rol || password !== confirmPassword) {
            setErrors({ form: 'Por favor, complete todos los campos y asegúrese de que las contraseñas coincidan.' });
 return;
        }
        // Update: Call the register function returned by the hook
 register(email, password, rol);
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1a1a2e' }}>
                <div className="p-8 rounded shadow-2xl w-full max-w-sm" style={{ backgroundColor: '#16213e' }}>
                    <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
                        Registrarse
                    </h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-white text-base font-semibold mb-2" htmlFor="email">
                                Correo electrónico
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

                        <div className="mb-4">
                            <label className="block text-white text-base font-semibold mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    className={`shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 ${touched.password && errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#8b5cf6]'
                                        } bg-[#283a5e] placeholder-gray-400 text-lg`}
                                    id="password"
                                    type="password"
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
                                />
                                {touched.password && errors.password && (
                                    <div style={{ backgroundColor: 'red' }} className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-white text-xs rounded tooltip">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-white text-base font-semibold mb-2" htmlFor="confirmPassword">
                                Confirmar Contraseña
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

                        <div className="mb-4">
                            <label className="block text-white text-base font-semibold mb-2" htmlFor="rol">
                                Rol
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
                                className="bg-[#8b5cf6] hover:bg-[#7c4dff] text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 text-lg w-full"
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Registrando...' : 'Registrarse'}
                            </button>
                            {error && (
                                <div className="text-red-500 text-sm mt-2">
                                    Error al registrar: {error.message || 'Algo salió mal'}
                                </div>
                            )}
                            {responseData && responseData.message && (
                                <div className="text-green-500 text-sm mt-2">
                                    {data.message}
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