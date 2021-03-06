const express = require('express');
const session = require('express-session');
var cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

var memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'xmxXBNDTZ9WsVpFUlkhQHU5G3UeYvoiT',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

const keycloak = require('./keycloak-config.js').initKeycloak(memoryStore);
app.use(keycloak.middleware());

const userAPIController = require('./user-services.js');
app.use('/api/user', userAPIController);

const adminAPIController = require('./admin-services.js');
app.use('/api/admin', adminAPIController);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});

