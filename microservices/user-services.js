var express = require('express');
var router = express.Router();
const axios = require('axios');
const keycloak = require('./keycloak-config.js').getKeycloak();

router.get('/endpoint', keycloak.protect(['user', 'admin']), function(req, res){
    res.send("User Endpoint");
});

//, keycloak.protect(['user', 'admin'])
router.get('/browse', function(req, res){
    axios.post('http://localhost:7474/db/data/transaction/commit', {
        "statements": [
            {
                "statement": "MATCH (n) RETURN n"
            }
        ]
    }).then(function (response) {
        console.log(response);
        res.send(response);
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
});

module.exports = router;