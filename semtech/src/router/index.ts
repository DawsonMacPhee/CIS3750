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
        authentication: 'none'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        authentication: 'user'
      },
      component: () => import('../views/DashboardView.vue')
    }
  ]
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

router.beforeEach(async (to, from) => {
    if (to.meta.authentication != 'none') {
        var keycloak = app.config.globalProperties.$keycloak;
        const basePath = new URL(window.location.toString());

        while (keycloak.createLoginUrl === null) {
            await sleep(100)
        }

        if (keycloak.keycloak != null) {
            keycloak = keycloak.keycloak;
        }

        if (!keycloak.authenticated) {
            keycloak.login({ redirectUri: basePath.protocol + '//' + basePath.host + to.path });
        } else if (keycloak.hasRealmRole(to.meta.authentication)) {
            keycloak.updateToken(70)
            .then(() => {
                return true;
            })
            .catch(err => {
                console.error(err);
                return {name: "home"};
            });
        } else {
            return {name: "home"};
        }

    } else {
        return true;
    }
});

export default router
