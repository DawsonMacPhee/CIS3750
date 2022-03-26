import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { app } from '../main';

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
        const keycloak = app.config.globalProperties.$keycloak;
        const basePath = window.location.toString()
        if (!keycloak.authenticated) {
            console.log("Logging In");
            keycloak.login({ redirectUri: basePath.slice(0, -1) + to.path })
        } else if (keycloak.hasRealmRole('user')) {
            console.log("Authenticated");
            keycloak.updateToken(70)
            .then(() => {
                next()
            })
            .catch(err => {
                console.error(err)
            })
        } else {
            console.log("Wrong Permissions");
            next({ name: 'Unauthorized' })
        }
    } else {
        console.log("No Auth");
        next()
    }
})

export default router
