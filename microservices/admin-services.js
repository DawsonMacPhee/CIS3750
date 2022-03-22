var express = require('express');
var router = express.Router();
const keycloak = require('./keycloak-config.js').getKeycloak();

router.get('/endpoint', keycloak.protect('admin'), function(req, res){
    res.send("Admin Endpoint");
});

module.exports = router;