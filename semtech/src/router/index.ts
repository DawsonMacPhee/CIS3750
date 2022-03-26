import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        isAuthenticated: false
      }
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        isAuthenticated: true
      },
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.isAuthenticated) {
      // Get the actual url of the app, it's needed for Keycloak
      const basePath = window.location.toString()
      if (!this.$keycloak.authenticated) {
        // The page is protected and the user is not authenticated. Force a login.
        this.$keycloak.login({ redirectUri: basePath.slice(0, -1) + to.path })
      } else if (this.$keycloak.hasResourceRole('user')) {
        // The user was authenticated, and has the app role
        this.$keycloak.updateToken(70)
          .then(() => {
            next()
          })
          .catch(err => {
            console.error(err)
          })
      } else {
        // The user was authenticated, but did not have the correct role
        // Redirect to an error page
        next({ name: 'Unauthorized' })
      }
    } else {
      // This page did not require authentication
      next()
    }
})

export default router
