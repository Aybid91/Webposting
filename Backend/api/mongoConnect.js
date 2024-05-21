const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
try {
  mongoose.connect(uri);
  console.log("connected to DB");
} catch (error) {
  console.log("could not connect to DB");
  console.log(error);
}
