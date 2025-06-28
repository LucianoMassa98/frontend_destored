import { useState } from 'react';

export default function LoginPage() {
    const [touched, setTouched] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    return (
        <>
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1a1a2e' }}> {/* Dark background */}
                <div className="p-8 rounded shadow-2xl w-full max-w-sm" style={{ backgroundColor: '#16213e' }}> {/* Contrasting form background */}
                    <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
                        Iniciar Sesión
                    </h2>
                    <form>
                        <div className="mb-6">
                            <label className="block text-white text-base font-semibold mb-2" htmlFor="email">
                                Email
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
                        <div className="mb-8">
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
                                    }
                                    }
                               />
                                {touched.password && errors.password && (
                                    <div style={{ backgroundColor: 'red' }} className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-white text-xs rounded tooltip">
                                        {errors.password}
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center"> {/* Use flex-col for stacked elements */}
                            <button
                                className="bg-[#8b5cf6] hover:bg-[#7c4dff] text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 text-lg w-full"
                                type="button"
                            >
                                Iniciar Sesión
                            </button>
                            <a className="inline-block align-baseline font-semibold text-sm text-[#8b5cf6] hover:text-[#7c4dff] transition duration-300 ease-in-out mt-4" href="#"> {/* Add margin-top */}
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}