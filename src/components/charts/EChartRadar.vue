<template>
  <div class="chart-container">
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { RadarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import echartsData from '../../data/echarts-data.json';

// Register ECharts components
use([
  CanvasRenderer,
  RadarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

const radarData = ref(JSON.parse(JSON.stringify(echartsData.radar)));

const option = shallowRef({
  title: {
    text: 'Radar de Estado del Sistema',
    left: 'left',
    textStyle: {
      fontSize: 14,
      fontWeight: 'normal'
    }
  },
  tooltip: {},
  legend: {
    data: ['Aplicación 1', 'Aplicación 2'],
    bottom: 0
  },
  radar: {
    indicator: radarData.value.indicator,
    radius: '65%',
    center: ['50%', '50%']
  },
  series: radarData.value.series
});

let intervalId: number | null = null;

// Function to generate random data for real-time updates
const updateChartData = () => {
  // Deep clone the data to ensure reactivity
  const newData = JSON.parse(JSON.stringify(radarData.value));
  
  // Update values for both applications
  newData.series[0].data.forEach((app: any) => {
    app.value = app.value.map((value: number) => {
      // Add or subtract a random value (max 10 points)
      const change = Math.floor(Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1);
      // Ensure value stays between 0 and 100
      return Math.min(100, Math.max(0, value + change));
    });
  });
  
  radarData.value = newData;
  
  // Update the chart option
  option.value = {
    ...option.value,
    radar: {
      indicator: radarData.value.indicator,
      radius: '65%',
      center: ['50%', '50%']
    },
    series: radarData.value.series
  };
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

.chart {
  width: 100%;
  height: 100%;
}
</style> 