<template>
  <div class="business-view">
    <div class="stats-container">
      <StatsCard 
        title="Total Revenue"
        value="$89,452"
        :trend="8.2"
        :icon="cashOutline"
        iconColor="#ffffff"
        iconBgColor="var(--ion-color-success)"
      />
      <StatsCard 
        title="New Customers"
        value="385"
        :trend="12.5"
        :icon="peopleOutline"
        iconColor="#ffffff"
        iconBgColor="var(--ion-color-primary)"
      />
      <StatsCard 
        title="Total Orders"
        value="2,485"
        :trend="-3.8"
        :icon="cartOutline"
        iconColor="#ffffff"
        iconBgColor="var(--ion-color-tertiary)"
      />
      <StatsCard 
        title="Conversion Rate"
        value="12.8%"
        :trend="5.4"
        :icon="trendingUpOutline"
        iconColor="#ffffff"
        iconBgColor="var(--ion-color-warning)"
      />
    </div>

    <div class="charts-container">
      <div class="chart-card first-row">
        <h2>Revenue Trends</h2>
        <ApexLine />
      </div>
      <div class="chart-card first-row">
        <ApexHeatmap />
      </div>
      <div class="chart-card second-row">
        <h2>Revenue Distribution</h2>
        <ApexDonut />
      </div>
      <div class="chart-card second-row">
        <ChartPie />
      </div>
      <div class="chart-card second-row">
        <ChartScatter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import { cashOutline, peopleOutline, cartOutline, trendingUpOutline } from 'ionicons/icons';
import StatsCard from '../components/StatsCard.vue';
import ApexLine from '../components/charts/ApexLine.vue';
import ApexDonut from '../components/charts/ApexDonut.vue';
import ApexHeatmap from '../components/charts/ApexHeatmap.vue';
import ChartPie from '../components/charts/ChartPie.vue';
import ChartScatter from '../components/charts/ChartScatter.vue';
</script>

<style scoped>
.business-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  padding-top: 4vh;
  padding-bottom: 1vh;
  margin-top: 0;
  overflow: hidden; /* Hidden by default for larger screens */
  padding-left: 1rem;
  padding-right: 1rem;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  flex-shrink: 0;
  margin-top: 20px;
  padding-top: 10px;
  width: 100%;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  gap: 15px;
  flex: 1;
  min-height: 0;
  max-height: 100%;
  width: 100%;
}

.chart-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.first-row {
  grid-row: 1;
}

.second-row {
  grid-row: 2;
}

.chart-card.first-row:nth-child(1) {
  grid-column: 1 / 2;
}

.chart-card.first-row:nth-child(2) {
  grid-column: 2 / 4;
}

.chart-card.second-row:nth-child(3) {
  grid-column: 1 / 2;
}

.chart-card.second-row:nth-child(4) {
  grid-column: 2 / 3;
}

.chart-card.second-row:nth-child(5) {
  grid-column: 3 / 4;
}

.chart-card h2 {
  font-size: 16px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 16px;
  color: var(--ion-color-dark);
  flex-shrink: 0;
}

/* Tablet layout */
@media (max-width: 1024px) and (min-width: 769px) {
  .charts-container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, minmax(0, 1fr));
  }
  
  .chart-card.first-row:nth-child(1) {
    grid-column: 1 / 2;
    grid-row: 1;
  }
  
  .chart-card.first-row:nth-child(2) {
    grid-column: 2 / 3;
    grid-row: 1;
  }
  
  .chart-card.second-row:nth-child(3) {
    grid-column: 1 / 2;
    grid-row: 2;
  }
  
  .chart-card.second-row:nth-child(4) {
    grid-column: 2 / 3;
    grid-row: 2;
  }
  
  .chart-card.second-row:nth-child(5) {
    grid-column: 1 / 3;
    grid-row: 3;
  }
}

/* Mobile layout */
@media (max-width: 768px) {
  .business-view {
    padding-top: 2vh;
    gap: 0.8rem;
    height: auto;
    overflow: auto;
    padding-bottom: 2vh;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, minmax(0, 1fr));
  }
  
  .chart-card {
    min-height: 300px; /* Fixed minimum height for charts on mobile */
    margin-bottom: 15px; /* Add space between charts when stacked */
  }
  
  .chart-card.first-row:nth-child(1),
  .chart-card.first-row:nth-child(2),
  .chart-card.second-row:nth-child(3),
  .chart-card.second-row:nth-child(4),
  .chart-card.second-row:nth-child(5) {
    grid-column: 1;
  }
  
  .chart-card.first-row:nth-child(1) {
    grid-row: 1;
  }
  
  .chart-card.first-row:nth-child(2) {
    grid-row: 2;
  }
  
  .chart-card.second-row:nth-child(3) {
    grid-row: 3;
  }
  
  .chart-card.second-row:nth-child(4) {
    grid-row: 4;
  }
  
  .chart-card.second-row:nth-child(5) {
    grid-row: 5;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .chart-card {
    padding: 8px;
  }
  
  .chart-card h2 {
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style> 