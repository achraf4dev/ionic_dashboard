<template>
  <div class="chart-container">
    <h3>Usuarios Activos en Tiempo Real</h3>
    <div class="metrics-summary">
      <div class="metric">
        <div class="metric-value">{{ currentUsers }}</div>
        <div class="metric-label">Usuarios Actuales</div>
      </div>
      <div class="metric">
        <div class="metric-value" :class="changeClass">{{ userChange > 0 ? '+' : '' }}{{ userChange }}</div>
        <div class="metric-label">Cambio</div>
      </div>
      <div class="metric">
        <div class="metric-value">{{ averageUsers }}</div>
        <div class="metric-label">Promedio</div>
      </div>
    </div>
    <apexchart
      type="area"
      height="75%"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import businessData from '@/data/business.json';

// Initial data from JSON
const usersData = ref([...businessData.realTimeUsers.data]);
const timestamps = ref([...businessData.realTimeUsers.timestamps]);

// Generate a random value that follows the trend of the last value
const generateNextValue = (currentValue, min, max, volatility = 15) => {
  // Random direction (up or down) with some trend following
  const direction = Math.random() > 0.5 ? 1 : -1;
  // Random change amount with volatility factor
  const change = Math.random() * volatility * direction;
  // Calculate new value
  let newValue = currentValue + change;
  // Ensure value stays within bounds
  newValue = Math.max(min, Math.min(max, newValue));
  return Math.round(newValue); // Round to integer for user count
};

// Generate next timestamp
const generateNextTimestamp = (lastTimestamp) => {
  const date = new Date(lastTimestamp);
  date.setMinutes(date.getMinutes() + 5); // Add 5 minutes
  return date.toISOString();
};

// Format timestamps for display
const formattedTimestamps = computed(() => {
  return timestamps.value.map(ts => {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
});

// Calculate metrics
const currentUsers = computed(() => {
  return usersData.value[usersData.value.length - 1];
});

const userChange = computed(() => {
  const current = usersData.value[usersData.value.length - 1];
  const previous = usersData.value[usersData.value.length - 2];
  return current - previous;
});

const changeClass = computed(() => {
  return userChange.value > 0 ? 'positive' : userChange.value < 0 ? 'negative' : '';
});

const averageUsers = computed(() => {
  const sum = usersData.value.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / usersData.value.length);
});

// Chart data
const chartSeries = computed(() => {
  return [
    {
      name: 'Usuarios Activos',
      data: usersData.value
    }
  ];
});

// Chart options
const chartOptions = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      },
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    colors: ['#3b82f6'],
    grid: {
      borderColor: '#f1f1f1',
      padding: {
        left: 10,
        right: 10
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
    yaxis: {
      labels: {
        formatter: function(val) {
          return val.toFixed(0);
        }
      },
      min: function(min) {
        return min * 0.8;
      },
      max: function(max) {
        return max * 1.1;
      }
    },
    markers: {
      size: 0
    },
    tooltip: {
      x: {
        format: 'HH:mm'
      }
    }
  };
});

// Update data at regular intervals to simulate real-time
let intervalId = null;
onMounted(() => {
  intervalId = setInterval(() => {
    // Add new data points
    const lastValue = usersData.value[usersData.value.length - 1];
    const lastTimestamp = timestamps.value[timestamps.value.length - 1];
    
    // Generate new values based on last values
    usersData.value.push(generateNextValue(lastValue, 300, 500));
    timestamps.value.push(generateNextTimestamp(lastTimestamp));
    
    // Remove oldest data point to maintain same number of points
    if (usersData.value.length > 20) {
      usersData.value.shift();
      timestamps.value.shift();
    }
  }, 3000); // Update every 3 seconds
});

// Clean up interval on component unmount
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
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
  display: flex;
  flex-direction: column;
}

h3 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #333;
  font-size: 1.25rem;
}

.metrics-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.metric {
  text-align: center;
  flex: 1;
  padding: 8px;
  background-color: #f9fafb;
  border-radius: 6px;
  margin: 0 8px;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
}

.metric-value.positive {
  color: #10b981;
}

.metric-value.negative {
  color: #ef4444;
}

.metric-label {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 4px;
}
</style> 