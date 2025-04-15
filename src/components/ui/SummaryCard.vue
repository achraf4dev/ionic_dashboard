<template>
  <div class="summary-card" :class="[colorClass, themeClass]">
    <div class="summary-title">{{ title }}</div>
    <div class="summary-value">{{ value }}</div>
    <div class="summary-trend" :class="{ 'positive': isPositive, 'negative': isNegative }">{{ trend }}</div>
  </div>
</template>

<script>
export default {
  name: 'SummaryCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    trend: {
      type: String,
      required: true
    },
    isPositive: {
      type: Boolean,
      default: false
    },
    isNegative: {
      type: Boolean,
      default: false
    },
    colorIndex: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0 && value <= 3
    },
    theme: {
      type: String,
      default: 'technical',
      validator: (value) => ['technical', 'business'].includes(value)
    }
  },
  computed: {
    colorClass() {
      return `color-${this.colorIndex}`;
    },
    themeClass() {
      return `theme-${this.theme}`;
    }
  }
}
</script>

<style scoped>
.summary-card {
  position: relative;
  padding: 16px;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 130px;
  color: white;
}

.summary-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 25px -10px rgba(0, 0, 0, 0.1);
}

.summary-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  border-radius: inherit;
  opacity: 0.95;
}

.summary-card::after {
  content: '';
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  bottom: -40px;
  right: -40px;
}

/* Technical Dashboard Colors */
.theme-technical.color-0 {
  background: linear-gradient(135deg, #9333ea 0%, #6366f1 100%);
}

.theme-technical.color-1 {
  background: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%);
}

.theme-technical.color-2 {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
}

.theme-technical.color-3 {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

/* Business Dashboard Colors */
.theme-business.color-0 {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
}

.theme-business.color-1 {
  background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
}

.theme-business.color-2 {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.theme-business.color-3 {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
}

.summary-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  opacity: 0.9;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.summary-title::before {
  content: '';
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

/* Technical Dashboard Icons */
.theme-technical.color-0 .summary-title::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 10V3L4 14h7v7l9-11h-7z'/%3E%3C/svg%3E");
}

.theme-technical.color-1 .summary-title::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'/%3E%3C/svg%3E");
}

.theme-technical.color-2 .summary-title::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'/%3E%3C/svg%3E");
}

.theme-technical.color-3 .summary-title::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'/%3E%3C/svg%3E");
}

/* Business Dashboard Icons */
.theme-business.color-0 .summary-title::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'/%3E%3C/svg%3E");
}

.theme-business.color-1 .summary-title::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/%3E%3C/svg%3E");
}

.theme-business.color-2 .summary-title::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'/%3E%3C/svg%3E");
}

.theme-business.color-3 .summary-title::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'/%3E%3C/svg%3E");
}

.summary-value {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.summary-trend {
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding: 3px 10px;
  width: fit-content;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
}

.summary-trend.positive::before {
  content: '↑';
  margin-right: 4px;
  font-size: 0.875rem;
}

.summary-trend.negative::before {
  content: '↓';
  margin-right: 4px;
  font-size: 0.875rem;
}
</style> 