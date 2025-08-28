const express = require("express");
const routes = express.Router();

const { login, register, profile } = require("../controller/auth.controller");
const { authenticate } = require("../middleware/auth.middleware");

routes.post(`/login`, login);
routes.post(`/register`, register);
routes.get(`/profile`, authenticate, profile);

module.exports = routes;
