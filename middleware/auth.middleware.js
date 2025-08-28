const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  //fetcing header for token verification
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.send("No token provided");
  }
  const token = authHeader;
  console.log(token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    req.user = { id: payload.id, role: payload.role };

    next();
  } catch (error) {
    console.log(error);
  }
};

const authorize = (req, res, next) => {
  console.log(req.body);
  console.log(req.user);

  // authorizing if user is admin or normal user
  if (req.user.role != "admin") {
    return res.status(403).json({ msg: "Access Denied" });
  }

  next();
};

module.exports = { authenticate, authorize };
