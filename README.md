# Montserrat Dashboard

A modern, responsive dashboard application built with Vue.js that provides an elegant interface for data visualization, management, and analysis.

![Montserrat Dashboard](screenshot.png)

## Features

- **Modern UI**: Clean, intuitive interface with responsive design
- **Multiple Dashboard Panels**:
  - Main Dashboard
  - Technical Dashboard
  - Business Dashboard
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Interactive Navigation**:
  - Collapsible sidebar
  - Mobile-friendly navigation with overlay
  - Breadcrumb navigation
- **User Profile Management**: User settings and preference management
- **Search Functionality**: Global search for quick access to resources
- **Notification System**: Real-time notification alerts
- **Data Visualization**: Interactive charts and graphs

## Data Visualization & Charts

The Montserrat Dashboard features comprehensive data visualization capabilities across all panels:

### Main Dashboard Charts
- **KPI Overview Cards**: Real-time metrics display with trend indicators (Sparkline mini-charts)
- **Activity Timeline**: Interactive chronological visualization of system activities (Gantt-style chart)
- **User Engagement Chart**: Line chart tracking daily/weekly/monthly user engagement metrics
- **Resource Utilization**: Gauge charts showing system resource usage in real-time

### Technical Dashboard Charts
- **System Performance**: Multi-line charts tracking CPU, memory, and network metrics
- **Error Rate Monitor**: Area charts with threshold indicators for system errors
- **Request Latency**: Histogram charts showing request processing times
- **Service Availability**: Heat map visualization with uptime percentage and historical comparison
- **Deployment History**: Timeline charts of system deployments with success/failure indicators

### Business Dashboard Charts
- **Revenue Overview**: Bar and line combination charts showing financial performance
- **Customer Acquisition**: Funnel charts displaying the customer journey stages
- **Market Segment Analysis**: Pie and donut charts breaking down market segments
- **Sales Performance**: Horizontal bar charts with goal indicators and achievement percentages
- **Growth Trends**: Spline charts with trend lines and confidence intervals for forecasting

### Chart Features
- **Interactive Elements**: Tooltips, zooming, and drill-down capabilities
- **Customizable Time Ranges**: Predefined and custom date range selection
- **Export Options**: Download charts as PNG, JPEG, or SVG files
- **Responsive Design**: Charts automatically resize based on screen dimensions
- **Real-time Updates**: Live data feeds with configurable refresh intervals (5s, 30s, 1m, 5m)
- **Comparative Analysis**: Overlay historical data periods for trend comparison (week/month/year)
- **Threshold Alerts**: Visual indicators when metrics cross defined thresholds (colored bands)

### Integration & Data Sources
- Connection to backend APIs for real-time data
- Support for CSV/JSON data import
- Scheduled data refresh from multiple sources
- Data transformation layer for complex visualization requirements

## Technology Stack

- **Frontend Framework**: Vue.js
- **Styling**: CSS with scoped component styles
- **Icons**: Font Awesome
- **State Management**: Vue's built-in reactivity system
- **Routing**: Vue Router
- **Local Storage**: Browser localStorage for persistent settings

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/achraf4dev/ionic_dashboard.git
   cd montserrat-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run serve
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── assets/         # Static assets (images, logos)
├── components/     # Vue components
│   ├── dashboard/  # Dashboard-specific components
│   └── layout/     # Layout components (Sidebar, Navbar)
├── router/         # Vue Router configuration
├── views/          # Page components
│   ├── business/   # Business dashboard views
│   └── technical/  # Technical dashboard views
├── App.vue         # Root component
└── main.js         # Application entry point
```

## Core Components

### AppSidebar
The sidebar component provides the main navigation menu and can be toggled between expanded and collapsed states. It includes:
- Logo and application name
- Navigation links with icons
- User information
- Version indicator
- Mobile responsiveness with slide-in behavior

### AppNavbar
The top navigation bar includes:
- Hamburger menu for toggling the sidebar
- Page title
- Search functionality
- Notification system
- User profile dropdown

## Responsive Design

The dashboard is designed to be fully responsive:

- **Desktop**: Full sidebar with expanded navigation
- **Tablet**: Collapsible sidebar with sufficient content area
- **Mobile**: 
  - Hidden sidebar that slides in when toggled
  - Simplified navbar with essential controls
  - Full-screen overlay when sidebar is active
  - Touch-friendly controls

## Local Storage

The application uses browser localStorage to persist user preferences:
- Sidebar collapsed state
- Theme preferences (coming soon)
- User session information (coming soon)

## Customization

### Theming
The application uses CSS variables for easy theming. Main variables are defined in `App.vue`:

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

### Adding New Pages
1. Create a new view component in the appropriate directory
2. Add a route in the router configuration
3. Add a menu item in the `AppSidebar.vue` component

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

[MIT License](LICENSE)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/achraf4dev/ionic_dashboard/](https://github.com/achraf4dev/ionic_dashboard/)
