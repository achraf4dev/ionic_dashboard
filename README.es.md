# Montserrat Dashboard

Un panel de control moderno y responsivo construido con Vue.js que proporciona una interfaz elegante para visualización, gestión y análisis de datos.

![Montserrat Dashboard](screenshot.png)

## Características

- **UI Moderna**: Interfaz limpia e intuitiva con diseño responsivo
- **Múltiples Paneles**:
  - Panel Principal
  - Panel Técnico
  - Panel de Negocio
- **Diseño Responsivo**: Completamente optimizado para dispositivos de escritorio, tabletas y móviles
- **Navegación Interactiva**:
  - Barra lateral colapsable
  - Navegación adaptada para móviles con overlay
  - Navegación por migas de pan
- **Gestión de Perfil de Usuario**: Gestión de configuración y preferencias de usuario
- **Funcionalidad de Búsqueda**: Búsqueda global para acceso rápido a recursos
- **Sistema de Notificaciones**: Alertas de notificaciones en tiempo real
- **Visualización de Datos**: Gráficos y diagramas interactivos

## Visualización de Datos y Gráficos

El Dashboard Montserrat presenta amplias capacidades de visualización de datos en todos los paneles:

### Gráficos del Panel Principal
- **Tarjetas de Resumen KPI**: Visualización de métricas en tiempo real con indicadores de tendencia (Mini-gráficos Sparkline)
- **Línea de Tiempo de Actividad**: Visualización cronológica interactiva de las actividades del sistema (Gráfico estilo Gantt)
- **Gráfico de Participación de Usuarios**: Gráfico de líneas que registra las métricas de participación diaria/semanal/mensual
- **Utilización de Recursos**: Gráficos de indicador que muestran el uso de recursos del sistema en tiempo real

### Gráficos del Panel Técnico
- **Rendimiento del Sistema**: Gráficos de líneas múltiples para seguimiento de CPU, memoria y métricas de red
- **Monitor de Tasa de Errores**: Gráficos de área con indicadores de umbral para errores del sistema
- **Latencia de Solicitudes**: Gráficos de histograma que muestran tiempos de procesamiento de solicitudes
- **Disponibilidad del Servicio**: Visualización de mapa de calor con porcentaje de tiempo de actividad y comparación histórica
- **Historial de Despliegues**: Gráficos de línea de tiempo de despliegues del sistema con indicadores de éxito/fracaso

### Gráficos del Panel de Negocio
- **Resumen de Ingresos**: Gráficos combinados de barras y líneas que muestran el rendimiento financiero
- **Adquisición de Clientes**: Gráficos de embudo que muestran las etapas del recorrido del cliente
- **Análisis de Segmentos de Mercado**: Gráficos circulares y de anillos que desglosan los segmentos de mercado
- **Rendimiento de Ventas**: Gráficos de barras horizontales con indicadores de objetivos y porcentajes de logro
- **Tendencias de Crecimiento**: Gráficos spline con líneas de tendencia e intervalos de confianza para pronósticos

### Características de los Gráficos
- **Elementos Interactivos**: Tooltips, zoom y capacidades de exploración detallada
- **Rangos de Tiempo Personalizables**: Selección de rangos de fechas predefinidos y personalizados
- **Opciones de Exportación**: Descarga de gráficos como PNG, JPEG o SVG
- **Diseño Responsivo**: Los gráficos se redimensionan automáticamente según las dimensiones de la pantalla
- **Actualizaciones en Tiempo Real**: Feeds de datos en vivo con intervalos de actualización configurables (5s, 30s, 1m, 5m)
- **Análisis Comparativo**: Superposición de períodos de datos históricos para comparación de tendencias (semana/mes/año)
- **Alertas de Umbral**: Indicadores visuales cuando las métricas cruzan umbrales definidos (bandas coloreadas)

### Integración y Fuentes de Datos
- Conexión a APIs backend para datos en tiempo real
- Soporte para importación de datos CSV/JSON
- Actualización programada de datos desde múltiples fuentes
- Capa de transformación de datos para requisitos complejos de visualización

## Stack Tecnológico

- **Framework Frontend**: Vue.js
- **Estilos**: CSS con estilos de componentes con scope
- **Iconos**: Font Awesome
- **Gestión de Estado**: Sistema de reactividad integrado de Vue
- **Enrutamiento**: Vue Router
- **Almacenamiento Local**: LocalStorage del navegador para configuraciones persistentes

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/achraf4dev/ionic_dashboard.git
   cd montserrat-dashboard
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run serve
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

## Estructura del Proyecto

```
src/
├── assets/         # Activos estáticos (imágenes, logos)
├── components/     # Componentes Vue
│   ├── dashboard/  # Componentes específicos del dashboard
│   └── layout/     # Componentes de diseño (Sidebar, Navbar)
├── router/         # Configuración de Vue Router
├── views/          # Componentes de página
│   ├── business/   # Vistas del panel de negocio
│   └── technical/  # Vistas del panel técnico
├── App.vue         # Componente raíz
└── main.js         # Punto de entrada de la aplicación
```

## Componentes Principales

### AppSidebar
El componente de barra lateral proporciona el menú de navegación principal y puede alternar entre estados expandido y colapsado. Incluye:
- Logo y nombre de la aplicación
- Enlaces de navegación con iconos
- Información del usuario
- Indicador de versión
- Capacidad de respuesta móvil con comportamiento deslizante

### AppNavbar
La barra de navegación superior incluye:
- Menú hamburguesa para alternar la barra lateral
- Título de la página
- Funcionalidad de búsqueda
- Sistema de notificaciones
- Menú desplegable de perfil de usuario

## Diseño Responsivo

El dashboard está diseñado para ser completamente responsivo:

- **Escritorio**: Barra lateral completa con navegación expandida
- **Tableta**: Barra lateral colapsable con área de contenido suficiente
- **Móvil**: 
  - Barra lateral oculta que se desliza al activarse
  - Barra de navegación simplificada con controles esenciales
  - Overlay de pantalla completa cuando la barra lateral está activa
  - Controles adaptados para pantallas táctiles

## Almacenamiento Local

La aplicación utiliza localStorage del navegador para persistir las preferencias del usuario:
- Estado colapsado de la barra lateral
- Preferencias de tema (próximamente)
- Información de sesión del usuario (próximamente)

## Personalización

### Temas
La aplicación utiliza variables CSS para facilitar la tematización. Las variables principales se definen en `App.vue`:

```css
:root {
  --primary-color: #3b82f6;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --bg-light: #f8fafc;
  --bg-white: #ffffff;
  --border-color: #e2e8f0;
  --sidebar-width: 250px;
  --sidebar-collapsed-width: 70px;
}
```

### Añadir Nuevas Páginas
1. Crear un nuevo componente de vista en el directorio apropiado
2. Añadir una ruta en la configuración del router
3. Añadir un elemento de menú en el componente `AppSidebar.vue`

## Compatibilidad con Navegadores

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

## Licencia

[Licencia MIT](LICENSE)

## Contribuir

1. Haz un fork del repositorio
2. Crea tu rama de características (`git checkout -b feature/caracteristica-increible`)
3. Haz commit de tus cambios (`git commit -m 'Añadir alguna característica increíble'`)
4. Haz push a la rama (`git push origin feature/caracteristica-increible`)
5. Abre un Pull Request

## Contacto

Tu Nombre - tu.email@ejemplo.com

Enlace del Proyecto: [https://github.com/achraf4dev/ionic_dashboard/](https://github.com/achraf4dev/ionic_dashboard/) 