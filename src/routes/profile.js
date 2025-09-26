const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const { adminAuth } = require("../middlewares/auth");


profileRouter.get("/profile/view", adminAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/edit", adminAuth, async (req, res) => {
  try {
    const data = req.body;
    const logedInUser = req.user;
    const ALLOWED_UPDATE = [
      "firstName",
      "lastName",
      "password",
      "age",
      "gender",
      "skills",
    ];
    const isUpdate = Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k));
    if (!isUpdate) {
      throw new Error("Update not allowed");
    }
    if (data?.skills?.length > 10) {
      throw new Error("Skills should not be greater than 10");
    }
    Object.keys(data).every((k) => (logedInUser[k] = data[k]));
    await logedInUser.save();
    res.json({
      message: `${logedInUser?.firstName}, your profile is updated`,
      data: logedInUser,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/password", adminAuth, async (req, res) => {
  try {
    const data = req.body;
    const logedInUser = req.user;
    const passwordHash = await bcrypt.hash(data?.password, 10);
    const isPasswordValid = await logedInUser.validatePassword(data?.oldpassword);
    if(!isPasswordValid){
        throw new Error("Invalid password");
    }
    logedInUser.password = passwordHash
    await logedInUser.save();
    res.json({
      message: `${logedInUser?.firstName}, your password is updated`,
      data: logedInUser,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
