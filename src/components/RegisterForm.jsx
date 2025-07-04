import { useState } from 'react';
import useRegister from '../hooks/useRegister';

export default function RegisterForm({ onSuccess }) {
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

  const { loading, error, responseData, registerBasic } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const rolApi = rol === 'Profesional Digital' ? 'profesional' : 'usuario';
      const usernameToUse = username || email.split('@')[0];
      const additionalData = { firstname, lastname, username: usernameToUse };
      if (rolApi === 'profesional' && urlPortafolio) {
        additionalData.urlPortafolio = urlPortafolio;
      }
      await registerBasic(email, password, rolApi, additionalData);
      setErrors({});
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error durante el registro:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ...campos del formulario igual que en RegisterPage... */}
      {/* Puedes copiar los campos del RegisterPage aquí, adaptando los handlers si es necesario */}
      {/* Botón y mensajes de error/éxito */}
      <button
        className="bg-[#8b5cf6] hover:bg-[#7c4dff] text-white font-bold py-3 px-6 rounded-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
      {errors.form && (
        <div className="text-red-500 text-sm mt-2 text-center">{errors.form}</div>
      )}
      {error && (
        <div className="text-red-500 text-sm mt-2 text-center">Error al registrar: {error.message || 'Algo salió mal'}</div>
      )}
      {responseData && (
        <div className="text-green-500 text-sm mt-2 text-center">¡Registro exitoso! {responseData.message || 'Usuario registrado correctamente'}</div>
      )}
    </form>
  );
}
