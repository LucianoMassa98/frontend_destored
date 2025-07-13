import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRegister from '../hooks/useRegister';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const { loading, error, responseData, register } = useRegister();

  const userTypes = [
    {
      id: 'client',
      title: 'Cliente',
      description: 'Busco contratar profesionales digitales para mis proyectos',
      icon: '👤',
      features: ['Publicar proyectos', 'Contratar profesionales', 'Gestionar equipos', 'Seguimiento de proyectos']
    },
    {
      id: 'professional',
      title: 'Profesional Digital',
      description: 'Soy un profesional que quiere ofrecer mis servicios',
      icon: '💼',
      features: ['Crear portafolio', 'Aplicar a proyectos', 'Gestionar tarifas', 'Construir reputación']
    }
  ];

  const handleTypeSelect = (id) => {
    setSelectedType(id);
    setForm((prev) => ({
      ...prev,
      role: id
    }));
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedType('');
    setForm({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      role: '',
    });
    setErrors({});
    setTouched({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    if (e.target.name === 'password') {
      setShowPasswordRequirements(false);
    }
  };

  const handlePasswordFocus = () => {
    setShowPasswordRequirements(true);
  };

  const getPasswordRequirements = () => {
    const requirements = [
      { test: form.password.length >= 8, text: 'Mínimo 8 caracteres' },
      { test: /(?=.*[a-z])/.test(form.password), text: 'Una letra minúscula' },
      { test: /(?=.*[A-Z])/.test(form.password), text: 'Una letra mayúscula' },
      { test: /(?=.*\d)/.test(form.password), text: 'Un número' },
      { test: /(?=.*[@$!%*?&.#-_+=])/.test(form.password), text: 'Un carácter especial (@$!%*?&.#-_+=)' },
    ];
    return requirements;
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'El email es requerido.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Formato de email inválido.';
    
    if (!form.password) newErrors.password = 'La contraseña es requerida.';
    else if (form.password.length < 8) newErrors.password = 'Mínimo 8 caracteres.';
    else if (!/(?=.*[a-z])/.test(form.password)) newErrors.password = 'Debe contener al menos una letra minúscula.';
    else if (!/(?=.*[A-Z])/.test(form.password)) newErrors.password = 'Debe contener al menos una letra mayúscula.';
    else if (!/(?=.*\d)/.test(form.password)) newErrors.password = 'Debe contener al menos un número.';
    else if (!/(?=.*[@$!%*?&.#-_+=])/.test(form.password)) newErrors.password = 'Debe contener al menos un carácter especial (@$!%*?&.#-_+=).';
    
    if (!form.confirmPassword) newErrors.confirmPassword = 'Confirmar contraseña es requerido.';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    
    if (!form.firstName) newErrors.firstName = 'El nombre es requerido.';
    if (!form.lastName) newErrors.lastName = 'El apellido es requerido.';
    if (!form.role) newErrors.role = 'El rol es requerido.';
    
    // Validación del teléfono - debe ser formato internacional o local argentino
    if (form.phone && form.phone.trim() !== '') {
      const phonePattern = /^(\+54|54)?[0-9]{10}$/; // Formato argentino: +54XXXXXXXXXX o 54XXXXXXXXXX o XXXXXXXXXX (10 dígitos)
      if (!phonePattern.test(form.phone.replace(/\s|-/g, ''))) {
        newErrors.phone = 'El teléfono debe tener formato válido (ej: +5402644758561 o 2644758561)';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    setTouched({
      email: true, 
      password: true, 
      confirmPassword: true, 
      firstName: true,
      lastName: true,
      role: true,
      phone: true
    });
    if (Object.keys(newErrors).length > 0) return;

    try {
      console.log('Datos del formulario antes de enviar:', form);
      
      // Procesar el teléfono para asegurar formato correcto
      let processedPhone = '';
      if (form.phone && form.phone.trim() !== '') {
        // Limpiar el teléfono de espacios y guiones
        let cleanPhone = form.phone.replace(/\s|-/g, '');
        
        // Si no tiene código de país, agregar +54 para Argentina
        if (!cleanPhone.startsWith('+54') && !cleanPhone.startsWith('54')) {
          if (cleanPhone.length === 10) {
            processedPhone = `+54${cleanPhone}`;
          } else {
            processedPhone = cleanPhone;
          }
        } else {
          // Si ya tiene código de país, asegurar que comience con +
          if (cleanPhone.startsWith('54') && !cleanPhone.startsWith('+54')) {
            processedPhone = `+${cleanPhone}`;
          } else {
            processedPhone = cleanPhone;
          }
        }
      }
      
      const registerData = {
        email: form.email.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        role: form.role,
        phone: processedPhone,
        acceptTerms: true
      };

      console.log('Datos a enviar al registro:', registerData);

      const response = await register(registerData);
      setErrors({});
      
      // Verificar que el registro fue exitoso antes de redirigir
      if (response && (response.status === 'success' || response.message)) {
        console.log('Registro exitoso, redirigiendo al login...');
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: '¡Registro exitoso! Revisa tu email para verificar tu cuenta antes de iniciar sesión.',
              email: form.email 
            }
          });
        }, 2000); // Esperar 2 segundos para que el usuario vea el mensaje de éxito
      }
      
    } catch (err) {
      console.error('Error en handleSubmit:', err);
      // Error ya manejado por el hook
    }
  };

  // UI
  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#1a1a2e] to-[#283a5e]">
        <div className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-[#181828] p-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 text-center">¡Únete a Destored!</h1>
          <p className="text-lg text-gray-300 mb-10 text-center">Selecciona el tipo de cuenta que mejor se adapte a tus necesidades</p>
          <div className="grid md:grid-cols-2 gap-8">
            {userTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className="group bg-[#23234a] hover:bg-[#8b5cf6] transition-colors duration-300 rounded-2xl p-8 flex flex-col items-center border-2 border-transparent hover:border-[#fff] shadow-lg focus:outline-none"
                type="button"
              >
                <span className="text-7xl mb-4 group-hover:scale-110 transition-transform">{type.icon}</span>
                <span className="text-2xl font-bold text-white mb-2">{type.title}</span>
                <span className="text-gray-300 mb-4 text-center">{type.description}</span>
                <ul className="text-left w-full text-gray-400 text-sm mb-4">
                  {type.features.map((f, i) => (
                    <li key={i} className="flex items-center mb-1"><span className="text-green-400 mr-2">✓</span>{f}</li>
                  ))}
                </ul>
                <span className="mt-auto bg-[#8b5cf6] text-white px-6 py-2 rounded-lg font-semibold group-hover:bg-[#7c4dff] transition-colors">Continuar como {type.title}</span>
              </button>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="/login" className="text-[#8b5cf6] hover:text-[#7c4dff] transition-colors duration-300 text-lg">¿Ya tienes una cuenta? Inicia sesión</a>
          </div>
        </div>
      </div>
    );
  }

  // Formulario de registro con todos los campos requeridos
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#1a1a2e] to-[#283a5e]">
      <div className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl bg-[#181828] p-10">
        <button onClick={handleBack} className="mb-6 text-[#8b5cf6] hover:text-[#fff] flex items-center gap-2">
          <span>←</span> Cambiar tipo de cuenta
        </button>
        
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Registro como {selectedType === 'client' ? 'Cliente' : 'Profesional'}
          </h2>
          <p className="text-gray-300 text-sm">Completa tus datos para crear tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2" htmlFor="firstName">Nombre *</label>
              <input
                className={`w-full py-3 px-4 rounded-lg bg-[#23234a] text-white placeholder-gray-400 border-2 focus:outline-none ${touched.firstName && errors.firstName ? 'border-red-500' : 'border-transparent focus:border-[#8b5cf6]'}`}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Tu nombre"
                value={form.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.firstName && errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2" htmlFor="lastName">Apellido *</label>
              <input
                className={`w-full py-3 px-4 rounded-lg bg-[#23234a] text-white placeholder-gray-400 border-2 focus:outline-none ${touched.lastName && errors.lastName ? 'border-red-500' : 'border-transparent focus:border-[#8b5cf6]'}`}
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Tu apellido"
                value={form.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.lastName && errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2" htmlFor="email">Correo electrónico *</label>
            <input
              className={`w-full py-3 px-4 rounded-lg bg-[#23234a] text-white placeholder-gray-400 border-2 focus:outline-none ${touched.email && errors.email ? 'border-red-500' : 'border-transparent focus:border-[#8b5cf6]'}`}
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2" htmlFor="phone">Teléfono</label>
            <input
              className={`w-full py-3 px-4 rounded-lg bg-[#23234a] text-white placeholder-gray-400 border-2 focus:outline-none ${touched.phone && errors.phone ? 'border-red-500' : 'border-transparent focus:border-[#8b5cf6]'}`}
              id="phone"
              name="phone"
              type="tel"
              placeholder="Ej: +5402644758561 o 2644758561"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.phone && errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            <p className="text-gray-400 text-xs mt-1">Formato: +54 seguido de código de área y número</p>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2" htmlFor="password">Contraseña *</label>
            <input
              className={`w-full py-3 px-4 rounded-lg bg-[#23234a] text-white placeholder-gray-400 border-2 focus:outline-none ${touched.password && errors.password ? 'border-red-500' : 'border-transparent focus:border-[#8b5cf6]'}`}
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña segura"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handlePasswordFocus}
            />
            {touched.password && errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            
            {showPasswordRequirements && (
              <div className="mt-2 p-3 bg-gray-800/50 rounded-lg">
                <p className="text-white text-xs font-medium mb-2">Requisitos de contraseña:</p>
                {getPasswordRequirements().map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span className={`${req.test ? 'text-green-400' : 'text-gray-400'}`}>
                      {req.test ? '✓' : '○'}
                    </span>
                    <span className={`${req.test ? 'text-green-400' : 'text-gray-400'}`}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {!showPasswordRequirements && (
              <p className="text-gray-400 text-xs mt-1">Mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial (.@$!%*?&#-_+=)</p>
            )}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2" htmlFor="confirmPassword">Confirmar Contraseña *</label>
            <input
              className={`w-full py-3 px-4 rounded-lg bg-[#23234a] text-white placeholder-gray-400 border-2 focus:outline-none ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-transparent focus:border-[#8b5cf6]'}`}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirma tu contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.confirmPassword && errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8b5cf6] hover:bg-[#7c4dff] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none mt-6"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registrando...
              </span>
            ) : (
              'Crear cuenta'
            )}
          </button>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm text-center mt-4">
              Error al registrar: {error}
            </div>
          )}
          
          {responseData && (
            <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg text-sm text-center mt-4">
              ¡Registro exitoso! {responseData.message || 'Revisa tu email para verificar tu cuenta.'}
            </div>
          )}

          <div className="text-center mt-6">
            <a href="/login" className="text-[#8b5cf6] hover:text-[#7c4dff] transition-colors duration-300 text-sm">
              ¿Ya tienes una cuenta? Inicia sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
      