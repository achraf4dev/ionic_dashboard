<template>
  <div class="chart-container">
    <div class="chart-header">
      <div class="title-area">
        <h3 class="chart-title">Embudo de Conversión</h3>
        <p class="chart-subtitle">Tasas de conversión del recorrido del usuario por etapa</p>
      </div>
    </div>
    
    <div class="chart-stats">
      <div class="stat-item">
        <div class="stat-value">{{ visitorCount.toLocaleString() }}</div>
        <div class="stat-label">Visitantes Totales</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" :class="conversionClass">{{ conversionRate }}%</div>
        <div class="stat-label">Conversión General</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">{{ averageStages.toFixed(1) }}</div>
        <div class="stat-label">Etapas Completadas Prom.</div>
      </div>
    </div>
    
    <div class="chart-body">
      <apexchart
        type="bar"
        height="100%"
        :options="chartOptions"
        :series="chartSeries"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import businessData from '@/data/business.json';
import VueApexCharts from 'vue3-apexcharts';

// Create mock data for the conversion funnel using the available conversionRate data
const funnelData = ref({
  stages: [
    { name: "Página de Inicio", value: 1000 },
    { name: "Página de Producto", value: 450 },
    { name: "Carrito", value: 300 },
    { name: "Pago", value: 250 },
    { name: "Compra", value: 200 }
  ]
});

// Calculate statistics
const visitorCount = computed(() => {
  return funnelData.value.stages[0].value;
});

const conversionRate = computed(() => {
  const firstStage = funnelData.value.stages[0].value;
  const lastStage = funnelData.value.stages[funnelData.value.stages.length - 1].value;
  return Math.round((lastStage / firstStage) * 100);
});

const averageStages = computed(() => {
  let totalCompletions = 0;
  let totalUsers = funnelData.value.stages[0].value;
  
  for (let i = 0; i < funnelData.value.stages.length; i++) {
    totalCompletions += (i + 1) * (funnelData.value.stages[i].value - (funnelData.value.stages[i+1]?.value || 0));
  }
  
  return totalCompletions / totalUsers;
});

const conversionClass = computed(() => {
  if (conversionRate.value >= 25) return 'text-success';
  if (conversionRate.value >= 15) return 'text-warning';
  return 'text-danger';
});

const chartSeries = computed(() => {
  return [{
    name: 'Usuarios',
    data: funnelData.value.stages.map(stage => stage.value).reverse()
  }];
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      fontFamily: "'Inter', sans-serif",
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: false,
        dataLabels: {
          position: 'end'
        },
        barHeight: '80%',
        borderRadius: 8
      }
    },
    colors: ['#3b82f6', '#4f92f7', '#63a1f8', '#76b1f9', '#8ac0fa'],
    dataLabels: {
      enabled: true,
      textAnchor: 'end',
      formatter: function(value) {
        return value.toLocaleString();
      },
      style: {
        fontSize: '11px',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        colors: ['#1e293b']
      },
      offsetX: -8,
      background: {
        enabled: false
      },
      dropShadow: {
        enabled: false
      }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: "'Inter', sans-serif"
      },
      y: {
        formatter: function(value) {
          const totalVisitors = funnelData.value.stages[0].value;
          const percentage = (value / totalVisitors * 100).toFixed(1);
          return `${value.toLocaleString()} usuarios (${percentage}% de visitantes)`;
        }
      }
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    xaxis: {
      categories: funnelData.value.stages.map(stage => stage.name).reverse(),
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '11px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400
        }
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    legend: {
      show: false
    }
  };
});
</script>

<style scoped>
.chart-container {
  background-color: white;
  border-radius: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  box-sizing: border-box;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  gap: 1rem;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.title-area {
  flex: 1 1 auto;
  min-width: 180px;
}

.chart-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
  line-height: 1.2;
}

.chart-subtitle {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
  line-height: 1.2;
}

.chart-stats {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

.stat-item {
  min-width: 100px;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.1rem;
}

.text-success {
  color: #10b981;
}

.text-warning {
  color: #f97316;
}

.text-danger {
  color: #ef4444;
}

.chart-body {
  flex-grow: 1;
  min-height: 250px;
  position: relative;
}

@media (max-width: 640px) {
  .chart-container {
    padding: 1rem;
  }
  
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .chart-stats {
    gap: 1rem;
  }
  
  .stat-item {
    min-width: 80px;
  }
}
</style> 