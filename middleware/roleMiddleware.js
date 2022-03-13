const config = require("config");
const jwt = require("jsonwebtoken");

const roleMiddleware = (role) => {
  return (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied");

    try {
      req.user = jwt.verify(token, config.get("JWT"));

      if (req.user.role === "admin") return next();
      if (role.includes(req.user.role)) return next();
      else return res.status(401).send("Access denied");
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  };
};

module.exports = roleMiddleware;
