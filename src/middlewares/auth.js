const User = require("../model/user");
const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid!!!!!!!");
    }
    const decodedToken = await jwt.verify(token, "DevCommunity@9763");
    const userId = decodedToken?._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  adminAuth,
};
