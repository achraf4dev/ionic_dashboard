<template>
  <div class="dashboard-container">
    <!-- Welcome Section -->
    <div class="welcome-section">
      <h1 class="welcome-title">Bienvenido de nuevo, <span class="highlight">Achraf</span></h1>
      <p class="welcome-subtitle">Aquí tienes una visión general de tus paneles analíticos</p>
    </div>
    
    
    <!-- Dashboard Cards -->
    <div class="dashboard-cards">
      <div class="dashboard-card" @click="navigateTo('/technical')">
        <div class="card-icon">
          <i class="fas fa-code"></i>
        </div>
        <div class="card-content">
          <h2 class="card-title">Panel Técnico</h2>
          <p class="card-description">Ver métricas técnicas, rendimiento del servidor y estadísticas de salud del sistema</p>
        </div>
        <div class="card-action">
          <span>Ver Panel</span>
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
      
      <div class="dashboard-card" @click="navigateTo('/business')">
        <div class="card-icon">
          <i class="fas fa-chart-pie"></i>
        </div>
        <div class="card-content">
          <h2 class="card-title">Panel de Negocio</h2>
          <p class="card-description">Seguimiento de métricas de negocio, análisis de ingresos y participación de clientes</p>
        </div>
        <div class="card-action">
          <span>Ver Panel</span>
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 1.5rem;
  /* max-width: 1200px; */
  margin: 0 auto;
}

/* Welcome Section */
.welcome-section {
  margin-bottom: 2rem;
}

.welcome-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.welcome-subtitle {
  color: #64748b;
  font-size: 1rem;
}

.highlight {
  color: #3b82f6;
}

/* Stats Container */
.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 0.5rem;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  font-size: 1.25rem;
  margin-right: 1rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

/* Dashboard Cards */
.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 2rem;
}

.dashboard-card {
  position: relative;
  padding: 2rem;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 320px;
}

.dashboard-card:first-child {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%);
  color: white;
}

.dashboard-card:last-child {
  background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #7dd3fc 100%);
  color: white;
}

.dashboard-card::before {
  content: '';
  position: absolute;
  width: 250px;
  height: 250px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -125px;
  right: -125px;
  z-index: 0;
}

.dashboard-card::after {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  bottom: -100px;
  left: -100px;
  z-index: 0;
}

.dashboard-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.dashboard-card:hover .card-action {
  opacity: 1;
  transform: translateY(0);
}

.dashboard-card:hover .card-icon {
  transform: scale(1.1) translateY(-5px);
}

.card-icon {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 2rem;
  margin-bottom: 2rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-content {
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
  flex: 1;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.card-description {
  font-size: 1.0625rem;
  line-height: 1.7;
  opacity: 0.9;
}

.card-action {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-top: auto;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 0.9;
  transform: translateY(5px);
}

.card-action i {
  transition: transform 0.3s ease;
}

.dashboard-card:hover .card-action i {
  transform: translateX(5px);
}

/* Recent Activity */
.recent-activity {
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.view-all {
  background: transparent;
  border: none;
  color: #3b82f6;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.activity-item:hover {
  background-color: #f8fafc;
}

.activity-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  font-size: 1rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.activity-description {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.5rem 0;
}

.activity-time {
  font-size: 0.75rem;
  color: #94a3b8;
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .dashboard-cards {
    grid-template-columns: 1fr;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .welcome-title {
    font-size: 1.5rem;
  }
}
</style>
