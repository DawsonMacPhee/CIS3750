var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: 'CourtData-Serverside',
    bearerOnly: true,
    serverUrl: 'http://localhost:8090/auth',
    realm: 'SemTech',
    credentials: {
        secret: 'xmxXBNDTZ9WsVpFUlkhQHU5G3UeYvoiT'
    }
};

function initKeycloak(memoryStore) {
    if (_keycloak) {
      console.warn("Trying to init Keycloak again!");
      return _keycloak;
    } else {
      console.log("Initializing Keycloak...");
      _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
      return _keycloak;
    }
  }

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};