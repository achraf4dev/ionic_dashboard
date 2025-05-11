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
      text: 'Business Growth Metrics',
      font: {
        size: 14
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Marketing Spend ($K)'
      }
    },
    y: {
      title: {
        display: true,
        text: 'New Customers Acquired'
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