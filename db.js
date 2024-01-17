const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://gofood:Abhishek1212@cluster0.rmrner3.mongodb.net/gofood?retryWrites=true&w=majority";

const mongodb = async () => {
  await mongoose.connect(mongoURI);
  await console.log("connect db");
  const fooditem = mongoose.connection.collection("fooditem");
  const foodCategory = mongoose.connection.collection("food category");
  try {
    const data = await fooditem.find({}).toArray();
    const catData = await foodCategory.find({}).toArray();
    global.food_items = data;
    global.foodCategory = catData;

    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongodb;
