<template>
  <div class="dashboard-container">
    <TechnicalDashboard />
  </div>
</template>

<script setup>
import TechnicalDashboard from '@/components/dashboard/TechnicalDashboard.vue';

// Method to toggle fullscreen mode
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  padding: 1.5rem;
  /* max-width: 1200px; */
  margin: 0 auto;
}

/* Modern Header Styling */
.modern-header {
  --background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.modern-header ion-toolbar {
  --background: #ffffff;
  --color: #1e293b;
  --border-color: transparent;
  --padding-top: 5px;
  --padding-bottom: 5px;
  --min-height: 60px;
}

.menu-button {
  --color: #64748b;
  --padding-start: 4px;
}

.header-content {
  display: flex;
  align-items: center;
}

ion-title span {
  font-weight: 600;
  font-size: 16px;
  color: #334155;
}

.action-buttons {
  display: flex;
  align-items: center;
}

.action-btn {
  --background: transparent;
  --background-hover: #f8fafc;
  --background-focused: #f1f5f9;
  --background-activated: #f1f5f9;
  --color: #64748b;
  --border-radius: 8px;
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  margin: 0 4px;
  height: 36px;
  font-size: 18px;
  position: relative;
}

.indicator-dot {
  position: absolute;
  top: 9px;
  right: 9px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #4f46e5;
}
</style> 