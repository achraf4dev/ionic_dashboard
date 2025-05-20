<template>
  <div class="chart-container">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import chartjsData from '../../data/chartjs-data.json';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const doughnutData = chartjsData.doughnut;

const chartData = computed(() => {
  return {
    labels: doughnutData.labels,
    datasets: doughnutData.datasets
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: {
      position: 'bottom' as 'bottom',
      labels: {
        boxWidth: 12
      }
    },
    title: {
      display: true,
      text: 'Estado del Servidor',
      font: {
        size: 14
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