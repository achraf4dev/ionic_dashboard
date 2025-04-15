<template>
  <div class="chart-container">
    <div class="chart-header">
      <div class="title-area">
        <h3 class="chart-title">Tasas de Error del Sistema</h3>
        <p class="chart-subtitle">Frecuencia de ocurrencia de errores en todos los servicios</p>
      </div>
      <div class="chart-legend">
        <span class="legend-item">
          <span class="color-dot" style="background-color: #ef4444"></span>
          <span>Errores Críticos</span>
        </span>
        <span class="legend-item">
          <span class="color-dot" style="background-color: #f97316"></span>
          <span>Errores de Advertencia</span>
        </span>
        <span class="legend-item">
          <span class="color-dot" style="background-color: #3b82f6"></span>
          <span>Errores Controlados</span>
        </span>
      </div>
    </div>
    
    <div class="chart-stats">
      <div class="stat-item">
        <div class="stat-value">{{ totalErrors }}</div>
        <div class="stat-label">Errores Totales</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" :class="criticalErrorsClass">{{ criticalErrors }}</div>
        <div class="stat-label">Errores Críticos</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">{{ errorRate }}%</div>
        <div class="stat-label">Tasa de Error</div>
      </div>
    </div>
    
    <div class="chart-body">
      <v-chart class="chart" :option="chartOption" autoresize />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, DataZoomComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import technicalData from '@/data/technical.json';

// Register ECharts components
use([CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent, DataZoomComponent]);

// Mock data for error categories since they're not in the original data
const errorData = ref({
  dates: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
  critical: [3, 2, 4, 1, 2],
  warning: [5, 4, 6, 3, 4],
  handled: [8, 7, 5, 9, 7],
  requests: [1000, 1200, 980, 1050, 1100]
});

// Calculate statistics
const totalErrors = computed(() => {
  return errorData.value.critical.reduce((acc, val) => acc + val, 0) +
    errorData.value.warning.reduce((acc, val) => acc + val, 0) +
    errorData.value.handled.reduce((acc, val) => acc + val, 0);
});

const criticalErrors = computed(() => {
  return errorData.value.critical.reduce((acc, val) => acc + val, 0);
});

const errorRate = computed(() => {
  const total = errorData.value.requests.reduce((acc, val) => acc + val, 0);
  return total > 0 ? ((totalErrors.value / total) * 100).toFixed(2) : 0;
});

const criticalErrorsClass = computed(() => {
  return criticalErrors.value > 5 ? 'text-danger' : 'text-warning';
});

const chartOption = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(226, 232, 240, 0.8)',
      borderWidth: 1,
      textStyle: {
        color: '#475569',
        fontSize: 12,
        fontFamily: "'Inter', sans-serif"
      },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      padding: 12,
      extraCssText: 'box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08); border-radius: 6px;'
    },
    grid: {
      top: 10,
      right: 16,
      bottom: 30,
      left: 55,
      containLabel: false
    },
    xAxis: {
      type: 'category',
      data: errorData.value.dates,
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#64748b',
        fontSize: 11,
        fontFamily: "'Inter', sans-serif",
        interval: 'auto',
        hideOverlap: true
      }
    },
    yAxis: {
      type: 'value',
      name: 'Cantidad de Errores',
      nameTextStyle: {
        color: '#64748b',
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
        padding: [0, 0, 10, 0]
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(226, 232, 240, 0.5)',
          type: 'dashed'
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#64748b',
        fontSize: 11,
        fontFamily: "'Inter', sans-serif"
      }
    },
    series: [
      {
        name: 'Errores Críticos',
        type: 'bar',
        stack: 'error',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#ef4444'
        },
        data: errorData.value.critical,
        barWidth: '60%',
        barGap: '0%',
        barCategoryGap: '20%',
        animationDuration: 1000,
        animationEasing: 'cubicOut'
      },
      {
        name: 'Errores de Advertencia',
        type: 'bar',
        stack: 'error',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#f97316'
        },
        data: errorData.value.warning,
        animationDuration: 1200,
        animationEasing: 'cubicOut'
      },
      {
        name: 'Errores Controlados',
        type: 'bar',
        stack: 'error',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#3b82f6'
        },
        data: errorData.value.handled,
        animationDuration: 1400,
        animationEasing: 'cubicOut'
      }
    ]
  };
});
</script>

<style scoped>
.chart-container {
  background-color: white;
  border-radius: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  box-sizing: border-box;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  gap: 1rem;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.title-area {
  flex: 1 1 auto;
  min-width: 180px;
}

.chart-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
  line-height: 1.2;
}

.chart-subtitle {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
  line-height: 1.2;
}

.chart-legend {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #64748b;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  white-space: nowrap;
}

.color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.chart-stats {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

.stat-item {
  min-width: 100px;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.1rem;
}

.text-success {
  color: #10b981;
}

.text-warning {
  color: #f97316;
}

.text-danger {
  color: #ef4444;
}

.chart-body {
  flex-grow: 1;
  min-height: 250px;
  position: relative;
}

.chart {
  width: 100%;
  height: 100%;
}

@media (max-width: 640px) {
  .chart-container {
    padding: 1rem;
  }
  
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .chart-stats {
    gap: 1rem;
  }
  
  .stat-item {
    min-width: 80px;
  }
}
</style> 