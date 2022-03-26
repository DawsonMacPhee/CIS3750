import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useKeycloak } from '@baloise/vue-keycloak'

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
    console.log("Filter");
    var keycloak = useKeycloak().keycloak;
    if (to.meta.isAuthenticated) {
      console.log("Auth Needed");
      // Get the actual url of the app, it's needed for Keycloak
      const basePath = window.location.toString()
      if (!keycloak.authenticated) {
        console.log("Not Authenticated");
        // The page is protected and the user is not authenticated. Force a login.
        keycloak.login({ redirectUri: basePath.slice(0, -1) + to.path })
      } else if (keycloak.hasResourceRole('user')) {
        console.log("Authenticated");
        // The user was authenticated, and has the app role
        keycloak.updateToken(70)
          .then(() => {
            next()
          })
          .catch(err => {
            console.error(err)
          })
      } else {
        console.log("Incorrect User");
        // The user was authenticated, but did not have the correct role
        // Redirect to an error page
        next({ name: 'Unauthorized' })
      }
    } else {
        console.log("No Auth Needed");
      // This page did not require authentication
      next()
    }
})

export default router
