const express = require("express");
const { authRouter } = require("./Controllers/authController");
const { profileRouter } = require("./Controllers/profileController");
const { publicRouter } = require("./Controllers/publicController");
// const { verifyToken } = require("./Middlewares/middlewares");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/public", publicRouter);
router.use("/profile", profileRouter);
module.exports = router;
