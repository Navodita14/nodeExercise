const pool = require("../db/connectdb");

const createUser= async(name, email, password, role = "user") =>{
  const result = await pool.query(
    `INSERT INTO users(name, email, password,role) VALUES ( $1, $2,$3, $4)`,
    [name, email, password, role]
  );
  // console.log(result);
  return result;
}

const getUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
  // console.log(result.rows[0]);

  return result.rows[0];
};

module.exports = { createUser, getUserByEmail, getUserById };
