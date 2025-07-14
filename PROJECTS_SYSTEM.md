# Sistema de Gestión de Proyectos - Destored

## Descripción

Se ha implementado un sistema completo de gestión de proyectos que permite a los clientes crear y gestionar proyectos, y a los profesionales buscar, aplicar y gestionar sus aplicaciones a proyectos.

## Funcionalidades Implementadas

### Para Clientes (role: 'client')

1. **Crear Proyectos** - `/cliente/proyectos`
   - Formulario completo para crear nuevos proyectos
   - Campos: título, descripción, categoría, presupuesto, fecha límite, habilidades requeridas, trabajo remoto
   - Validaciones en frontend

2. **Gestionar Proyectos**
   - Ver todos sus proyectos creados
   - Editar proyectos existentes
   - Filtrar por estado
   - Ver detalles del proyecto y aplicaciones recibidas

3. **Revisar Aplicaciones**
   - Ver todas las aplicaciones recibidas para cada proyecto
   - Información detallada de cada profesional candidato
   - Estado de aplicaciones (pendiente, aceptada, rechazada)

### Para Profesionales (role: 'professional')

1. **Buscar Proyectos** - `/profesional/proyectos`
   - Ver todos los proyectos disponibles
   - Filtros avanzados: categoría, presupuesto, trabajo remoto, fecha, etc.
   - Paginación
   - Ordenamiento

2. **Aplicar a Proyectos**
   - Formulario de aplicación con carta de presentación
   - Propuesta de tarifa y timeline
   - Fecha de inicio disponible

3. **Gestionar Aplicaciones** - `/profesional/aplicaciones`
   - Ver todas sus aplicaciones enviadas
   - Estado de cada aplicación
   - Filtrar por estado
   - Retirar aplicaciones pendientes

## Estructura de Archivos Creados

### Servicios
- `src/services/projectService.js` - Servicio para todas las operaciones de API

### Hooks
- `src/hooks/useProjects.js` - Hooks personalizados para gestión de proyectos

### Componentes
- `src/components/ProjectCard.jsx` - Tarjeta de proyecto reutilizable
- `src/components/ProjectForm.jsx` - Formulario para crear/editar proyectos
- `src/components/ApplicationForm.jsx` - Formulario para aplicar a proyectos
- `src/components/ProjectFilters.jsx` - Filtros de búsqueda de proyectos
- `src/components/ProjectDetails.jsx` - Modal de detalles de proyecto

### Páginas
- `src/pages/Cliente/ProjectsPage.jsx` - Página principal de proyectos para clientes
- `src/pages/Profesional/ProjectsPage.jsx` - Página de búsqueda de proyectos para profesionales
- `src/pages/Profesional/MyApplicationsPage.jsx` - Página de aplicaciones del profesional

## Navegación

El sistema se integra completamente con la navegación existente:

- Header actualizado con enlaces a proyectos según el rol del usuario
- Páginas Home actualizadas con acciones rápidas
- Rutas protegidas por rol implementadas

## API Endpoints Utilizados

- `GET /api/v1/projects` - Obtener proyectos públicos
- `GET /api/v1/projects/my-projects` - Proyectos del cliente autenticado
- `GET /api/v1/projects/available` - Proyectos disponibles para profesionales
- `GET /api/v1/projects/{id}` - Detalles de un proyecto
- `POST /api/v1/projects` - Crear nuevo proyecto
- `PUT /api/v1/projects/{id}` - Actualizar proyecto
- `POST /api/v1/projects/{id}/apply` - Aplicar a proyecto
- `GET /api/v1/projects/{id}/applications` - Aplicaciones de un proyecto

## Funciones Principales

### useProjects Hook
```javascript
const { projects, loading, error, pagination, refetch } = useProjects(filters);
const { projects, loading, error, refetch } = useMyProjects(status);
const { projects, loading, error, pagination, refetch } = useAvailableProjects(page, limit);
const { createProject, loading, error } = useCreateProject();
const { updateProject, loading, error } = useUpdateProject();
const { applyToProject, loading, error } = useApplyToProject();
```

### Filtros Disponibles
- Categoría
- Estado del proyecto
- Rango de presupuesto
- Trabajo remoto
- Ordenamiento por fecha, presupuesto, título

## Estilos y UX

- Diseño responsivo con Tailwind CSS
- Animaciones suaves para interacciones
- Estados de carga y error bien manejados
- Notificaciones de éxito/error
- Componentes reutilizables y modulares

## Seguridad

- Rutas protegidas por autenticación
- Validación de roles del usuario
- Sanitización de datos en formularios
- Manejo seguro de tokens de autenticación

## Estados de Proyecto

- **open**: Abierto para aplicaciones
- **in_progress**: En desarrollo
- **completed**: Completado
- **cancelled**: Cancelado
- **paused**: Pausado

## Estados de Aplicación

- **pending**: Pendiente de revisión
- **accepted**: Aceptada por el cliente
- **rejected**: Rechazada
- **withdrawn**: Retirada por el profesional

## Próximas Mejoras Recomendadas

1. Implementar sistema de chat entre cliente y profesional
2. Sistema de ratings y reviews
3. Pagos integrados
4. Notificaciones en tiempo real
5. Dashboard con estadísticas avanzadas
6. Sistema de archivos adjuntos
7. Calendario de entregas y milestones
