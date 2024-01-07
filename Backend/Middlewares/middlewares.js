const { verifyjwtSign } = require("../api/jwtHandler");

module.exports.verifyToken = async (req, res, next) => {
  const cookies = req.cookies;
  const { authtoken } = cookies;
  if (!authtoken) return res.status(401);
  const data = verifyjwtSign(authtoken);
  if (!data.user.id) return res.status(403);
  req.body.user = data.user;
  next();
};
