var express = require('express');
var router = express.Router();
const request = require('request');
const keycloak = require('./keycloak-config.js').getKeycloak();

router.get('/endpoint', keycloak.protect(['user', 'admin']), function(req, res){
    res.send("User Endpoint");
});

//, keycloak.protect(['user', 'admin'])
router.get('/browse', function(req, res){
    let json = {
        "statements": [
            {
                "statement": "MATCH (n) RETURN n"
            }
        ]
    };
    let options = {
        uri: "http://[::1]:7474/db/data/transaction/commit",
        port:443,
        method: 'POST',
        json: json
    };
    request(options, function (error, response, body) {
        if (error) {
            console.error("httpRequests : error " + error);
            res.send(error);
        }
        if (response) {
            console.log(response);
            res.send(response);
        }
    });
});

module.exports = router;