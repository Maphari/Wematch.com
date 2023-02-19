const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const {
    username,
    email,
    gender,
    mobile_number,
    password,
    profile_picture,
    dafe_of_birth,
    bio,
  } = req.body;

  try {
    const user = new User({
      username,
      email,
      gender,
      mobile_number,
      password,
      profile_picture,
      dafe_of_birth,
      bio,
    });
    await use.save();
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.send({ token });
  } catch (error) {
    res.status(422).send(`error message: ${error}`);
  }
});

module.exports = router;
