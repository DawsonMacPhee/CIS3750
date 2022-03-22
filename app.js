const express = require('express');
const app = express();
const port = 8080;

/*const keycloak = require('./keycloak-config.js').initKeycloak();
app.use(keycloak.middleware());

const userAPIController = require('./user-services.js');
app.use('/api/user', userAPIController);

const adminAPIController = require('./admin-services.js');
app.use('/api/admin', adminAPIController);*/

app.get('/', (req, res) => {
  res.send("Home Page");
});

/*app.get('/dashboard', keycloak.protect(['user','admin']), (req, res) => {
  res.send("Authenticated Page");
});*/

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});

