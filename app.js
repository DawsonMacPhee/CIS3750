const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send("Login Page");
});

app.get('/dashboard', (req, res) => {
  res.send("Authenticated Page");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

