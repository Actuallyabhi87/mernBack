const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  try {
    let data = req.body.order_data;

    // No need to use await with splice, as it modifies the array in place
    data.splice(0, 0, { order_data: req.body.order_date });

    let eId = await Order.findOne({ email: req.body.email });

    if (eId === null) {
      await Order.create({
        email: req.body.email, // Fixed typo: emial to email
        order_data: [data],
      });
      res.json({ success: true });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    }
  } catch (error) {
    alert(error.message); // Fixed typo: massage to message
    res.status(500).send("Server error: ", error.message);
  }
});

router.post("/myorderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.send("Server error: ", error.message);
  }
});

module.exports = router;
