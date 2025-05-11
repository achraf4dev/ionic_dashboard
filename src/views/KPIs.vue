<template>
  <div class="kpis-view">
    <div class="description-container">
      <h2>Key Performance Indicators Dashboard</h2>
      <p>This dashboard provides descriptions of all charts available in the Business and Technical views.</p>
    </div>

    <div class="dashboard-container">
      <!-- Left Column: Business Charts from Business.vue -->
      <div class="column business-column">
        <h3 class="column-title">Business Charts</h3>
        <div class="charts-container">
          <div class="chart-card">
            <ion-accordion-group>
              <ion-accordion value="revenue" expanded>
                <ion-item slot="header" color="light">
                  <ion-label>Revenue Trends (ApexLine)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Line Chart</h3>
                    <p>Located in the first row of the Business view. This chart visualizes revenue trends over time, showing monthly and quarterly performance data.</p>
                    <p>Key metrics:</p>
                    <ul>
                      <li>Total Revenue: $89,452</li>
                      <li>Revenue Growth: +8.2%</li>
                      <li>Historical and projected revenue patterns</li>
                    </ul>
                  </div>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </div>

          <div class="chart-card">
            <ion-accordion-group>
              <ion-accordion value="heatmap">
                <ion-item slot="header" color="light">
                  <ion-label>Revenue Heatmap (ApexHeatmap)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Heatmap</h3>
                    <p>Located in the first row of the Business view. This visualization shows revenue density across different categories and time periods.</p>
                    <p>Key insights:</p>
                    <ul>
                      <li>High-performing product categories</li>
                      <li>Seasonal trends and patterns</li>
                      <li>Market concentration areas</li>
                    </ul>
                  </div>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </div>

          <div class="chart-card">
            <ion-accordion-group>
              <ion-accordion value="distribution">
                <ion-item slot="header" color="light">
                  <ion-label>Revenue Distribution (ApexDonut)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Donut Chart</h3>
                    <p>Located in the second row of the Business view. This chart breaks down revenue by product category or business segment.</p>
                    <p>Key metrics:</p>
                    <ul>
                      <li>Revenue distribution across product lines</li>
                      <li>Percentage contribution of each category</li>
                      <li>Performance comparison between segments</li>
                    </ul>
                  </div>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </div>

          <div class="chart-card">
            <ion-accordion-group>
              <ion-accordion value="pie">
                <ion-item slot="header" color="light">
                  <ion-label>Customer Segments (ChartPie)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Pie Chart</h3>
                    <p>Located in the second row of the Business view. This visualization shows the distribution of customers across different segments.</p>
                    <p>Key metrics:</p>
                    <ul>
                      <li>Customer segmentation percentages</li>
                      <li>Customer acquisition: 385 new customers</li>
                      <li>Segment growth rates and trends</li>
                    </ul>
                  </div>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </div>

          <div class="chart-card">
            <ion-accordion-group>
              <ion-accordion value="scatter">
                <ion-item slot="header" color="light">
                  <ion-label>Customer Behavior (ChartScatter)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Scatter Plot</h3>
                    <p>Located in the second row of the Business view. This chart maps customer behaviors across multiple dimensions.</p>
                    <p>Key insights:</p>
                    <ul>
                      <li>Customer engagement patterns</li>
                      <li>Correlation between metrics</li>
                      <li>Conversion rate: 12.8% (+5.4%)</li>
                      <li>Total orders: 2,485 (-3.8%)</li>
                    </ul>
                  </div>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </div>
        </div>
      </div>

      <!-- Right Column: Technical Charts from Technique.vue -->
      <div class="column technical-column">
        <h3 class="column-title">Technical Charts</h3>
        <div class="charts-container">
          <div class="chart-card">
            <ion-accordion-group>
              <ion-accordion value="candle" expanded>
                <ion-item slot="header" color="light">
                  <ion-label>System Performance (EChartCandle)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Candlestick Chart</h3>
                    <p>Located in the first row of the Technique view. This chart displays system performance variations over time.</p>
                    <p>Key metrics:</p>
                    <ul>
                      <li>Server uptime: 99.92% (+0.4%)</li>
                      <li>Performance high/low ranges</li>
                      <li>Daily performance opening and closing values</li>
                    </ul>
                  </div>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </div>

          <div class="chart-card">
            <ion-accordion-group>
              <ion-accordion value="bar">
                <ion-item slot="header" color="light">
                  <ion-label>API Performance (EChartBar)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Bar Chart</h3>
                    <p>Located in the first row of the Technique view. This visualization compares performance metrics across different API endpoints.</p>
                    <p>Key metrics:</p>
                    <ul>
                      <li>API requests: 1.28M (+15.7%)</li>
                      <li>Comparative performance across services</li>
                      <li>Response time distribution by endpoint</li>
                    </ul>
                  </div>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </div>

          <div class="chart-card">
            <ion-accordion-group>
              <ion-accordion value="bubble">
                <ion-item slot="header" color="light">
                  <ion-label>Resource Usage (ChartBubble)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Bubble Chart</h3>
                    <p>Located in the second row of the Technique view. This chart visualizes multi-dimensional resource utilization data.</p>
                    <p>Key metrics:</p>
                    <ul>
                      <li>Response time: 234ms (-12.3%)</li>
                      <li>Resource usage correlations</li>
                      <li>Sizing based on resource importance</li>
                    </ul>
                  </div>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </div>

          <div class="chart-card">
            <ion-accordion-group>
              <ion-accordion value="radar">
                <ion-item slot="header" color="light">
                  <ion-label>System Health (EChartRadar)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Radar Chart</h3>
                    <p>Located in the second row of the Technique view. This visualization shows multiple system health metrics in a radar format.</p>
                    <p>Key metrics:</p>
                    <ul>
                      <li>Multi-dimensional performance analysis</li>
                      <li>System metrics across multiple categories</li>
                      <li>Performance benchmarking against targets</li>
                    </ul>
                  </div>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </div>

          <div class="chart-card">
            <ion-accordion-group>
              <ion-accordion value="doughnut">
                <ion-item slot="header" color="light">
                  <ion-label>Resource Distribution (ChartDoughnut)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Doughnut Chart</h3>
                    <p>Located in the second row of the Technique view. This chart shows the distribution of computing resources.</p>
                    <p>Key metrics:</p>
                    <ul>
                      <li>Error rate: 0.08% (-5.2%)</li>
                      <li>Resource allocation percentages</li>
                      <li>System resource distribution across services</li>
                    </ul>
                  </div>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  IonAccordion, 
  IonAccordionGroup, 
  IonItem, 
  IonLabel
} from '@ionic/vue';
</script>

