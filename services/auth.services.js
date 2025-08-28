const pool = require("../db/connectdb");

const createUser = async (name, email, password, role = "user") => {
  const result = await pool.query(
    `INSERT INTO users(name, email, password,role) VALUES ( $1, $2,$3, $4)`,
    [name, email, password, role]
  );
  // console.log(result);
  return result;
};

const getUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  if (!result.rows.length) {
    return "user not found";
  }
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
  if (!result.rows.length) {
    return "user not found";
  }
  return result.rows[0];
};

module.exports = { createUser, getUserByEmail, getUserById };
