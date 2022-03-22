var express = require('express');
var router = express.Router();
const keycloak = require('./keycloak-config.js').getKeycloak();

router.get('/endpoint', keycloak.protect(['user', 'admin']), function(req, res){
    res.send("User Endpoint");
});

module.exports = router;