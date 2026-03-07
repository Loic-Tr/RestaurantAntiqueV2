import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/galerie',
      name: 'Galerie',
      component: () => import('../views/GalerieView.vue'),
    },
    {
      path: '/connexion',
      name: 'Connexion',
      component: () => import('../views/ConnexionView.vue'),
    },
  ],
})

export default router
