const jwt = require("jsonwebtoken");
const jwtSecret = "dummyForNow";

module.exports.jwtSign = (data) => {
  const token = jwt.sign(data, jwtSecret);
  return token;
};
module.exports.verifyjwtSign = (token) => {
  const decoded = jwt.verify(token, jwtSecret);
  return decoded;
};
