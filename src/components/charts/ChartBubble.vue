<template>
  <div class="chart-container">
    <Bubble :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Bubble } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LinearScale, PointElement } from 'chart.js';
import chartjsData from '../../data/chartjs-data.json';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement);

const bubbleData = chartjsData.bubble;

const chartData = computed(() => {
  return {
    datasets: bubbleData.datasets
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        boxWidth: 12
      }
    },
    title: {
      display: true,
      text: 'Resource Allocation',
      font: {
        size: 14
      }
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          const label = context.dataset.label || '';
          const x = context.parsed.x;
          const y = context.parsed.y;
          const r = context.raw.r;
          return `${label}: (${x}, ${y}, Size: ${r})`;
        }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Utilization (%)'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Efficiency (%)'
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