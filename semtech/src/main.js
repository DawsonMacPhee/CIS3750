import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vueKeycloak } from '@baloise/vue-keycloak'

const app = createApp(App)

app.use(router)
app.use(vueKeycloak, {
    initOptions: {
      flow: 'standard', // default
      checkLoginIframe: false, // default
      onLoad: '', // default
    },
    config: {
      url: 'http://localhost:8090/auth/',
      realm: 'SemTech',
      clientId: 'SemTechCourtData'
    }
})

app.mount('#app')
