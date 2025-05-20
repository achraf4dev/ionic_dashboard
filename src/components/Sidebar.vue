<template>
  <div class="persistent-sidebar" :class="{ 'collapsed': collapsed }">
    <div class="logo-container">
      <h2 v-if="!collapsed">Panel de Control</h2>
      <div v-else class="logo-icon">P</div>
    </div>
    
    <div class="sidebar-content">
      <div class="nav-section">
        <div class="section-title" v-if="!collapsed">Navegación</div>
        
        <router-link 
          v-for="(item, index) in appPages" 
          :key="index"
          :to="item.url"
          custom
          v-slot="{ navigate, isActive }"
        >
          <div 
            @click="navigate" 
            class="nav-item"
            :class="{ 'active': isActive }"
            :title="collapsed ? item.title : ''"
          >
            <ion-icon :icon="item.icon"></ion-icon>
            <span v-if="!collapsed">{{ item.title }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { IonIcon } from '@ionic/vue';
import { analyticsOutline, desktopOutline, statsChartOutline } from 'ionicons/icons';

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

const route = useRoute();
const selectedPath = computed(() => route.path);
const none = "none";

const appPages = ref([
  {
    title: 'Negocio',
    url: '/business',
    icon: analyticsOutline
  },
  {
    title: 'Técnica',
    url: '/technique',
    icon: desktopOutline
  },
  {
    title: 'KPIs',
    url: '/kpis',
    icon: statsChartOutline
  }
]);
</script>

<style scoped>
.persistent-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width, 260px);
  height: 100vh;
  background: #1a1f2b;
  border-right: 1px solid #272e3e;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transition: all 0.3s ease;
}

/* Collapsed sidebar styles */
.persistent-sidebar.collapsed {
  width: var(--sidebar-width-collapsed, 70px);
  overflow: visible;
}

.logo-container {
  padding: 24px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #272e3e;
  transition: padding 0.3s ease;
}

.persistent-sidebar.collapsed .logo-container {
  padding: 24px 0;
  justify-content: center;
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(to right, #6ac6ff, #8e74ff);
  color: white;
}

.logo-container h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(to right, #6ac6ff, #8e74ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
}

.nav-section {
  padding: 0 12px;
}

.persistent-sidebar.collapsed .nav-section {
  padding: 0 10px;
}

.section-title {
  font-size: 11px;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.8px;
  font-weight: 600;
  padding: 0 8px;
  margin-bottom: 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 4px;
  color: #a3a8b8;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.persistent-sidebar.collapsed .nav-item {
  padding: 10px;
  justify-content: center;
}

.nav-item:hover {
  background-color: #252a37;
  color: #ffffff;
}

.nav-item.active {
  background-color: #252a37;
  color: #ffffff;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  height: 60%;
  width: 3px;
  background-color: #8e74ff;
  border-radius: 0 4px 4px 0;
}

.persistent-sidebar.collapsed .nav-item.active::before {
  left: 0;
  height: 30px;
}

.nav-item ion-icon {
  font-size: 18px;
  margin-right: 10px;
  flex-shrink: 0;
}

.persistent-sidebar.collapsed .nav-item ion-icon {
  margin-right: 0;
  font-size: 20px;
}

.nav-item span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .persistent-sidebar {
    width: var(--sidebar-width-mobile, 220px);
  }
  
  .persistent-sidebar.collapsed {
    width: var(--sidebar-width-collapsed, 70px);
  }
  
  .logo-container {
    padding: 20px 16px;
  }
  
  .nav-item {
    padding: 8px 10px;
  }
}
</style> 