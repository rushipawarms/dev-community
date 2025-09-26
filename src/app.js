const express = require("express");
const connectDb = require("./config/database");

const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());

app.use(cookieParser());

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const sendRequestRouter = require('./routes/request')

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',sendRequestRouter)

connectDb()
  .then(() => {
    console.log("Database Connection establish...");
    app.listen(3000, () => {
      console.log("listening on 3000");
    });
  })
  .catch((err) => {
    console.log("Failed to Connect DB...");
  });
