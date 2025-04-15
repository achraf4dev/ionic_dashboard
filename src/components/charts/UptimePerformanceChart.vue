<template>
  <div class="chart-container">
    <h3>Rendimiento de Tiempo de Actividad</h3>
    <div class="uptime-chart">
      <div class="uptime-gauge">
        <div class="gauge-value">{{ currentUptime }}%</div>
        <svg width="200" height="120" viewBox="0 0 200 120">
          <path 
            d="M20,100 A80,80 0 0,1 180,100" 
            fill="none" 
            stroke="#eaecef" 
            stroke-width="20" 
            stroke-linecap="round" />
          <path 
            d="M20,100 A80,80 0 0,1 180,100" 
            fill="none" 
            :stroke="uptimeColor" 
            stroke-width="20" 
            stroke-linecap="round" 
            :stroke-dasharray="gaugePercentage + ' 100'" />
        </svg>
        <div class="gauge-label">Actividad Actual</div>
      </div>
      <div class="uptime-history">
        <div class="uptime-bars">
          <div 
            v-for="(value, index) in historicalUptime" 
            :key="index" 
            class="uptime-bar"
            :style="{ 
              height: calculateBarHeight(value) + '%',
              backgroundColor: calculateBarColor(value)
            }"
            :title="`${labels[index]}: ${value}%`"
          >
            <div class="bar-value">{{ formatUptime(value) }}</div>
          </div>
        </div>
        <div class="uptime-labels">
          <div 
            v-for="(label, index) in labels" 
            :key="index" 
            class="uptime-label"
          >
            {{ label }}
          </div>
        </div>
      </div>
    </div>
    <div class="summary-metrics">
      <div class="metric">
        <div class="metric-title">Promedio</div>
        <div class="metric-value">{{ averageUptime }}%</div>
      </div>
      <div class="metric">
        <div class="metric-title">Objetivo</div>
        <div class="metric-value">{{ uptimeThreshold }}%</div>
      </div>
      <div class="metric">
        <div class="metric-title">Estado</div>
        <div class="metric-status" :class="statusClass">{{ status }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import technicalData from '@/data/technical.json';

// Extract data from the imported JSON
const labels = technicalData.uptimePercentage.labels;
const historicalUptime = technicalData.uptimePercentage.historical;
const currentUptime = technicalData.uptimePercentage.current;
const uptimeThreshold = technicalData.uptimePercentage.threshold;

// Calculate average
const averageUptime = computed(() => {
  const sum = historicalUptime.reduce((acc, val) => acc + val, 0);
  return (sum / historicalUptime.length).toFixed(2);
});

// Calculate gauge percentage (0-100)
const gaugePercentage = computed(() => {
  // Scale from 90-100% to 0-100% for better visual representation
  // Most uptime values are in the high 90s, so this makes the gauge more meaningful
  const min = 90; // Minimum expected uptime
  const max = 100; // Maximum possible uptime
  
  // Calculate the position within our custom range (0-100)
  let scaled = ((currentUptime - min) / (max - min)) * 100;
  
  // Ensure values stay within 0-100 range
  scaled = Math.max(0, Math.min(100, scaled));
  
  return scaled;
});

// Determine color based on uptime value
const uptimeColor = computed(() => {
  if (currentUptime >= uptimeThreshold) {
    return '#00C853'; // Good (green)
  } else if (currentUptime >= uptimeThreshold - 0.2) {
    return '#FFD600'; // Warning (yellow)
  } else {
    return '#F44336'; // Critical (red)
  }
});

// Status text
const status = computed(() => {
  if (currentUptime >= uptimeThreshold) {
    return 'Excelente';
  } else if (currentUptime >= uptimeThreshold - 0.2) {
    return 'Advertencia';
  } else {
    return 'Crítico';
  }
});

// Status class for styling
const statusClass = computed(() => {
  if (currentUptime >= uptimeThreshold) {
    return 'status-good';
  } else if (currentUptime >= uptimeThreshold - 0.2) {
    return 'status-warning';
  } else {
    return 'status-critical';
  }
});

// Format uptime value for display
const formatUptime = (value) => {
  return value.toFixed(2);
};

// Calculate bar height (used for historical data)
const calculateBarHeight = (value) => {
  // Scale from 90-100% to 0-100% for better visual representation
  const min = 90;
  const max = 100;
  
  let scaled = ((value - min) / (max - min)) * 100;
  scaled = Math.max(0, Math.min(100, scaled));
  
  return scaled;
};

// Calculate bar color based on threshold
const calculateBarColor = (value) => {
  if (value >= uptimeThreshold) {
    return '#00C853'; // Good (green)
  } else if (value >= uptimeThreshold - 0.2) {
    return '#FFD600'; // Warning (yellow)
  } else {
    return '#F44336'; // Critical (red)
  }
};
</script>

<style scoped>
.chart-container {
  background-color: transparent;
  padding: 16px;
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
}

.uptime-chart {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 20px;
}

.uptime-gauge {
  width: 180px;
  position: relative;
  text-align: center;
  padding-right: 15px;
  border-right: 1px solid #f0f2f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.gauge-value {
  position: absolute;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  font-weight: 700;
  color: #2c3e50;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2px 8px;
  border-radius: 4px;
  z-index: 2;
}

.gauge-label {
  position: relative;
  margin-top: 70px;
  font-size: 0.8rem;
  color: #7f8c9d;
  font-weight: 500;
  background-color: #f9fafc;
  padding: 3px 10px;
  border-radius: 4px;
}

.uptime-history {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 160px;
}

.uptime-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 130px;
}

.uptime-bar {
  width: 24px;
  border-radius: 6px 6px 0 0;
  position: relative;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-height: 4px;
}

.uptime-bar:hover {
  transform: scaleY(1.05);
}

.bar-value {
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: #5e6d82;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.uptime-bar:hover .bar-value {
  opacity: 1;
}

.uptime-labels {
  display: flex;
  justify-content: space-around;
  margin-top: 8px;
}

.uptime-label {
  width: 24px;
  text-align: center;
  font-size: 0.7rem;
  color: #7f8c9d;
}

.summary-metrics {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #f0f2f5;
}

.metric {
  text-align: center;
  background-color: #f9fafc;
  padding: 8px 12px;
  border-radius: 6px;
  min-width: 80px;
}

.metric-title {
  font-size: 0.75rem;
  color: #7f8c9d;
  font-weight: 500;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  margin-top: 4px;
}

.metric-status {
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 4px;
}

.status-good {
  color: #22c55e;
}

.status-warning {
  color: #eab308;
}

.status-critical {
  color: #ef4444;
}

@media (max-width: 768px) {
  .uptime-chart {
    flex-direction: column;
    gap: 12px;
  }
  
  .uptime-gauge {
    width: 100%;
    padding-right: 0;
    padding-bottom: 15px;
    border-right: none;
    border-bottom: 1px solid #f0f2f5;
  }
  
  .summary-metrics {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .metric {
    flex: 1;
    min-width: 70px;
  }
}
</style> 