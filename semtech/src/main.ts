import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js';
import type {KeycloakInstance} from "keycloak-js";
import type {VueKeycloakInstance} from "@dsb-norge/vue-keycloak-js/dist/types";

createApp(App)
    .use(router)
    .use(VueKeycloakJs, {
        init: {
            onLoad: 'check-sso'
        },
        config: {
            url: 'http://localhost:8090/auth',
            clientId: 'CourtData-Clientside',
            realm: 'SemTech'
        },
        onReady (keycloak: KeycloakInstance) {
            console.log('Keycloak ready', keycloak)
        }
    })
    .mount('#app')

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties  {
    $keycloak: VueKeycloakInstance
  }
}