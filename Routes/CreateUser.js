const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const jwtSecret = "jdashdskhjcvksdagaklfjksdvfdhfdbfnasdsa";
// This is for create a user
router.post("/createuser", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      location: req.body.location,
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

// This is for login user
router.post("/loginuser", async (req, res) => {
  let email = req.body.email;
  try {
    let UserData = await User.findOne({ email });
    if (!UserData) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }
    if (req.body.password !== UserData.password) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }
    const data = {
      user: {
        id: UserData.id,
      },
    };
    const authToken = jwt.sign(data, jwtSecret);
    res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
