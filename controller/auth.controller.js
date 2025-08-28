const {
  createUser,
  getUserByEmail,
  getUserById,
} = require("../services/auth.services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middleware/async");
const { StatusCodes } = require('http-status-codes');

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  //Checking if user exists
  const user = await getUserByEmail(email);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send(`user not found`);
  }

  //Password authentication
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(StatusCodes.UNAUTHORIZED).send("Password wrong");
  }

  //Generating JWT token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  res.send(token);
});


const register = asyncWrapper(async (req, res) => {
  const { name, password, email, role } = req.body;

  //Hashing Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Creating user by query
  const user = createUser(name, email, hashedPassword, role);
  res.status(201).json(user);
});


const profile = asyncWrapper(async (req, res) => {
  const id = req.user.id;
  const user = await getUserById(id);
  if(!user){
    res.status(StatusCodes.NOT_FOUND).send('User not found')
  }
  res.status(200).json(user);
});

module.exports = { login, register, profile };
