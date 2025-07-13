# Documentación de Autenticación - Destored Frontend

## Endpoints de Autenticación Implementados

Esta aplicación integra todos los endpoints de autenticación proporcionados por la API backend.

### 1. Registro de Usuario
- **Endpoint:** `POST /api/v1/auth/register`
- **Componente:** `RegisterPage.jsx`
- **Funcionalidad:** Permite a nuevos usuarios crear una cuenta

### 2. Inicio de Sesión
- **Endpoint:** `POST /api/v1/auth/login`
- **Componente:** `LoginPage.jsx`
- **Funcionalidad:** Autenticación de usuarios existentes

### 3. Verificación de Email
- **Endpoint:** `POST /api/v1/auth/verify-email`
- **Componente:** `VerifyEmailPage.jsx`
- **Ruta:** `/verify-email?token=TOKEN`
- **Funcionalidad:** Verifica el email del usuario con el token enviado por correo

### 4. Reenvío de Verificación
- **Endpoint:** `POST /api/v1/auth/resend-verification`
- **Componente:** `ResendVerificationPage.jsx`
- **Ruta:** `/resend-verification`
- **Funcionalidad:** Reenvía el email de verificación

### 5. Recuperación de Contraseña
- **Endpoint:** `POST /api/v1/auth/forgot-password`
- **Componente:** `ForgotPasswordPage.jsx`
- **Ruta:** `/forgot-password`
- **Funcionalidad:** Solicita reset de contraseña enviando email con instrucciones

### 6. Reset de Contraseña
- **Endpoint:** `POST /api/v1/auth/reset-password`
- **Componente:** `ResetPasswordPage.jsx`
- **Ruta:** `/reset-password?token=TOKEN`
- **Funcionalidad:** Permite establecer nueva contraseña con token válido

### 7. Cambio de Contraseña
- **Endpoint:** `POST /api/v1/auth/change-password`
- **Componente:** `ChangePasswordForm.jsx`
- **Ubicación:** Dentro de `ProfileSettingsPage.jsx`
- **Funcionalidad:** Cambio de contraseña para usuarios autenticados

### 8. Refresh Token
- **Endpoint:** `POST /api/v1/auth/refresh`
- **Implementación:** Automática en `AuthContext.jsx`
- **Funcionalidad:** Refresco automático de tokens de acceso

## Estructura de Archivos

```
src/
├── services/
│   └── authService.js          # Servicio con todos los endpoints
├── utils/
│   └── AuthContext.jsx         # Contexto de autenticación global
├── hooks/
│   ├── useLogin.js            # Hook para login
│   ├── useRegister.js         # Hook para registro
│   ├── useEmailVerification.js # Hook para verificación de email
│   ├── usePasswordReset.js    # Hook para reset de contraseña
│   └── useTokenRefresh.js     # Hook para refresh automático
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── VerifyEmailPage.jsx
│   ├── ResendVerificationPage.jsx
│   ├── ForgotPasswordPage.jsx
│   ├── ResetPasswordPage.jsx
│   └── ProfileSettingsPage.jsx
└── components/
    ├── ChangePasswordForm.jsx
    └── Notification.jsx       # Sistema de notificaciones
```

## Funcionalidades Implementadas

### Gestión de Tokens
- Almacenamiento seguro en localStorage
- Refresh automático cada 4 minutos
- Validación de expiración
- Limpieza automática en logout

### Experiencia de Usuario
- Notificaciones visuales de éxito/error
- Validación de formularios en tiempo real
- Redireccionamiento automático post-autenticación
- Mensajes de estado descriptivos

### Seguridad
- Validación de tokens JWT
- Manejo seguro de refresh tokens
- Logout automático en caso de tokens inválidos
- Protección de rutas por rol

### Navegación
- Rutas protegidas por autenticación
- Redirección automática según rol de usuario
- Enlaces contextuales (ej: "¿Olvidaste tu contraseña?")

## Uso en Componentes

### AuthContext
```jsx
import { useAuth } from '../utils/AuthContext';

const { 
  user, 
  login, 
  logout, 
  register,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  changePassword,
  loading,
  isAuthenticated 
} = useAuth();
```

### Hooks Especializados
```jsx
import useEmailVerification from '../hooks/useEmailVerification';
import usePasswordReset from '../hooks/usePasswordReset';

const { verifyEmailToken, resendVerificationEmail } = useEmailVerification();
const { requestPasswordReset, resetPasswordWithToken } = usePasswordReset();
```

## Configuración de Rutas

Las rutas de autenticación están configuradas en `main.jsx`:

- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/verify-email` - Verificación de email
- `/resend-verification` - Reenvío de verificación
- `/forgot-password` - Solicitud de reset
- `/reset-password` - Reset de contraseña
- `/profile/settings` - Configuración de perfil (protegida)

## Manejo de Errores

Todos los endpoints incluyen manejo robusto de errores:
- Validación de campos requeridos
- Mensajes de error específicos de la API
- Feedback visual inmediato
- Logging detallado para debugging

## Testing

Para probar los endpoints:

1. **Registro:** Usar la página de registro para crear un nuevo usuario
2. **Verificación:** Revisar el email y hacer clic en el enlace de verificación
3. **Login:** Iniciar sesión con las credenciales
4. **Reset:** Probar el flujo completo de recuperación de contraseña
5. **Cambio:** Usar la configuración de perfil para cambiar contraseña

## Próximas Mejoras

- [ ] Implementar 2FA (autenticación de dos factores)
- [ ] Agregar login social (Google, Facebook)
- [ ] Implementar remember me persistente
- [ ] Agregar métricas de uso
- [ ] Implementar rate limiting en el frontend
