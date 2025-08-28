const { Pool } = require("pg");
require("dotenv").config();

//connecting db
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
