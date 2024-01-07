const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userData: { type: Object },
});
const UserModel = mongoose.model("userModel", UserSchema);

const addUser = async (data) => {
  const { name, email, password } = data;
  try {
    const checkExisting = await UserModel.findOne({ email });
    if (checkExisting) {
      return new Error("User exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = { name, email, password: hashedPassword, userData: {} };
    const addResp = new UserModel(data);
    await addResp.save();
    return addResp;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const loginUser = async (data) => {
  const { email, password } = data;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return new Error("User not found");
    }
    const hashedPassword = user.password;
    const matched = await bcrypt.compare(password, hashedPassword);
    if (!matched) {
      return new Error("Password mismatch");
    }
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getUserById = async (id) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};
module.exports = { addUser, loginUser, getUserById };
