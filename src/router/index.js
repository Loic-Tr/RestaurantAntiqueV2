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
    {
      path: '/inscription',
      name: 'Inscription',
      component: () => import('../views/InscriptionView.vue'),
    },
    {
      path: '/reservation',
      name: 'Reservation',
      component: () => import('../views/ReservationView.vue'),
    },
    {
      path: '/reserver',
      name: 'Reserver',
      component: () => import('../views/ReserverView.vue'),
    },
    {
      path: '/carte',
      name: 'Carte',
      component: () => import('../views/CarteView.vue'),
    }
  ],
})

export default router
