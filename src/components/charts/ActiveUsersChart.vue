<template>
  <div class="chart-container">
    <h3>Usuarios Activos Diarios</h3>
    <div class="chart-wrapper">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import businessData from '@/data/business.json';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const chartData = computed(() => {
  return {
    labels: businessData.activeUsers.daily.labels,
    datasets: [
      {
        label: 'Esta Semana',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        tension: 0.4,
        fill: true,
        data: businessData.activeUsers.daily.data
      },
      {
        label: 'Semana Anterior',
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        borderColor: 'rgba(107, 114, 128, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(107, 114, 128, 1)',
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
        data: businessData.activeUsers.daily.previousWeek
      },
      {
        label: 'Objetivo',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        borderColor: 'rgba(220, 38, 38, 0.8)',
        borderWidth: 2,
        pointStyle: false,
        borderDash: [3, 3],
        tension: 0,
        fill: false,
        data: Array(businessData.activeUsers.daily.labels.length).fill(businessData.activeUsers.daily.target)
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        callback: function(value) {
          return value >= 1000 ? (value / 1000) + 'k' : value;
        }
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const value = context.parsed.y;
          const formattedValue = value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
          return `${context.dataset.label}: ${formattedValue}`;
        }
      }
    }
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  animation: {
    duration: 1000
  }
};
</script>

<style scoped>
.chart-container {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.chart-wrapper {
  flex: 1;
  min-height: 0;
  position: relative;
}

h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
  font-size: 1.25rem;
}
</style> 