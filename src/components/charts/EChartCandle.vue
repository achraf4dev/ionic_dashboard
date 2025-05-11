<template>
  <div class="chart-container">
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { CandlestickChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import echartsData from '../../data/echarts-data.json';

// Register ECharts components
use([
  CanvasRenderer,
  CandlestickChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent
]);

const option = shallowRef({
  title: {
    text: 'Resource Usage Patterns',
    left: 'left',
    textStyle: {
      fontSize: 14,
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    formatter: function (params: any) {
      const param = params[0];
      return [
        'Date: ' + param.name + '<br/>',
        'Open: ' + param.data[0] + '<br/>',
        'Close: ' + param.data[1] + '<br/>',
        'Low: ' + param.data[2] + '<br/>',
        'High: ' + param.data[3] + '<br/>'
      ].join('');
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: echartsData.candle.xAxis.data,
    scale: true,
    boundaryGap: false,
    axisLine: { onZero: false },
    splitLine: { show: false },
    splitNumber: 20
  },
  yAxis: {
    scale: true,
    splitLine: { show: true }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100
    },
    {
      show: true,
      type: 'slider',
      top: '90%',
      start: 0,
      end: 100
    }
  ],
  series: [
    {
      type: 'candlestick',
      name: 'Resource Usage',
      data: echartsData.candle.series[0].data,
      itemStyle: {
        color: '#0063F7',
        color0: '#5CCB58',
        borderColor: '#0063F7',
        borderColor0: '#5CCB58'
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

.chart {
  width: 100%;
  height: 100%;
}
</style> 