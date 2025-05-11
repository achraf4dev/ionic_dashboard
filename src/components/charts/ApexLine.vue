<template>
  <div class="chart-container">
    <apexchart
      type="line"
      height="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import apexData from '../../data/apex-data.json';

const series = ref([...apexData.line.series]);
const chartOptions = ref({
  chart: {
    type: 'line',
    height: '100%',
    toolbar: {
      show: false
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    }
  },
  colors: ['#0063F7', '#5CCB58'],
  stroke: {
    curve: 'smooth',
    width: 3
  },
  grid: {
    borderColor: '#f1f1f1',
    padding: {
      bottom: 5,
      left: 15
    }
  },
  markers: {
    size: 4
  },
  xaxis: {
    categories: apexData.line.categories,
    labels: {
      style: {
        colors: '#9aa0ac'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#9aa0ac'
      }
    }
  },
  tooltip: {
    theme: 'light'
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right'
  }
});

let intervalId: number | null = null;

// Function to generate random data for real-time updates
const updateChartData = () => {
  // Deep clone the series to ensure reactivity
  const newSeries = JSON.parse(JSON.stringify(series.value));
  
  // Update data for first series (Revenue)
  newSeries[0].data = newSeries[0].data.map((value: number) => {
    // Add or subtract a random value (max 10% of current value)
    const change = Math.floor(Math.random() * (value * 0.1)) * (Math.random() > 0.5 ? 1 : -1);
    return Math.max(0, value + change);
  });
  
  // Update data for second series (Profit)
  if (newSeries[1]) {
    newSeries[1].data = newSeries[1].data.map((value: number) => {
      const change = Math.floor(Math.random() * (value * 0.1)) * (Math.random() > 0.5 ? 1 : -1);
      return Math.max(0, value + change);
    });
  }
  
  series.value = newSeries;
};

onMounted(() => {
  // Update chart data every 2 seconds
  intervalId = window.setInterval(updateChartData, 2000);
});

onUnmounted(() => {
  // Clear interval when component is unmounted
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style> 