const pool = require("../db/connectdb");

const createUser = async (name, email, password, role) => {
  const query = `INSERT INTO users(name, email, password,role) VALUES ( $1, $2,$3, $4)`;
  const result=await pool.query(query, [name, email, password, role])
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email=$1`;
  const result= await pool.query(query, [email])
  return result.rows[0];
};

const getUserById = async (id) => {
  const query = `SELECT * FROM users WHERE id=$1`;
  const result= await pool.query(query, [id])
  return result.rows[0];
};

module.exports = { createUser, getUserByEmail, getUserById };
