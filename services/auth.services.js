const jwt = require("jsonwebtoken");
const repo = require("../repository/auth.repo");
const bcrypt = require("bcrypt");

const registerUser = async (name, email, password, role = "user") => {
  //find if user is already registered or not

  if (await repo.getUserByEmail(email)) {
    throw new Error("User already exists");
  }

  //Hashing Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return repo.createUser(name, email, hashedPassword, role);
};

const loginUser = async (email, password) => {
  const user = await repo.getUserByEmail(email);
  console.log(user);

  if (!user) {
    throw new Error("User does not exists");
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    throw new Error("Pasword does not match");
  }
  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  return token;
};

module.exports = { registerUser, loginUser };
