<template>
  <div class="chart-container">
    <Scatter :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Scatter } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LinearScale, PointElement } from 'chart.js';
import chartjsData from '../../data/chartjs-data.json';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement);

const scatterData = chartjsData.scatter;

const chartData = computed(() => {
  return {
    datasets: scatterData.datasets
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as 'top',
      labels: {
        boxWidth: 12
      }
    },
    title: {
      display: true,
      text: 'Métricas de Crecimiento del Negocio',
      font: {
        size: 14
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Gasto en Marketing (€)'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Nuevos Clientes Adquiridos'
      }
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style> 