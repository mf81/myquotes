const config = require("config");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied.");

  try {
    req.user = jwt.verify(token, config.get("JWT"));
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}

module.exports = authMiddleware;
