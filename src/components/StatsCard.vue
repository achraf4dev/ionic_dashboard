<template>
  <ion-card class="stats-card" :class="cardBackgroundClass">
    <ion-card-header>
      <ion-card-subtitle v-if="subtitle">{{ subtitle }}</ion-card-subtitle>
      <ion-card-title>{{ title }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div class="stats-value-container">
        <div class="stats-value">{{ value }}</div>
        <div class="stats-trend" :class="trendClass">
          <ion-icon :icon="trendIcon"></ion-icon>
          <span>{{ trend }}%</span>
        </div>
      </div>
    </ion-card-content>
    <div class="icon-container" :style="{ backgroundColor: iconBgColor }">
      <ion-icon :icon="icon" :style="{ color: iconColor }"></ion-icon>
    </div>
  </ion-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon } from '@ionic/vue';
import { arrowUpOutline, arrowDownOutline } from 'ionicons/icons';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: false,
    default: ''
  },
  value: {
    type: [String, Number],
    required: true
  },
  trend: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    required: true
  },
  iconColor: {
    type: String,
    default: '#ffffff'
  },
  iconBgColor: {
    type: String,
    default: 'var(--ion-color-primary)'
  }
});

const trendClass = computed(() => {
  return props.trend >= 0 ? 'positive' : 'negative';
});

const trendIcon = computed(() => {
  return props.trend >= 0 ? arrowUpOutline : arrowDownOutline;
});

const cardBackgroundClass = computed(() => {
  return props.trend >= 0 ? 'positive-card-bg' : 'negative-card-bg';
});
</script>

<style scoped>
.stats-card {
  position: relative;
  overflow: visible;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  margin: 10px;
  background: var(--ion-card-background, #fff);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stats-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.icon-container {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.5);
  z-index: 10;
}

.icon-container ion-icon {
  font-size: 24px;
}

ion-card-header {
  padding: 20px 20px 4px 20px;
  position: relative;
}

.title-trend-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
}

ion-card-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ion-text-color, #333);
}

ion-card-subtitle {
  font-size: 0.8rem;
  color: var(--ion-color-medium-shade, var(--ion-color-medium));
  margin-bottom: 10px;
}

.stats-value-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-bottom: 0;
}

.stats-value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--ion-text-color-strong, #000);
}

.stats-trend {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 500;
  gap: 2px;
  padding: 2px 6px;
  border-radius: 16px;
  margin-top: 4px;
}

.stats-trend ion-icon {
  font-size: 0.9em;
  margin-right: 1px;
}

.positive {
  color: var(--ion-color-success);
}

.negative {
  color: var(--ion-color-danger);
}

.positive-card-bg {
  background-color: rgba(var(--ion-color-success-rgb, 45, 211, 111), 0.08);
}

.negative-card-bg {
  background-color: rgba(var(--ion-color-danger-rgb, 235, 68, 90), 0.08);
}
</style> 