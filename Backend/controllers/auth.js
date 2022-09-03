const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).send("Access denied. Not authenticated...");
  try {
    const jwtSecretKey =  keys.secretOrkey;
    const decoded = jwt.verify(token, jwtSecretKey);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid auth token...");
  }
};

module.exports = { auth };




