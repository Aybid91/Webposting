const express = require("express");
const apiRouter = require("./apiRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./api/mongoConnect");
const app = express();
const port = 3500;
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  bodyParser.json({
    type: ["json", "application/csp-report"],
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", apiRouter);

// router.use("/auth", authRouter)
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
