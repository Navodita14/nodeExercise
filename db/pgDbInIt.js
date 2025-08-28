const pool = require("./connectdb");

const initDb = async () => {
  try {
    //creating user_role enum
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS(SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
          CREATE TYPE user_role as enum ('admin', 'user');
        END IF;
      END
      $$;
      `);

    //creating resource type enum
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS(SELECT 1 FROM pg_type WHERE typname = 'r_type') THEN
          CREATE TYPE r_type as enum('room','hall','outdoors');
        END IF;
      END
      $$;
      `);
    //creating user table
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,          
            name varchar(100) not null,
            email varchar(100) not null unique CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'),
            password text not null,
            role user_role DEFAULT 'user'
        );`);

    //creating resources table
    await pool.query(`
            CREATE TABLE IF NOT EXISTS resources(
            resource_id SERIAL PRIMARY KEY,
            resource_name varchar(100) not null unique,
            resource_type r_type,
            availability boolean default true
        );`);

    //creating resrvations table
    await pool.query(`
            CREATE TABLE IF NOT EXISTS reservations(
            reservation_id SERIAL PRIMARY KEY,
            resource_id serial references resources(resource_id),
            user_id serial references users(id),
            start_time timestamp,
            end_time timestamp
        );`);
  } catch (e) {
    console.log(e);
  }
  console.log("Created users table");
};

module.exports = { initDb };
