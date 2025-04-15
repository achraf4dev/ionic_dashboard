<template>
  <div class="chart-container">
    <div class="chart-header">
      <div class="title-area">
        <h3 class="chart-title">Satisfacción del Cliente</h3>
        <p class="chart-subtitle">Calificaciones de todas las interacciones de servicio</p>
      </div>
      <div class="chart-legend">
        <span class="legend-item">
          <span class="color-dot" style="background-color: #10b981"></span>
          <span>Positivo</span>
        </span>
        <span class="legend-item">
          <span class="color-dot" style="background-color: #f59e0b"></span>
          <span>Neutral</span>
        </span>
        <span class="legend-item">
          <span class="color-dot" style="background-color: #ef4444"></span>
          <span>Negativo</span>
        </span>
      </div>
    </div>
    
    <div class="chart-stats">
      <div class="stat-item">
        <div class="stat-value">{{ averageSatisfaction }}/5</div>
        <div class="stat-label">Calificación Media</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" :class="responseRateClass">{{ responseRate }}%</div>
        <div class="stat-label">Tasa de Respuesta</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" :class="positiveRatioClass">{{ positiveRatio }}%</div>
        <div class="stat-label">Reseñas Positivas</div>
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
import { LineChart, BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, DataZoomComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import businessData from '@/data/business.json';

// Register ECharts components
use([CanvasRenderer, LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent, DataZoomComponent]);

// Mock data for satisfaction since they're not in the original data
const satisfactionData = ref({
  positive: 450,
  neutral: 120,
  negative: 30,
  responseRate: 85,
  dates: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  positiveTrend: [40, 45, 48, 50, 52, 55],
  neutralTrend: [15, 14, 12, 11, 10, 8],
  negativeTrend: [5, 4, 3, 3, 2, 2],
  averageTrend: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7]
});

// Calculate statistics
const averageSatisfaction = computed(() => {
  const totalRatings = satisfactionData.value.positive + 
                      satisfactionData.value.neutral + 
                      satisfactionData.value.negative;
  const weightedSum = (satisfactionData.value.positive * 5) + 
                      (satisfactionData.value.neutral * 3) + 
                      (satisfactionData.value.negative * 1);
  return totalRatings > 0 ? (weightedSum / totalRatings).toFixed(1) : 0;
});

const responseRate = computed(() => {
  return satisfactionData.value.responseRate;
});

const positiveRatio = computed(() => {
  const totalRatings = satisfactionData.value.positive + 
                      satisfactionData.value.neutral + 
                      satisfactionData.value.negative;
  return totalRatings > 0 ? Math.round((satisfactionData.value.positive / totalRatings) * 100) : 0;
});

const responseRateClass = computed(() => {
  if (responseRate.value >= 70) return 'text-success';
  if (responseRate.value >= 50) return 'text-warning';
  return 'text-danger';
});

const positiveRatioClass = computed(() => {
  if (positiveRatio.value >= 80) return 'text-success';
  if (positiveRatio.value >= 60) return 'text-warning';
  return 'text-danger';
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
      data: satisfactionData.value.dates,
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
      name: 'Cantidad de Calificaciones',
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
        name: 'Positivo',
        type: 'bar',
        stack: 'satisfaction',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#10b981'
        },
        data: satisfactionData.value.positiveTrend,
        barWidth: '60%',
        barGap: '0%',
        barCategoryGap: '20%',
        animationDuration: 1000,
        animationEasing: 'cubicOut'
      },
      {
        name: 'Neutral',
        type: 'bar',
        stack: 'satisfaction',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#f59e0b'
        },
        data: satisfactionData.value.neutralTrend,
        animationDuration: 1200,
        animationEasing: 'cubicOut'
      },
      {
        name: 'Negativo',
        type: 'bar',
        stack: 'satisfaction',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#ef4444'
        },
        data: satisfactionData.value.negativeTrend,
        animationDuration: 1400,
        animationEasing: 'cubicOut'
      },
      {
        name: 'Calificación Media',
        type: 'line',
        yAxisIndex: 0,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          color: '#3b82f6'
        },
        lineStyle: {
          color: '#3b82f6',
          width: 2,
          type: 'solid'
        },
        emphasis: {
          focus: 'series',
          scale: true
        },
        data: satisfactionData.value.averageTrend,
        z: 10,
        animationDuration: 1600,
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