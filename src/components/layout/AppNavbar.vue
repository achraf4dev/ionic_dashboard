<template>
  <header class="navbar">
    <div class="navbar-left">
      <button class="menu-toggle" @click="toggleSidebar">
        <i class="fas fa-bars"></i>
      </button>
      <h2 class="page-title">{{ pageTitle }}</h2>
    </div>
    
    <div class="navbar-search">
      <div class="search-box">
        <i class="fas fa-search search-icon"></i>
        <input type="text" placeholder="Buscar..." class="search-input" />
      </div>
    </div>
    
    <div class="navbar-right">
      <div class="navbar-actions">
        <button class="action-button">
          <i class="fas fa-bell"></i>
          <span class="notification-badge">3</span>
        </button>
        
        <div class="user-dropdown" @click="toggleUserDropdown" ref="userDropdown">
          <div class="avatar">{{ userInitials }}</div>
          <div class="user-info">
            <span class="user-name">{{ userName }}</span>
            <i class="fas fa-chevron-down dropdown-icon"></i>
          </div>
          
          <div class="dropdown-menu" v-if="isUserDropdownOpen">
            <div class="dropdown-item">
              <i class="fas fa-user"></i>
              <span>Perfil</span>
            </div>
            <div class="dropdown-item">
              <i class="fas fa-cog"></i>
              <span>Configuración</span>
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item">
              <i class="fas fa-sign-out-alt"></i>
              <span>Cerrar Sesión</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppNavbar',
  props: {
    userName: {
      type: String,
      default: 'Achraf Ibrahimi'
    },
    isSidebarCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isUserDropdownOpen: false
    };
  },
  computed: {
    userInitials() {
      return this.userName
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase();
    },
    pageTitle() {
      // Get the current route and return an appropriate title
      const route = this.$route.path;
      const titles = {
        '/': 'Panel Principal',
        '/technical': 'Panel Técnico',
        '/business': 'Panel de Negocio',
        '/analytics': 'Análisis',
        '/projects': 'Proyectos',
        '/settings': 'Configuración'
      };
      
      return titles[route] || 'Panel Principal';
    }
  },
  methods: {
    toggleUserDropdown() {
      this.isUserDropdownOpen = !this.isUserDropdownOpen;
    },
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (this.$refs.userDropdown && !this.$refs.userDropdown.contains(event.target)) {
        this.isUserDropdownOpen = false;
      }
    });
  },
  beforeUnmount() {
    // Remove event listener
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 1.5rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.navbar-left {
  display: flex;
  align-items: center;
}

.menu-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f5f9;
  border: none;
  color: #1e293b;
  width: 36px;
  height: 36px;
  font-size: 1.125rem;
  cursor: pointer;
  border-radius: 0.375rem;
  margin-right: 1rem;
  transition: all 0.2s ease;
}

.menu-toggle:hover {
  background-color: #e2e8f0;
  color: #1e293b;
}

.page-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
}

.navbar-search {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 500px;
  margin: 0 1rem;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 0.875rem;
}

.search-input {
  width: 100%;
  height: 40px;
  padding: 0 1rem 0 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: #f8fafc;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-actions {
  display: flex;
  align-items: center;
}

.action-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 1.125rem;
  margin-right: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button:hover {
  background-color: #f1f5f9;
  color: #1e293b;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #ef4444;
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
}

.user-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.user-dropdown:hover {
  background-color: #f1f5f9;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
}

.user-info {
  margin-left: 0.75rem;
  display: flex;
  align-items: center;
}

.user-name {
  font-weight: 500;
  font-size: 0.875rem;
  margin-right: 0.5rem;
}

.dropdown-icon {
  font-size: 0.75rem;
  color: #94a3b8;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 220px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 10;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #1e293b;
  transition: all 0.2s;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f8fafc;
}

.dropdown-item i {
  width: 1.25rem;
  font-size: 1rem;
  color: #64748b;
  margin-right: 0.75rem;
}

.dropdown-divider {
  height: 1px;
  background-color: #e2e8f0;
  margin: 0.25rem 0;
}

@media (max-width: 767px) {
  .menu-toggle {
    display: block;
  }
  
  .navbar-search {
    display: none;
  }
  
  .user-info {
    display: none;
  }
}
</style> 