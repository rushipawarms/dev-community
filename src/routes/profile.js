const express = require("express");
const profileRouter = express.Router();
const User = require("../model/user");
const { adminAuth } = require("../middlewares/auth");

profileRouter.get("/profile", adminAuth, async (req, res) => {
  try {
    user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//get user by email
profileRouter.get("/user", async (req, res) => {
  try {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const user = await User.findOne({ email: email });
    if (user) {
      res.send(user);
    } else {
      res.send("User not found");
    }
  } catch (err) {
    res.send("Somthing went wrong");
  }
});

//delete record by Id
profileRouter.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    console.log(user);
    res.send("user deleted");
  } catch (err) {
    res.status(500).send("Somthing went wrong");
  }
});

//update record by Id
profileRouter.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    const data = req.body;
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
    if (data?.skills?.length > 0) {
      throw new Error("Skills should not be greater than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = profileRouter;
