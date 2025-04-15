<template>
  <div class="chart-container">
    <h3>Métricas del Sistema en Tiempo Real</h3>
    <apexchart
      type="line"
      height="100%"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import technicalData from '@/data/technical.json';

// Initial data
const cpuData = ref([...technicalData.realTimeMetrics.cpuUsage]);
const memoryData = ref([...technicalData.realTimeMetrics.memoryUsage]);
const connectionsData = ref([...technicalData.realTimeMetrics.activeConnections]);
const timestamps = ref([...technicalData.realTimeMetrics.timestamps]);

// Generate a random value that follows the trend of the last value
const generateNextValue = (currentValue, min, max, volatility = 5) => {
  // Random direction (up or down) with some trend following
  const direction = Math.random() > 0.5 ? 1 : -1;
  // Random change amount with volatility factor
  const change = Math.random() * volatility * direction;
  // Calculate new value
  let newValue = currentValue + change;
  // Ensure value stays within bounds
  newValue = Math.max(min, Math.min(max, newValue));
  return Math.round(newValue * 10) / 10; // Round to 1 decimal place
};

// Generate next timestamp
const generateNextTimestamp = (lastTimestamp) => {
  const date = new Date(lastTimestamp);
  date.setMinutes(date.getMinutes() + 5); // Add 5 minutes
  return date.toISOString();
};

// Update data at regular intervals to simulate real-time
let intervalId = null;
onMounted(() => {
  intervalId = setInterval(() => {
    // Add new data points
    const lastCpuValue = cpuData.value[cpuData.value.length - 1];
    const lastMemoryValue = memoryData.value[memoryData.value.length - 1];
    const lastConnectionsValue = connectionsData.value[connectionsData.value.length - 1];
    const lastTimestamp = timestamps.value[timestamps.value.length - 1];
    
    // Generate new values based on last values
    cpuData.value.push(generateNextValue(lastCpuValue, 30, 80));
    memoryData.value.push(generateNextValue(lastMemoryValue, 50, 90));
    connectionsData.value.push(generateNextValue(lastConnectionsValue, 100, 200));
    timestamps.value.push(generateNextTimestamp(lastTimestamp));
    
    // Remove oldest data point to maintain same number of points
    if (cpuData.value.length > 20) {
      cpuData.value.shift();
      memoryData.value.shift();
      connectionsData.value.shift();
      timestamps.value.shift();
    }
  }, 2000); // Update every 2 seconds
});

// Clean up interval on component unmount
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

// Format timestamps for display
const formattedTimestamps = computed(() => {
  return timestamps.value.map(ts => {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
});

// Chart series data
const chartSeries = computed(() => {
  return [
    {
      name: 'Uso de CPU (%)',
      data: cpuData.value
    },
    {
      name: 'Uso de Memoria (%)',
      data: memoryData.value
    },
    {
      name: 'Conexiones Activas',
      data: connectionsData.value
    }
  ];
});

// Chart options
const chartOptions = computed(() => {
  return {
    chart: {
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#008FFB', '#00E396', '#FEB019'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    grid: {
      borderColor: '#f1f1f1',
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 0.5
      }
    },
    markers: {
      size: 4,
      hover: {
        size: 6
      }
    },
    xaxis: {
      categories: formattedTimestamps.value,
      labels: {
        rotate: -45,
        rotateAlways: false,
        style: {
          fontSize: '10px'
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'CPU y Memoria (%)'
        },
        min: 0,
        max: 100
      },
      {
        opposite: true,
        title: {
          text: 'Conexiones'
        },
        min: 0,
        max: 200
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + "%";
            }
            return y;
          }
        },
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + "%";
            }
            return y;
          }
        },
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          }
        }
      ]
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    }
  };
});
</script>

<style scoped>
.chart-container {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 400px;
  position: relative;
}

h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
  font-size: 1.25rem;
}
</style> 