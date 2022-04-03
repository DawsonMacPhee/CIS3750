import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js';
import type { VueKeycloakInstance } from "@dsb-norge/vue-keycloak-js/dist/types";

const app = createApp(App);
app.use(router);
app.use(VueKeycloakJs, {
    init: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html"
    },
    config: {
        url: 'http://localhost:8090/auth',
        clientId: 'CourtData-Clientside',
        realm: 'SemTech'
    },
    onReady (keycloak: VueKeycloakInstance) {
        app.config.globalProperties.$keycloak = keycloak;
    }
});
app.mount('#app');

export { app };