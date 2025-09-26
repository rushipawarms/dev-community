const express = require("express");
const sendRequestRouter = express.Router();
const { adminAuth } = require("../middlewares/auth");

sendRequestRouter.post("/sendConnectionRequest", adminAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("Sending a connection request.");
    res.send(user?.firstName);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = sendRequestRouter;
