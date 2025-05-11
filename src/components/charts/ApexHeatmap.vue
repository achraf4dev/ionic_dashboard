<template>
  <div class="chart-container">
    <apexchart
      type="heatmap"
      height="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import apexData from '../../data/apex-data.json';

const series = ref(apexData.heatmap.series);
const chartOptions = ref({
  chart: {
    type: 'heatmap',
    height: '100%',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ["#0063F7"],
  title: {
    text: 'Customer Activity Heatmap',
    align: 'left',
    style: {
      fontSize: '14px',
      fontWeight: 'normal'
    }
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      radius: 0,
      useFillColorAsStroke: true,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 30,
            name: 'Low',
            color: '#B4E0A7'
          },
          {
            from: 31,
            to: 60,
            name: 'Medium',
            color: '#5CCB58'
          },
          {
            from: 61,
            to: 100,
            name: 'High',
            color: '#1AA053'
          },
          {
            from: 101,
            to: 150,
            name: 'Very High',
            color: '#0A6634'
          }
        ]
      }
    }
  },
  xaxis: {
    categories: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm'],
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
  stroke: {
    width: 1
  },
  tooltip: {
    theme: 'light'
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style> 