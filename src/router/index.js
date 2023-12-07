import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from "../views/AuthPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AuthPage
    },
    {
      path: '/startmenu',
      name: 'startmenu',
      component: () => import('../views/StartMenu.vue')
    },
    {
      path: '/startmenu/fabrication',
      name: 'fabrication',
      component: () => import('../views/FabricationPage.vue')
    },
    {
      path: '/database',
      name: 'database',
      component: () => import('../views/DataBase.vue')
    },
    {
      path: '/system',
      name: 'system',
      component: () => import('../views/SystemPage.vue')
    }
  ]
})

export default router
