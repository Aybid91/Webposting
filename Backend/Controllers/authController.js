const router = require("express").Router();
const { verifyToken } = require("../Middlewares/middlewares");
const { addUser, loginUser } = require("../Models/UserSchema");
const { jwtSign } = require("../api/jwtHandler");
const signup = async (req, res) => {
  try {
    const user = await addUser(req.body);
    if (!user?._id) return res.status(403).send("User Exists");
    const tokenData = {
      user: {
        id: user._id.toString(),
      },
    };
    const token = jwtSign(tokenData);
    res.cookie("authtoken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: "lax",
    });

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("signup failed");
  }
};

const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);

    if (!user?._id) return res.status(403).send("User not found");
    const tokenData = {
      user: {
        id: user._id.toString(),
      },
    };

    const token = jwtSign(tokenData);
    res.cookie("authtoken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: "lax",
    });

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("login failed");
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("authtoken"); // Clear the cookie on the client side
    res.status(200).send("Logout successful");
  } catch (error) {
    res.status(400).send("Logout Error");
  }
};
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", verifyToken, logout);
module.exports.authRouter = router;
