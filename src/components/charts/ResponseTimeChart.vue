<template>
  <div class="chart-container">
    <div class="chart-header">
      <div class="title-area">
        <h3 class="chart-title">Tiempo de Respuesta API</h3>
        <p class="chart-subtitle">Tiempo de respuesta promedio en todos los endpoints</p>
      </div>
      <div class="chart-legend">
        <span class="legend-item">
          <span class="color-dot" style="background-color: rgba(99, 102, 241, 0.8)"></span>
          <span>Tiempo de Respuesta</span>
        </span>
        <span class="legend-item">
          <span class="color-dot" style="background-color: rgba(239, 68, 68, 0.8)"></span>
          <span>Umbral</span>
        </span>
      </div>
    </div>
    
    <div class="chart-stats">
      <div class="stat-item">
        <div class="stat-value">{{ averageResponseTime }}ms</div>
        <div class="stat-label">Respuesta Prom.</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" :class="maxResponseTimeClass">{{ maxResponseTime }}ms</div>
        <div class="stat-label">Respuesta Máx.</div>
      </div>
    </div>
    
    <div class="chart-body">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import technicalData from '@/data/technical.json';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Create a ResizeObserver for responsive chart rendering
const chartContainer = ref(null);
let resizeObserver = null;
let chart = null;

// Calculated stats
const averageResponseTime = computed(() => {
  const data = technicalData.responseTime.data;
  const sum = data.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / data.length);
});

const maxResponseTime = computed(() => {
  return Math.max(...technicalData.responseTime.data);
});

const maxResponseTimeClass = computed(() => {
  return maxResponseTime.value > technicalData.responseTime.threshold ? 'text-danger' : 'text-success';
});

const chartData = computed(() => {
  return {
    labels: technicalData.responseTime.labels,
    datasets: [
      {
        label: 'Tiempo de Respuesta (ms)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: 'rgba(99, 102, 241, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.4,
        fill: true,
        data: technicalData.responseTime.data
      },
      {
        label: 'Umbral',
        backgroundColor: 'transparent',
        borderColor: 'rgba(239, 68, 68, 0.8)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointStyle: false,
        fill: false,
        data: Array(technicalData.responseTime.labels.length).fill(technicalData.responseTime.threshold)
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 5,
      right: 20,
      left: 10,
      bottom: 10
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false
      },
      ticks: {
        font: {
          size: 11,
          family: "'Inter', sans-serif"
        },
        color: '#64748b'
      },
      title: {
        display: true,
        text: 'Tiempo de Respuesta (ms)',
        font: {
          size: 12,
          family: "'Inter', sans-serif",
          weight: 'normal'
        },
        color: '#64748b',
        padding: { top: 0, bottom: 10 }
      }
    },
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        font: {
          size: 11,
          family: "'Inter', sans-serif"
        },
        color: '#64748b',
        maxRotation: 0
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1e293b',
      bodyColor: '#475569',
      borderColor: 'rgba(226, 232, 240, 0.8)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 6,
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
      titleFont: {
        size: 12,
        weight: 'bold',
        family: "'Inter', sans-serif"
      },
      bodyFont: {
        size: 12,
        family: "'Inter', sans-serif"
      },
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.parsed.y} ms`;
        }
      }
    }
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  animation: {
    duration: 800,
    easing: 'easeOutQuart'
  }
};

onMounted(() => {
  // Initialize resize observer to ensure chart responsiveness
  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(entries => {
      if (chart) {
        chart.resize();
      }
    });
    
    if (chartContainer.value) {
      resizeObserver.observe(chartContainer.value);
    }
  }
});

onUnmounted(() => {
  // Clean up resize observer
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
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

.chart-legend {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #64748b;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  white-space: nowrap;
}

.color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
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