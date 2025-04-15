<template>
  <div class="app-container">
    <AppSidebar :userName="userName" @toggle-sidebar="handleSidebarToggle" ref="sidebar" />
    <div class="sidebar-overlay" v-show="sidebarMobileVisible" @click="closeMobileSidebar"></div>
    <div class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <AppNavbar 
        :userName="userName" 
        :isSidebarCollapsed="sidebarCollapsed"
        @toggle-sidebar="toggleSidebarFromNavbar" />
      <main class="content-area">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppNavbar from '@/components/layout/AppNavbar.vue';

export default {
  name: 'App',
  components: {
    AppSidebar,
    AppNavbar
  },
  data() {
    return {
      userName: 'Achraf Ibrahimi',
      sidebarCollapsed: false,
      sidebarMobileVisible: false
    };
  },
  created() {
    // Initialize sidebar collapsed state from localStorage on app load
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      this.sidebarCollapsed = JSON.parse(savedState);
    }
    
    // Add resize event listener to handle responsive behavior
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    // Remove resize event listener
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleSidebarToggle(collapsed) {
      this.sidebarCollapsed = collapsed;
      
      // On mobile, also update the mobile visibility state
      if (window.innerWidth <= 767) {
        this.sidebarMobileVisible = false;
      }
      
      // Save to localStorage
      localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
    },
    toggleMobileMenu() {
      // Toggle mobile menu visibility
      this.sidebarMobileVisible = !this.sidebarMobileVisible;
      const sidebarEl = document.querySelector('.sidebar');
      if (sidebarEl) {
        sidebarEl.classList.toggle('visible');
      }
    },
    closeMobileSidebar() {
      this.sidebarMobileVisible = false;
      const sidebarEl = document.querySelector('.sidebar');
      if (sidebarEl) {
        sidebarEl.classList.remove('visible');
      }
    },
    toggleSidebarFromNavbar() {
      // Check if we're on mobile
      if (window.innerWidth <= 767) {
        // Use mobile menu toggle for mobile devices
        this.toggleMobileMenu();
      } else {
        // Use sidebar toggle for desktop
        if (this.$refs.sidebar) {
          this.$refs.sidebar.toggleSidebar();
        }
      }
    },
    handleResize() {
      // Hide mobile sidebar when resizing to desktop
      if (window.innerWidth > 767 && this.sidebarMobileVisible) {
        this.sidebarMobileVisible = false;
        const sidebarEl = document.querySelector('.sidebar');
        if (sidebarEl) {
          sidebarEl.classList.remove('visible');
        }
      }
    }
  }
}
</script>

<style>
/* Import Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* CSS Variables */
:root {
  --primary-color: #3b82f6;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --bg-light: #f8fafc;
  --bg-white: #ffffff;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --header-height: 64px;
  --sidebar-width: 250px;
  --sidebar-collapsed-width: 70px;
}

/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--text-primary);
  background-color: var(--bg-light);
  line-height: 1.5;
}

.app-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: var(--sidebar-width);
  transition: margin-left 0.3s ease;
  width: calc(100% - var(--sidebar-width));
}

.main-content.sidebar-collapsed {
  margin-left: var(--sidebar-collapsed-width);
  width: calc(100% - var(--sidebar-collapsed-width));
}

.content-area {
  flex: 1;
  overflow-y: auto;
  background-color: var(--bg-light);
}

/* Responsive styles */
@media (max-width: 767px) {
  .main-content {
    margin-left: 0;
    width: 100%;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 0;
    width: 100%;
  }
  
  .sidebar-overlay {
    display: block;
  }
}

/* Override Ionic default styles */
ion-content {
  --background: var(--bg-light);
}

/* Override default button styles */
button {
  cursor: pointer;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 95;
  display: none;
}
</style>
