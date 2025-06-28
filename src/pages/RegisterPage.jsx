export default function RegisterPage() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Nombre de usuario
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nombre de usuario" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Correo electrónico
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Correo electrónico" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="**********" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Registrarse
                            </button>
                            <a className="inline-block align-baseline font-bold text-sm text-purple-600 hover:text-purple-800" href="#">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            ¿Ya tienes una cuenta?
                            <a href="login" className="text-purple-600 hover:text-purple-800 font-bold">
                                Inicia sesión
                            </a >
                        </p >
                    </div >
                </div >
            </div >
        </>
    )
}