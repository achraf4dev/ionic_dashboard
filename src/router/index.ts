import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import Business from '@/views/Business.vue';
import Technique from '@/views/Technique.vue';
import KPIs from '@/views/KPIs.vue'; 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/business'
  },
  {
    path: '/business',
    name: 'Business',
    component: Business
  },
  {
    path: '/technique',
    name: 'Technique',
    component: Technique
  },
  {
    path: '/kpis',
    name: 'KPIs',
    component: KPIs
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
