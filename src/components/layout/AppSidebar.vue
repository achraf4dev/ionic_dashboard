<template>
  <div class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <div class="logo-container">
        <img src="../../assets/logo.svg" alt="Logo" class="logo" />
      </div>
      <h1 class="app-name" v-if="!isCollapsed">Montserrat</h1>
    </div>

    <!-- Navigation Menu -->
    <div class="sidebar-menu">
      <div v-for="(item, index) in menuItems" :key="index" 
           class="menu-item" 
           :class="{ 'active': activeItem === item.route }"
           @click="navigate(item.route)">
        <div class="icon-container">
          <i class="fas" :class="item.icon"></i>
        </div>
        <span class="item-text" v-if="!isCollapsed">{{ item.title }}</span>
      </div>
    </div>

    <!-- Sidebar Footer -->
    <div class="sidebar-footer">
      <div class="user-info" @click="toggleUserDropdown">
        <div class="avatar">{{ userInitials }}</div>
        <div class="user-details" v-if="!isCollapsed">
          <span class="user-name">{{ userName }}</span>
          <span class="user-role">Administrador</span>
        </div>
      </div>
      <div class="version" v-if="!isCollapsed">v1.0.0</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    userName: {
      type: String,
      default: 'Achraf Ibrahimi'
    }
  },
  data() {
    return {
      isCollapsed: false,
      activeItem: '/',
      menuItems: [
        { title: 'Panel Principal', icon: 'fa-tachometer-alt', route: '/' },
        { title: 'Panel Técnico', icon: 'fa-code', route: '/technical' },
        { title: 'Panel de Negocio', icon: 'fa-chart-line', route: '/business' }
      ]
    }
  },
  computed: {
    userInitials() {
      return this.userName
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase();
    }
  },
  created() {
    // Check if sidebar state is saved in localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      this.isCollapsed = JSON.parse(savedState);
      // Emit the initial state to the parent
      this.$nextTick(() => {
        this.$emit('toggle-sidebar', this.isCollapsed);
      });
    }
    
    // Set active item based on current route
    this.activeItem = this.$route.path;
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
      localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isCollapsed));
      this.$emit('toggle-sidebar', this.isCollapsed);
    },
    navigate(route) {
      this.activeItem = route;
      this.$router.push(route);
    },
    toggleUserDropdown() {
      // Implement user dropdown logic
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: #1e293b;
  color: #e2e8f0;
  height: 100vh;
  width: var(--sidebar-width);
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #334155;
  height: 64px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
}

.logo {
  width: 32px;
  height: 32px;
}

.app-name {
  margin-left: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
}

.toggle-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3748;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.toggle-btn:hover {
  color: #e2e8f0;
  background-color: #3b82f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-btn i {
  font-size: 14px;
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.25rem;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background-color: #334155;
}

.menu-item.active {
  background-color: #2d3748;
  border-left-color: #3b82f6;
}

.icon-container {
  min-width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-container i {
  font-size: 1.25rem;
  color: #94a3b8;
}

.menu-item.active .icon-container i {
  color: #3b82f6;
}

.item-text {
  margin-left: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #334155;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.user-info:hover {
  background-color: #334155;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  border-radius: 50%;
}

.user-details {
  margin-left: 0.75rem;
  overflow: hidden;
}

.user-name {
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-role {
  display: block;
  font-size: 0.75rem;
  color: #94a3b8;
}

.version {
  text-align: center;
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.75rem;
}

@media (max-width: 767px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.visible {
    transform: translateX(0);
  }
  
  .sidebar.collapsed {
    transform: translateX(-100%);
  }
}
</style> 