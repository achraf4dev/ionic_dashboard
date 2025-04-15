<template>
  <div class="chart-container">
    <h3>Análisis de Duración de Sesión</h3>
    <div class="chart-tabs">
      <button 
        :class="{ 'active': activeTab === 'page' }" 
        @click="activeTab = 'page'"
      >
        Por Página
      </button>
      <button 
        :class="{ 'active': activeTab === 'device' }" 
        @click="activeTab = 'device'"
      >
        Por Dispositivo
      </button>
    </div>
    <div class="average-banner">
      <div class="average-value">
        <span class="label">Sesión Promedio:</span>
        <span class="value">{{ formatDuration(averageDuration) }}</span>
      </div>
      <div 
        class="target-value"
        :class="{ 'above-target': averageDuration >= target, 'below-target': averageDuration < target }"
      >
        <span class="label">Objetivo:</span>
        <span class="value">{{ formatDuration(target) }}</span>
      </div>
    </div>
    <div class="chart-content">
      <div v-if="activeTab === 'page'" class="bar-chart">
        <div 
          v-for="(item, index) in pageData" 
          :key="index" 
          class="bar-item"
        >
          <div class="bar-label">{{ item.page }}</div>
          <div class="bar-wrapper">
            <div 
              class="bar" 
              :style="{ width: calculateWidth(item.duration) + '%' }"
              :class="{ 'above-target': item.duration >= target, 'below-target': item.duration < target }"
            ></div>
            <div class="bar-value">{{ formatDuration(item.duration) }}</div>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'device'" class="device-chart">
        <VueApexCharts
          type="donut"
          height="100%"
          :options="deviceChartOptions"
          :series="deviceChartSeries"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineComponent } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import businessData from '@/data/business.json';

// Extract the data
const pageData = businessData.sessionDuration.byPage;
const deviceData = businessData.sessionDuration.byDevice;
const averageDuration = businessData.sessionDuration.average;
const target = businessData.sessionDuration.target;

// Track which tab is active
const activeTab = ref('page');

// Format duration in seconds to minutes and seconds
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

// Calculate percentage width for the bar chart
const calculateWidth = (duration) => {
  // Find the maximum duration for scaling
  const maxDuration = Math.max(...pageData.map(item => item.duration));
  // Scale to 0-100%
  return (duration / maxDuration) * 90; // Max 90% to leave room for label
};

// Data for device pie chart
const deviceChartSeries = computed(() => {
  return deviceData.map(item => item.duration);
});

const deviceChartOptions = computed(() => {
  return {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      animations: {
        enabled: true,
        speed: 500,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    labels: deviceData.map(item => item.device),
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899'],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      formatter: function(seriesName, opts) {
        return [
          seriesName,
          ': ',
          formatDuration(deviceData[opts.seriesIndex].duration)
        ].join('');
      }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      y: {
        formatter: function(value) {
          return formatDuration(value);
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontWeight: 600
            },
            value: {
              show: true,
              fontWeight: 700,
              formatter: function(val) {
                return formatDuration(val);
              }
            },
            total: {
              show: true,
              label: 'Promedio',
              fontWeight: 700,
              formatter: function() {
                return formatDuration(averageDuration);
              }
            }
          }
        }
      }
    },
    stroke: {
      width: 0
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 250
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center'
        }
      }
    }],
    dataLabels: {
      enabled: false
    }
  };
});
</script>

<style scoped>
.chart-container {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 100%;
  min-height: 400px;
  max-height: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
}

.chart-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.chart-tabs button {
  background-color: #f3f4f6;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chart-tabs button:hover {
  background-color: #e5e7eb;
}

.chart-tabs button.active {
  background-color: #3b82f6;
  color: white;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.average-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.average-value, .target-value {
  display: flex;
  align-items: center;
  gap: 10px;
}

.label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
}

.target-value.above-target .value {
  color: #10b981;
}

.target-value.below-target .value {
  color: #ef4444;
}

.chart-content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-right: 8px;
  height: 100%;
}

.bar-item {
  display: flex;
  align-items: center;
}

.bar-label {
  width: 130px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px;
}

.bar-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  height: 28px;
}

.bar {
  height: 18px;
  border-radius: 6px;
  position: relative;
  transition: width 0.5s ease-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.bar.above-target {
  background: linear-gradient(90deg, #10b981, #34d399);
}

.bar.below-target {
  background: linear-gradient(90deg, #ef4444, #f87171);
}

.bar-value {
  margin-left: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

.device-chart {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 640px) {
  .chart-container {
    padding: 16px;
  }
  
  .average-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .bar-label {
    width: 100px;
  }
}
</style> 