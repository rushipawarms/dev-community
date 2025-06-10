const express = require("express");
//Here we are firstly up server and then connect to Db, but it is not rigth way
//require('./config/database')

const connectDb = require('./config/database')

const User = require('./model/user')

const app = express();

app.use(express.json())

app.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(200).send("data saved in Db")
  }
  catch (err) {
    res.status(500).send("data not saved in Db,Something went wrong")
  }
})

connectDb()
  .then(() => {
    console.log("Database Connection establish...")
    app.listen(3000, () => {
      console.log("listening on 3000");
    });
  })
  .catch((err) => {
    console.error(err);
    console.log("Failed to Connect DB...")
  })


