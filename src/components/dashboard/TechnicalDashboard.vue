<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Panel Técnico</h1>
      <div class="dashboard-actions">
        <button class="action-button refresh">
          <span class="icon">⟳</span>
          Actualizar
        </button>
        <button class="action-button">
          <span class="icon">⋮</span>
        </button>
      </div>
    </header>
    
    <div class="dashboard-summary">
      <SummaryCard 
        title="Tiempo de Actividad" 
        :value="`${uptimeData.current}%`"
        trend="+0.05% desde el mes pasado" 
        :isPositive="true"
        :colorIndex="0"
        theme="technical"
      />
      
      <SummaryCard 
        title="Tiempo de Respuesta Prom." 
        :value="`${averageResponseTime}ms`"
        trend="+15ms desde la semana pasada" 
        :isNegative="true"
        :colorIndex="1"
        theme="technical"
      />
      
      <SummaryCard 
        title="Cobertura de Código" 
        :value="`${codeCoverageData.overall}%`"
        trend="+3% desde la última versión" 
        :isPositive="true"
        :colorIndex="2"
        theme="technical"
      />
      
      <SummaryCard 
        title="Último Despliegue" 
        value="Hoy"
        trend="12 despliegues este mes" 
        :colorIndex="3"
        theme="technical"
      />
    </div>
    
    <div class="dashboard-grid">
      <div class="grid-item grid-item-2-cols">
        <ResponseTimeChart />
      </div>
      <div class="grid-item">
        <ErrorRatesChart />
      </div>
      <div class="grid-item">
        <UptimePerformanceChart />
      </div>
      <div class="grid-item grid-item-2-cols">
        <RealTimeMetricsChart />
      </div>
      <div class="grid-item grid-item-2-cols">
        <CodeCoverageChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ResponseTimeChart from '@/components/charts/ResponseTimeChart.vue';
import ErrorRatesChart from '@/components/charts/ErrorRatesChart.vue';
import UptimePerformanceChart from '@/components/charts/UptimePerformanceChart.vue';
import RealTimeMetricsChart from '@/components/charts/RealTimeMetricsChart.vue';
import CodeCoverageChart from '@/components/charts/CodeCoverageChart.vue';
import SummaryCard from '@/components/ui/SummaryCard.vue';
import technicalData from '@/data/technical.json';

// Extract data
const responseTimeData = technicalData.responseTime;
const uptimeData = technicalData.uptimePercentage;
const codeCoverageData = technicalData.codeCoverage;

// Compute average response time
const averageResponseTime = computed(() => {
  const sum = responseTimeData.data.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / responseTimeData.data.length);
});
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

h1 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.dashboard-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button:hover {
  background-color: #f9fafb;
}

.icon {
  font-size: 1rem;
}

.dashboard-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.grid-item {
  min-height: 400px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  background: white;
  overflow: hidden;
}

.grid-item-2-cols {
  grid-column: span 2;
}

@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid-item-2-cols {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .dashboard-summary {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .grid-item, .grid-item-2-cols {
    grid-column: span 1;
  }
}
</style> 