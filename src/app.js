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
//get user by email
app.get('/user', async (req, res) => {
  try {
    const email = req.body.email
    const firstName = req.body.firstName
    // const user = await User.find({ email: email })
    //const user = await User.find({firstName})
    //const user = await User.find({})
    const user = await User.findOne({ email: email })
    if (user) {
      // if (user.length > 0) {
      res.send(user)
    }
    else {
      res.send("User not found")
    }
  }
  catch (err) {
    res.send("Somthing went wrong")
  }
})

//delete record by Id
app.delete('/user', async (req, res) => {
  try {
    const userId = req.body.userId
    const user = await User.findByIdAndDelete(userId)
    console.log(user)
    res.send("user deleted")
  }
  catch (err) {
    res.status(500).send("Somthing went wrong")
  }
})

//update record by Id

app.patch('/user', async (req, res) => {
  try {
    const userId = req.body.userId
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const data = {
      firstName, lastName
    }
    const user = await User.findByIdAndUpdate(userId, data, { returnDocument: "after" })
    console.log(user)
    res.send("user updated successfully")
  }
  catch (err) {
    res.status(500).send("Somthing went wrong")
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


