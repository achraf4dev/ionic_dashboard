<template>
  <div class="chart-container">
    <h3>Cobertura de Código por Módulo</h3>
    <div class="chart-wrapper">
      <apexchart
        type="bar"
        height="100%"
        :options="chartOptions"
        :series="chartSeries"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import technicalData from '@/data/technical.json';

const chartSeries = computed(() => {
  return [
    {
      name: 'Cobertura %',
      data: technicalData.codeCoverage.modules.map(module => module.coverage)
    }
  ];
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      fontFamily: 'Inter, system-ui, sans-serif',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 8,
        barHeight: '60%',
        distributed: false,
        dataLabels: {
          position: 'top',
        },
      }
    },
    colors: ['#4ade80', '#f43f5e'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        fontSize: '12px',
        fontWeight: 600,
        colors: ['#111827']
      },
      offsetX: 0,
    },
    xaxis: {
      categories: technicalData.codeCoverage.modules.map(module => module.name),
      labels: {
        style: {
          fontSize: '13px',
          fontWeight: 500,
          colors: '#4b5563'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      max: 100
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '13px',
          fontWeight: 500,
          colors: '#4b5563'
        }
      }
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10
      }
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '13px'
      },
      y: {
        formatter: function (val) {
          return val + '%';
        }
      }
    },
    annotations: {
      xaxis: [{
        x: technicalData.codeCoverage.threshold,
        borderColor: '#f43f5e',
        strokeDashArray: 0,
        width: 2,
        label: {
          borderColor: '#f43f5e',
          style: {
            color: '#fff',
            background: '#f43f5e',
            padding: {
              left: 8,
              right: 8
            },
            fontSize: '12px',
            fontWeight: 600
          },
          text: 'Umbral'
        }
      }]
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.3,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.15
        }
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.2
        }
      }
    }
  };
});

// Create colored bars based on threshold
const formattedSeries = computed(() => {
  return [{
    name: 'Cobertura %',
    data: technicalData.codeCoverage.modules.map(module => ({
      x: module.name,
      y: module.coverage,
      color: module.coverage >= technicalData.codeCoverage.threshold ? '#4ade80' : '#f43f5e'
    }))
  }];
});
</script>

<style scoped>
.chart-container {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  height: 400px;
  position: relative;
  transition: all 0.3s ease;
}

.chart-container:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.chart-wrapper {
  height: calc(100% - 40px);
}

h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #111827;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}
</style> 