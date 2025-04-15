<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Panel de Negocio</h1>
      <div class="dashboard-actions">
        <div class="time-period">
          <span class="time-label">Periodo:</span>
          <select class="time-select">
            <option>Últimos 7 días</option>
            <option>Últimos 30 días</option>
            <option>Últimos 3 meses</option>
            <option>Último año</option>
          </select>
        </div>
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
        title="Usuarios Activos Diarios" 
        :value="formatNumber(averageDailyUsers)"
        :trend="`+${increaseDailyUsers}% desde la semana pasada`" 
        :isPositive="true"
        :colorIndex="0"
        theme="business"
      />
      
      <SummaryCard 
        title="Satisfacción del Cliente" 
        :value="formatScore(npsScore)"
        :trend="`+${formatScore(npsDiff)} desde el mes pasado`" 
        :isPositive="true"
        :colorIndex="1"
        theme="business"
      />
      
      <SummaryCard 
        title="Tasa de Conversión" 
        :value="`${conversionRate}%`"
        :trend="`+${conversionDiff}% desde el mes pasado`" 
        :isPositive="true"
        :colorIndex="2"
        theme="business"
      />
      
      <SummaryCard 
        title="Duración Media de Sesión" 
        :value="formatDuration(sessionDuration)"
        trend="+15s desde el mes pasado" 
        :isPositive="true"
        :colorIndex="3"
        theme="business"
      />
    </div>
    
    <div class="dashboard-grid">
      <div class="grid-item grid-item-2-cols">
        <ActiveUsersChart />
      </div>
      <div class="grid-item">
        <CustomerSatisfactionChart />
      </div>
      <div class="grid-item grid-item-2-cols">
        <ConversionFunnelChart />
      </div>
      <div class="grid-item">
        <SessionDurationChart />
      </div>
      <div class="grid-item">
        <RealTimeUsersChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ActiveUsersChart from '@/components/charts/ActiveUsersChart.vue';
import CustomerSatisfactionChart from '@/components/charts/CustomerSatisfactionChart.vue';
import ConversionFunnelChart from '@/components/charts/ConversionFunnelChart.vue';
import SessionDurationChart from '@/components/charts/SessionDurationChart.vue';
import RealTimeUsersChart from '@/components/charts/RealTimeUsersChart.vue';
import SummaryCard from '@/components/ui/SummaryCard.vue';
import businessData from '@/data/business.json';

// Extract data
const dailyActiveUsers = businessData.activeUsers.daily.data;
const npsData = businessData.customerSatisfaction.nps;
const conversionData = businessData.conversionRate;
const sessionData = businessData.sessionDuration;

// Calculate metrics
const averageDailyUsers = computed(() => {
  const sum = dailyActiveUsers.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / dailyActiveUsers.length);
});

const increaseDailyUsers = computed(() => {
  const currentWeekAvg = averageDailyUsers.value;
  const prevWeekData = businessData.activeUsers.daily.previousWeek;
  const prevWeekAvg = prevWeekData.reduce((acc, val) => acc + val, 0) / prevWeekData.length;
  return Math.round(((currentWeekAvg - prevWeekAvg) / prevWeekAvg) * 100);
});

const npsScore = computed(() => npsData.current);
const npsDiff = computed(() => npsData.current - npsData.previous);

const conversionRate = computed(() => {
  const start = conversionData.data[0];
  const end = conversionData.data[conversionData.data.length - 1];
  return Math.round((end / start) * 100);
});

const conversionDiff = computed(() => {
  const currentStart = conversionData.data[0];
  const currentEnd = conversionData.data[conversionData.data.length - 1];
  const currentRate = (currentEnd / currentStart) * 100;
  
  const previousStart = conversionData.previousMonth[0];
  const previousEnd = conversionData.previousMonth[conversionData.previousMonth.length - 1];
  const previousRate = (previousEnd / previousStart) * 100;
  
  return Math.round((currentRate - previousRate) * 10) / 10;
});

const sessionDuration = computed(() => sessionData.average);

// Format helpers
const formatNumber = (value) => {
  return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
};

const formatScore = (value) => {
  return value.toFixed(1);
};

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};
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
  gap: 12px;
  align-items: center;
}

.time-period {
  display: flex;
  align-items: center;
  gap: 8px;
}

.time-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.time-select {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.875rem;
  color: #1f2937;
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
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .dashboard-actions {
    width: 100%;
    justify-content: space-between;
  }
  
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