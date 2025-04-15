import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/technical',
    name: 'TechnicalDashboard',
    component: () => import('../views/technical/TechnicalDashboardView.vue')
  },
  {
    path: '/business',
    name: 'BusinessDashboard',
    component: () => import('../views/business/BusinessDashboardView.vue')
  }
  // Analytics, Projects, and Settings routes have been removed
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
