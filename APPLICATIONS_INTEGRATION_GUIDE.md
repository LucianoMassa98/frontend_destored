# Integración del Sistema de Aplicaciones - Guía de Rutas

Este documento describe cómo integrar las nuevas páginas del sistema de aplicaciones en el enrutamiento existente de la aplicación.

## Nuevas Páginas Creadas

### Para Profesionales
- `MyApplicationsPage.jsx` - Página para ver y gestionar las aplicaciones del profesional

### Para Clientes  
- `ProjectApplicationsPage.jsx` - Página para ver y gestionar aplicaciones de un proyecto específico

### Para Administradores
- `ApplicationsManagementPage.jsx` - Página para administrar todas las aplicaciones del sistema

## Nuevos Componentes
- `ApplicationDetails.jsx` - Componente detallado para mostrar y accionar sobre aplicaciones
- `ApplicationsList.jsx` - Lista de aplicaciones con filtros y paginación
- `ApplicationsStats.jsx` - Estadísticas de aplicaciones para dashboards

## Nuevos Servicios
- `applicationService.js` - Servicio completo para gestionar aplicaciones
- Extensiones a `projectService.js` - Funciones para aplicar a proyectos

## Nuevos Hooks
- `useApplications.js` - Hooks personalizados para gestionar aplicaciones
- Extensiones a `useProjects.js` - Hooks para aplicaciones a proyectos

## Rutas Sugeridas para Agregar

### Rutas de Profesional
```javascript
{
  path: "/profesional/mis-aplicaciones",
  element: <MyApplicationsPage />,
}
```

### Rutas de Cliente
```javascript
{
  path: "/cliente/proyecto/:projectId/aplicaciones", 
  element: <ProjectApplicationsPage />,
}
```

### Rutas de Administrador
```javascript
{
  path: "/admin/aplicaciones",
  element: <ApplicationsManagementPage />,
}
```

## Navegación Sugerida

### En el menú de Profesional:
- Agregar enlace "Mis Aplicaciones" que dirija a `/profesional/mis-aplicaciones`

### En el menú de Cliente:
- En la vista de detalles de proyecto, agregar botón "Ver Aplicaciones" que dirija a `/cliente/proyecto/{id}/aplicaciones`

### En el menú de Admin:
- Agregar enlace "Gestión de Aplicaciones" que dirija a `/admin/aplicaciones`

## Funcionalidades Implementadas

### Ciclo Completo de Aplicaciones
1. **Aplicar a Proyecto** - Los profesionales pueden aplicar con formulario completo
2. **Ver Aplicaciones** - Tanto profesionales como clientes pueden ver sus aplicaciones
3. **Evaluar** - Los clientes pueden evaluar aplicaciones (prioridad y comentarios)
4. **Aprobar** - Los clientes pueden aprobar aplicaciones (tarifa final y notas)
5. **Rechazar** - Los clientes pueden rechazar aplicaciones (con razón y feedback)
6. **Retirar** - Los profesionales pueden retirar sus aplicaciones
7. **Recalcular Prioridad** - Sistema automático de priorización

### Filtros y Búsqueda
- Filtro por estado (pending, under_review, accepted, rejected, withdrawn, expired)
- Filtro por fechas (desde/hasta)
- Filtro por rango de tarifas
- Paginación completa
- Búsqueda por profesional o proyecto

### Estadísticas
- Total de aplicaciones
- Distribución por estado
- Tiempo promedio de respuesta
- Tasas de aceptación/rechazo
- Indicadores de rendimiento

## Permisos y Seguridad

### Profesionales
- Solo pueden ver sus propias aplicaciones
- Solo pueden retirar aplicaciones en estado 'pending' o 'under_review'
- No pueden ver detalles de otras aplicaciones

### Clientes
- Solo pueden ver aplicaciones de sus proyectos
- Pueden evaluar, aprobar y rechazar aplicaciones
- Pueden recalcular prioridades

### Administradores
- Pueden ver todas las aplicaciones del sistema
- Acceso completo a estadísticas
- Pueden realizar acciones administrativas

## Variables de Entorno Requeridas

Asegurate de que tienes configuradas las mismas variables de entorno que ya estás usando:
- `VITE_DEV_API_URL`
- `VITE_TEST_API_URL` 
- `VITE_PROD_API_URL`
- `VITE_MODE`

## Endpoints del Backend Integrados

Todos los endpoints de la documentación proporcionada están integrados:

- `GET /api/v1/applications` - Obtener aplicaciones con filtros
- `GET /api/v1/applications/stats` - Estadísticas
- `GET /api/v1/applications/{id}` - Aplicación específica
- `PUT /api/v1/applications/{id}/evaluate` - Evaluar
- `PUT /api/v1/applications/{id}/approve` - Aprobar
- `PUT /api/v1/applications/{id}/reject` - Rechazar
- `PUT /api/v1/applications/{id}/withdraw` - Retirar
- `POST /api/v1/applications/{id}/calculate-priority` - Recalcular prioridad

## Testing

Para probar el sistema:

1. Como profesional: navega a "Mis Aplicaciones" y verifica que puedes ver tus aplicaciones
2. Como cliente: ve a un proyecto y accede a "Ver Aplicaciones" 
3. Como admin: accede a "Gestión de Aplicaciones" para ver el dashboard completo
4. Prueba las acciones de evaluar, aprobar, rechazar y retirar aplicaciones
5. Verifica que los filtros y la paginación funcionan correctamente
6. Confirma que las estadísticas se muestran correctamente

## Notas Importantes

- Todos los componentes están diseñados con Tailwind CSS para consistencia visual
- Se incluyen notificaciones para feedback del usuario
- Los componentes manejan estados de carga y error
- La paginación está optimizada para grandes volúmenes de datos
- El sistema es completamente responsive

## Próximos Pasos

1. Integrar las rutas en tu sistema de enrutamiento existente
2. Agregar los enlaces de navegación en los menús correspondientes
3. Probar la funcionalidad completa con datos reales del backend
4. Ajustar estilos si es necesario para mantener consistencia visual
5. Implementar notificaciones en tiempo real (WebSocket) si se requiere
