/// <reference types="vite/client" />

declare module 'vue3-apexcharts';
declare module 'chart.js';
declare module 'vue-chartjs';
declare module 'echarts/core';
declare module 'echarts/renderers';
declare module 'echarts/charts';
declare module 'echarts/components';
declare module 'vue-echarts';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
