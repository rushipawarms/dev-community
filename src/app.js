const express = require("express");
//Here we are firstly up server and then connect to Db, but it is not rigth way
//require('./config/database')

const connectDb = require('./config/database')

const User = require('./model/user')

const { validateSignUpData, isUpdate } = require('./utils/validation')

const bcrypt = require('bcrypt')

const app = express();

app.use(express.json())

app.post('/signup', async (req, res) => {
  try {
    validateSignUpData(req)
    const { firstName, lastName, email, password, age, gender, skills } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User(
      {
        firstName,
        lastName,
        email,
        password: passwordHash,
        age,
        gender,
        skills
      }
    )
    await user.save({
      runValidators: true
    })
    res.status(200).send("data saved in Db")
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

//login API
app.post('/login', async (req, res) => {
  try {
    const data = req.body
    if (!isUpdate(data)) {
      throw new Error("Not a valid fields")
    }
    const user = await User.findOne({ email: data.email })
    if (!user) {
      throw new Error("Invalid Credentials")
    }
    const isPasswordValid = await bcrypt.compare(data?.password, user?.password)
    if (isPasswordValid) {
      res.send("Login Succesfully")
    } else {
      throw new Error("Invalid Credentials")
    }
  }
  catch (err) {
    res.status(500).send(err.message)
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

app.patch('/user/:userId', async (req, res) => {
  try {
    //const userId = req.body.userId
    const userId = req.params?.userId
    const data = req.body
    const ALLOWED_UPDATE = ['firstName', 'lastName', 'password', 'age', 'gender', 'skills']
    const isUpdate = Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k))
    if (!isUpdate) {
      throw new Error("Update not allowed")
    }
    if (data?.skills.length > 0) {
      throw new Error("Skills should not be greater than 10")
    }
    // const firstName = req.body.firstName
    // const lastName = req.body.lastName
    // const data = {
    //   firstName, lastName
    // }
    const user = await User.findByIdAndUpdate(userId, data,
      {
        returnDocument: "after",
        runValidators: true
      },)
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


