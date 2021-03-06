var express = require('express');
var router = express.Router();
const axios = require('axios');
const keycloak = require('./keycloak-config.js').getKeycloak();

router.get('/endpoint', keycloak.protect(['user', 'admin']), function(req, res){
    res.send("User Endpoint");
});

//, keycloak.protect(['user', 'admin'])
router.get('/browse', function(req, res){
    axios.post('http://neo4j:7474/db/data/transaction/commit', {
        "statements": [
            {
                "statement": "Match (n)-[r]->(m) Return ID(n), n.name, labels(n), ID(m), m.name, labels(m), type(r)"
            }
        ]
    }).then(function (response) {
        var cytoList = [];
        var cytoIds = [];
        
        var i = 0;
        for (const row of response.data.results[0].data) {
            if (!cytoIds.includes(row.row[0])) {
                cytoList.push({data: {id: row.row[0], label: row.row[1], type: row.row[2][0]}});
                cytoIds.push(row.row[0]);
            }
            if (!cytoIds.includes(row.row[3])) {
                cytoList.push({data: {id: row.row[3], label: row.row[4], type: row.row[5][0]}});
                cytoIds.push(row.row[3]);
            }
            cytoList.push({data: {id: i + "r", label: row.row[6], source: row.row[0], target: row.row[3]}});
            i++;
        }

        res.send(cytoList);
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
});

module.exports = router;