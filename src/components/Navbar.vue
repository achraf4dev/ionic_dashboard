<template>
  <div class="main-header">
    <div class="navbar-container">
      <div class="navbar-left">
        <ion-icon :icon="menuOutline" class="menu-toggle" @click="toggleSidebar"></ion-icon>
        <ion-icon :icon="homeOutline" class="title-icon"></ion-icon>
        <h2 class="page-title">Dashboard</h2>
      </div>
      
      <div class="navbar-right">
        <div class="nav-action-item">
          <ion-icon :icon="searchOutline"></ion-icon>
        </div>
        <div class="nav-action-item notification">
          <ion-icon :icon="notificationsOutline"></ion-icon>
          <span class="notification-badge"></span>
        </div>
        <div class="divider"></div>
        <div class="nav-action-item user-profile">
          <div class="avatar">A</div>
          <span>Admin</span>
          <ion-icon :icon="chevronDownOutline" class="dropdown-icon"></ion-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { notificationsOutline, personCircleOutline, searchOutline, chevronDownOutline, homeOutline, menuOutline } from 'ionicons/icons';
import { ref, inject, onMounted } from 'vue';

// Use provide/inject pattern for sidebar toggle state
const toggleSidebar = inject('toggleSidebar', () => {});
</script>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: var(--sidebar-width, 260px);
  width: calc(100% - var(--sidebar-width, 260px));
  height: var(--navbar-height, 60px);
  background: #f0f2f5;
  z-index: 999;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

/* Add styles for when sidebar is collapsed */
.sidebar-collapsed .main-header {
  left: var(--sidebar-width-collapsed, 70px);
  width: calc(100% - var(--sidebar-width-collapsed, 70px));
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.menu-toggle {
  font-size: 22px;
  color: #4b5563;
  margin-right: 14px;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.menu-toggle:hover {
  background-color: #e4e7ed;
}

.title-icon {
  font-size: 20px;
  color: #1a1f2b;
  margin-right: 8px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1f2b;
  margin: 0;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-action-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.nav-action-item:hover {
  background-color: #e4e7ed;
}

.nav-action-item ion-icon {
  font-size: 20px;
  color: #4b5563;
}

.notification-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: #ef4444;
  border: 2px solid #f0f2f5;
}

.divider {
  width: 1px;
  height: 24px;
  background-color: #d4d8df;
  margin: 0 8px;
}

.user-profile {
  display: flex;
  align-items: center;
  width: auto;
  padding: 0 8px;
  gap: 8px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: linear-gradient(to right, #6ac6ff, #8e74ff);
  color: white;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
}

.user-profile span {
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
}

.dropdown-icon {
  font-size: 14px;
  color: #9ca3af;
}

@media (max-width: 768px) {
  .main-header {
    left: var(--sidebar-width-mobile, 220px);
    width: calc(100% - var(--sidebar-width-mobile, 220px));
  }
  
  .navbar-container {
    padding: 0 16px;
  }
  
  .user-profile span {
    display: none;
  }
}
</style> 