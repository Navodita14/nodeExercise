const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  //fetcing header for token verification
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED).send("No token provided");
  }
  const token = authHeader;
  // console.log(token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    req.user = { id: payload.id, role: payload.role };

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send("Not authenticated")
    console.log(error);
  }
};

const authorize = (req, res, next) => {
  console.log(req.body);
  console.log(req.user);

  // authorizing if user is admin or normal user
  if (req.user.role != "admin") {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Access Denied" });
  }

  next();
};

module.exports = { authenticate, authorize };
