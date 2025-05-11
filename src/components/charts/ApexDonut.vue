<template>
  <div class="chart-container">
    <apexchart
      type="donut"
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

const series = ref(apexData.donut.series);
const chartOptions = ref({
  chart: {
    type: 'donut',
    height: '100%',
    toolbar: {
      show: false
    }
  },
  colors: ['#0063F7', '#5CCB58', '#FF6384', '#FFCE56'],
  labels: apexData.donut.labels,
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '14px'
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          name: {
            show: true
          },
          value: {
            show: true,
            formatter: function(val: number) {
              return val.toFixed(0);
            }
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function(w: any) {
              return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toFixed(0);
            }
          }
        }
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style> 