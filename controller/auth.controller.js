const asyncWrapper = require("../middleware/async");
const { StatusCodes } = require("http-status-codes");
const service= require('../services/auth.services');
const repo= require('../repository/auth.repo')


const login = asyncWrapper(async (req, res) => {
  const {email,password}= req.body
  const result = await service.loginUser(email, password)
  console.log(result);
  
  res.status(StatusCodes.OK).json(result)
});


const register = asyncWrapper(async (req, res) => {
  const { name, password, email, role } = req.body;

  //Creating user by query
  const user = await service.registerUser(name, email, password, role);
  res.status(201).json(user);
});


const profile = asyncWrapper(async (req, res) => {
  const id = req.user.id;
  const user = await repo.getUserById(id);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send("User not found");
  }
  res.status(200).json(user);
});


module.exports = { login, register, profile };