<style scoped>
.kpis-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 30px;
  gap: 1.5rem;
  padding: 2rem;
  overflow: auto;
  background-color: var(--ion-color-light-tint, #f7f8fa);
}

.description-container {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
}

.description-container h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--ion-color-dark);
}

.description-container p {
  color: var(--ion-color-medium);
  line-height: 1.6;
  font-size: 1rem;
}

.dashboard-container {
  display: flex;
  gap: 1.5rem;
  width: 100%;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.column-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--ion-color-light);
}

.business-column .column-title {
  color: var(--ion-color-primary);
  border-bottom-color: var(--ion-color-primary-tint);
}

.technical-column .column-title {
  color: var(--ion-color-tertiary);
  border-bottom-color: var(--ion-color-tertiary-tint);
}

.charts-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.chart-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.chart-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

ion-item {
  --background: rgba(var(--ion-color-light-rgb), 0.6);
  --border-radius: 8px;
}

.chart-content {
  padding: 1.25rem;
}

.chart-description h3 {
  font-size: 1.15rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: var(--ion-color-dark);
}

.chart-description p {
  margin-bottom: 0.75rem;
  color: var(--ion-color-medium);
  line-height: 1.6;
  font-size: 0.95rem;
}

.chart-description ul {
  padding-left: 1.25rem;
  margin-top: 0.5rem;
}

.chart-description li {
  margin-bottom: 0.5rem;
  color: var(--ion-color-medium);
  line-height: 1.5;
  font-size: 0.95rem;
}

ion-accordion {
  margin: 0;
}

ion-accordion-group {
  box-shadow: none;
}

/* Tablet layout */
@media (max-width: 1024px) and (min-width: 769px) {
  .dashboard-container {
    flex-direction: column;
  }
  
  .column {
    width: 100%;
  }
  
  .kpis-view {
    padding: 1.5rem;
  }
}

/* Mobile layout */
@media (max-width: 768px) {
  .kpis-view {
    padding: 1.25rem;
    gap: 1.25rem;
    height: auto;
    overflow: auto;
  }
  
  .dashboard-container {
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .column {
    width: 100%;
  }
  
  .description-container {
    padding: 1.25rem;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .kpis-view {
    padding: 1rem;
    gap: 1rem;
  }
  
  .description-container {
    padding: 1rem;
  }
  
  .description-container h2 {
    font-size: 1.5rem;
  }
  
  .column-title {
    font-size: 1.15rem;
  }
  
  .chart-description h3 {
    font-size: 1.1rem;
  }
  
  .chart-card {
    border-radius: 10px;
  }
}
</style> 