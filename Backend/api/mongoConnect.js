const mongoose = require("mongoose");
const uri =
  "mongodb+srv://dibyamonda98:Dibya%401998@webposting.ciwaqbg.mongodb.net/";
try {
  mongoose.connect(uri);
  console.log("connected to DB");
} catch (error) {
  console.log("could not connect to DB");
  console.log(error);
}
