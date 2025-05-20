<template>
  <div class="kpis-view">
    <div class="description-container">
      <h2>Panel de Indicadores Clave de Rendimiento</h2>
      <p>Este panel proporciona descripciones de todos los gráficos disponibles en las vistas de Negocio y Técnica.</p>
    </div>

    <div class="dashboard-container">
      <!-- Left Column: Business Charts from Business.vue -->
      <div class="column business-column">
        <h3 class="column-title">Gráficos de Negocio</h3>
        <div class="charts-container">
          <div class="chart-card">
            <ion-accordion-group>
              <ion-accordion value="revenue" expanded>
                <ion-item slot="header" color="light">
                  <ion-label>Tendencias de Ingresos (ApexLine)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Gráfico de Líneas</h3>
                    <p>Ubicado en la primera fila de la vista de Negocio. Este gráfico visualiza las tendencias de ingresos a lo largo del tiempo, mostrando datos de rendimiento mensual y trimestral.</p>
                    <p>Métricas clave:</p>
                    <ul>
                      <li>Ingresos Totales: 8 452€</li>
                      <li>Crecimiento de Ingresos: +8.2%</li>
                      <li>Patrones históricos y proyectados de ingresos</li>
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
                  <ion-label>Mapa de Calor de Ingresos (ApexHeatmap)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Mapa de Calor</h3>
                    <p>Ubicado en la primera fila de la vista de Negocio. Esta visualización muestra la densidad de ingresos en diferentes categorías y períodos de tiempo.</p>
                    <p>Información clave:</p>
                    <ul>
                      <li>Categorías de productos de alto rendimiento</li>
                      <li>Tendencias y patrones estacionales</li>
                      <li>Áreas de concentración del mercado</li>
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
                  <ion-label>Distribución de Ingresos (ApexDonut)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Gráfico de Donut</h3>
                    <p>Ubicado en la segunda fila de la vista de Negocio. Este gráfico desglosa los ingresos por categoría de producto o segmento de negocio.</p>
                    <p>Métricas clave:</p>
                    <ul>
                      <li>Distribución de ingresos entre líneas de productos</li>
                      <li>Porcentaje de contribución de cada categoría</li>
                      <li>Comparación de rendimiento entre segmentos</li>
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
                  <ion-label>Segmentos de Clientes (ChartPie)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Gráfico Circular</h3>
                    <p>Ubicado en la segunda fila de la vista de Negocio. Esta visualización muestra la distribución de clientes en diferentes segmentos.</p>
                    <p>Métricas clave:</p>
                    <ul>
                      <li>Porcentajes de segmentación de clientes</li>
                      <li>Adquisición de clientes: 385 nuevos clientes</li>
                      <li>Tasas de crecimiento y tendencias por segmento</li>
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
                  <ion-label>Comportamiento del Cliente (ChartScatter)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Gráfico de Dispersión</h3>
                    <p>Ubicado en la segunda fila de la vista de Negocio. Este gráfico mapea los comportamientos de los clientes en múltiples dimensiones.</p>
                    <p>Información clave:</p>
                    <ul>
                      <li>Patrones de participación del cliente</li>
                      <li>Correlación entre métricas</li>
                      <li>Tasa de conversión: 12.8% (+5.4%)</li>
                      <li>Pedidos totales: 2,485 (-3.8%)</li>
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
        <h3 class="column-title">Gráficos Técnicos</h3>
        <div class="charts-container">
          <div class="chart-card">
            <ion-accordion-group>
              <ion-accordion value="candle" expanded>
                <ion-item slot="header" color="light">
                  <ion-label>Rendimiento del Sistema (EChartCandle)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Gráfico de Velas</h3>
                    <p>Ubicado en la primera fila de la vista Técnica. Este gráfico muestra las variaciones del rendimiento del sistema a lo largo del tiempo.</p>
                    <p>Métricas clave:</p>
                    <ul>
                      <li>Tiempo activo del servidor: 99.92% (+0.4%)</li>
                      <li>Rangos alto/bajo de rendimiento</li>
                      <li>Valores de apertura y cierre del rendimiento diario</li>
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
                  <ion-label>Rendimiento de API (EChartBar)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Gráfico de Barras</h3>
                    <p>Ubicado en la primera fila de la vista Técnica. Esta visualización compara métricas de rendimiento entre diferentes endpoints de API.</p>
                    <p>Métricas clave:</p>
                    <ul>
                      <li>Solicitudes API: 1.28M (+15.7%)</li>
                      <li>Rendimiento comparativo entre servicios</li>
                      <li>Distribución del tiempo de respuesta por endpoint</li>
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
                  <ion-label>Uso de Recursos (ChartBubble)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Gráfico de Burbujas</h3>
                    <p>Ubicado en la segunda fila de la vista Técnica. Este gráfico visualiza datos de utilización de recursos en múltiples dimensiones.</p>
                    <p>Métricas clave:</p>
                    <ul>
                      <li>Tiempo de respuesta: 234ms (-12.3%)</li>
                      <li>Correlaciones de uso de recursos</li>
                      <li>Tamaño basado en la importancia del recurso</li>
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
                  <ion-label>Estado del Sistema (EChartRadar)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Gráfico de Radar</h3>
                    <p>Ubicado en la segunda fila de la vista Técnica. Esta visualización muestra múltiples métricas de estado del sistema en formato radar.</p>
                    <p>Métricas clave:</p>
                    <ul>
                      <li>Análisis de rendimiento multidimensional</li>
                      <li>Métricas del sistema en múltiples categorías</li>
                      <li>Evaluación comparativa del rendimiento</li>
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
                  <ion-label>Distribución de Recursos (ChartDoughnut)</ion-label>
                </ion-item>
                <div slot="content" class="chart-content">
                  <div class="chart-description">
                    <h3>Gráfico de Donut</h3>
                    <p>Ubicado en la segunda fila de la vista Técnica. Este gráfico muestra la distribución de recursos informáticos.</p>
                    <p>Métricas clave:</p>
                    <ul>
                      <li>Tasa de error: 0.08% (-5.2%)</li>
                      <li>Porcentajes de asignación de recursos</li>
                      <li>Distribución de recursos del sistema entre servicios</li>
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