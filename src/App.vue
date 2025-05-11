<template>
  <ion-app>
    <Sidebar :collapsed="sidebarCollapsed" />
    <div id="main-content" class="main-container" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <Navbar />
      <ion-content class="main-content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </ion-content>
    </div>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonContent } from '@ionic/vue';
import { useIonRouter } from '@ionic/vue';
import { onMounted, ref, provide, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

const ionRouter = useIonRouter();
const route = useRoute();
const sidebarCollapsed = ref(false);

// Toggle sidebar function
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

// Check window width and set sidebar state
const checkWindowSize = () => {
  if (window.innerWidth <= 576) {
    sidebarCollapsed.value = true;
  }
};

// Add resize listener
const handleResize = () => {
  checkWindowSize();
};

// Provide the toggle function to be used by Navbar
provide('toggleSidebar', toggleSidebar);

onMounted(() => {
  // Set initial sidebar state based on screen size
  checkWindowSize();
  
  // Add resize event listener
  window.addEventListener('resize', handleResize);
  
  // Force the router to navigate to the current route
  // This ensures the view is properly rendered on initial load
  const currentPath = route.path;
  if (currentPath === '/') {
    ionRouter.push('/business');
  } else {
    // Force a re-render by navigating to the same route
    ionRouter.push(currentPath);
  }
});

onBeforeUnmount(() => {
  // Clean up resize event listener
  window.removeEventListener('resize', handleResize);
});
</script>

<style>
:root {
  --sidebar-width: 250px;
  --sidebar-width-collapsed: 70px;
  --sidebar-width-mobile: 200px;
  --navbar-height: 56px;
}

/* Remove any default margins and paddings */
body {
  margin: 0;
  padding: 0;
}

ion-app {
  --ion-safe-area-left: 0;
  --ion-safe-area-right: 0;
}

/* Main container */
.main-container {
  position: relative;
  margin-left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease, width 0.3s ease;
}

/* Main container when sidebar is collapsed */
.main-container.sidebar-collapsed {
  margin-left: var(--sidebar-width-collapsed);
  width: calc(100% - var(--sidebar-width-collapsed));
}

/* Main content */
.main-content {
  padding-top: calc(var(--navbar-height) + 16px);
  padding-right: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  flex: 1;
}

@media (max-width: 768px) {
  .main-container {
    margin-left: var(--sidebar-width-mobile);
    width: calc(100% - var(--sidebar-width-mobile));
  }
  
  .main-container.sidebar-collapsed {
    margin-left: var(--sidebar-width-collapsed);
    width: calc(100% - var(--sidebar-width-collapsed));
  }
}

/* For mobile responsive design - keep sidebar visible */
@media (max-width: 576px) {
  ion-menu {
    --width: var(--sidebar-width-mobile);
    --min-width: var(--sidebar-width-mobile);
  }
  
  .main-container {
    margin-left: var(--sidebar-width-mobile);
    width: calc(100% - var(--sidebar-width-mobile));
  }
  
  .main-container.sidebar-collapsed {
    margin-left: var(--sidebar-width-collapsed);
    width: calc(100% - var(--sidebar-width-collapsed));
  }
}
</style>
