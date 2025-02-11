import { createRouter, createWebHistory } from 'vue-router'
import { connection } from '@/services/ApiConnection'
import { setActivePinia, createPinia } from 'pinia'
import { useLoadingStore } from '../stores/LoadingStore'
import { useAuthStore } from '../stores/UserStore'
import AuthPage from "../views/AuthPage.vue"
import axios from 'axios'
import multiguard from 'vue-router-multiguard';

const types = async function getTypes(to, from, next) {
  axios.get(connection + "types")
  .then(response => {
    to.params.types = response.data;
    next()
  })
}

const models = async function getModels(to, from, next) {
  axios.get(connection + "models")
  .then(response => {
    to.params.models = response.data;
    next()
  })
}

const weapons = async function getWeapons(to, from, next) {
  axios.get(connection + "armory")
  .then(response => {
    to.params.weapons = response.data;
    next()
  })
}

const androids = async function getAndroids(to, from, next) {
  axios.get(connection + "androids")
  .then(response => {
    to.params.androids = response.data;
    next()
  })
}

const operators = async function getOperators(to, from, next) {
  axios.get(connection + "operators")
  .then(response => {
    to.params.operators = response.data;
    next()
  })
}

const reports = async function getReports(to, from, next) {
  axios.get(connection + "reports")
  .then(response => {
    to.params.reports = response.data;
    next()
  })
}

const appe = async function getAppearances(to, from, next) {
  axios.get(connection + "appearances")
  .then(response => {
    to.params.appe = response.data;
    next()
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AuthPage,
    },
    {
      path: '/startmenu',
      name: 'startmenu',
      component: () => import('../views/StartMenu.vue'),
      props: true,
      beforeEnter: multiguard([androids, operators]),
      meta: { requiresRole: true }
    },
    {
      path: '/startmenu/fabrication',
      name: 'fabrication',
      component: () => import('../views/FabricationPage.vue'),
      props: true,
      beforeEnter: multiguard([types, models, appe, androids]),
      meta: { requiresRole: ['admin'] }
    },
    {
      path: '/database',
      name: 'database',
      component: () => import('../views/DataBase.vue'),
      props: true,
      beforeEnter: multiguard([androids, reports, weapons]),
      meta: { requiresRole: true }
    },
    {
      path: '/database/create-report',
      name: 'create-report',
      component: () => import('../views/CreateReport.vue'),
      props: true,
      meta: { requiresRole: true }
    },
    {
      path: '/system',
      name: 'system',
      component: () => import('../views/SystemPage.vue'),
      props: true,
      beforeEnter: multiguard([operators, types]),
      meta: { requiresRole: ['admin'] }
    },
    {
      path: '/system/assing-android',
      name: 'assing-android',
      component: () => import('../views/OperatorsAssignmentsPage.vue'),
      props: true,
      beforeEnter:  multiguard([androids]),
      meta: { requiresRole: ['admin'] }
    },
    {
      path: '/not-authorized',
      component: () => import('../views/NotAuthorized.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const pinia = createPinia();
  setActivePinia(pinia); 

  const loadingStore = useLoadingStore();
  loadingStore.showLoader();

  const authStore = useAuthStore();
  const userRole = authStore.user.role;

  if (to.path === '/not-authorized') {
    return next();
  }

  const requiredRoles = Array.isArray(to.meta.requiresRole) 
    ? to.meta.requiresRole 
    : to.meta.requiresRole === true 
      ? []  
      : null; 

  if (requiredRoles !== null) {
    // Si el array de roles está vacío ([]) -> Se permite acceso a cualquier rol
    if (requiredRoles.length === 0) {
      // Si no hay rol asignado, dejamos pasar
      if (!authStore.hasRole) {
        return next('/not-authorized');
      }
    } else {
      // Si hay roles requeridos, comprobar que el rol del usuario esté dentro de la lista
      if (!authStore.hasRole || !requiredRoles.includes(userRole)) {
        return next('/not-authorized');
      }
    }
  }


  // if(requiredRoles !== null && (!authStore.hasRole || !requiredRoles.includes(userRole))){
  //   return next('/not-authorized');
  // }

  next();
});

router.afterEach(() => {
  const loadingStore = useLoadingStore();
  loadingStore.hideLoader(); 
});

export default router
