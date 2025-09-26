const express = require("express");
const authRouter = express.Router();
const bcrypt = require('bcrypt')
const User = require("../model/user");

const { validateSignUpData, isUpdate } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password, age, gender, skills } =
      req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      gender,
      skills,
    });
    await user.save({
      runValidators: true,
    });
    res.status(200).send("data saved in Db");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//login API
authRouter.post("/login", async (req, res) => {
  try {
    const data = req.body;
    if (!isUpdate(data)) {
      throw new Error("Not a valid fields");
    }
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(data?.password);
    if (isPasswordValid) {
      const token = await user.getJwt();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Succesfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = authRouter;
