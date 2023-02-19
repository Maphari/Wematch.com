require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
 
  const { authorization } = req.headers;

  //   CHECKING IF USER HAS ACCESS
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }
  // WHEN USER HAS ACCESS
  const token = authorization.replace("Bearer", "");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in" });
    }
    // CHECKING USER BY ID IF EXSIST
    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    // CONTINUING WITH THE ROUTE
    next();
  });
};