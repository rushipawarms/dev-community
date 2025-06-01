const express = require("express");
const app = express();

// Correct route handling
app.get('/', (req, res) => {
  res.send("login page");
});

app.get('/home', (req, res) => {
  res.send("Dashboard page");
});

app.get('/profile', (req, res) => {
  res.send("profile page");
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
