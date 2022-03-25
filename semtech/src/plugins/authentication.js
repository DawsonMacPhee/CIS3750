import Vue from 'vue'
import Keycloak from 'keycloak-js'

const options = {
  url: 'http://localhost:8090/auth/',
  realm: 'SemTech',
  clientId: 'SemTechCourtData'
}

const _keycloak = Keycloak(options)

const authentication = {
  install(Vue) {
    Vue.$keycloak = _keycloak
  }
}

authentication.install = Vue => {
  Vue.$keycloak = _keycloak
  Object.defineProperties(Vue.prototype, {
    $keycloak: {
      get() {
        return _keycloak
      }
    }
  })
}

Vue.use(authentication)

export default authentication