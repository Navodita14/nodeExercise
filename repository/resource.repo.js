const pool = require("../db/connectdb");

// query to get all resources
const getAllResource = async () => {
  const query = `SELECT * FROM resources WHERE availability=true`;
  const result = await pool.query(query);
  return result.rows;
};

// query to create new resource
const createResource = async (resource_name, resource_type) => {
  const query = `INSERT INTO resources (resource_name, resource_type) VALUES ($1, $2);`;
  const result = await pool.query(query, [resource_name, resource_type]);
  return result.rows[0];
};


// query to get a resource by id
const getResource = async (id) => {
  const query = `SELECT * FROM resources WHERE resource_id=$1;`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};


// query to update resources dynamically
const updateResource = async (id, updates) => {
    const entries = Object.entries(updates);
  if (!entries.length) return null;
  const setClause = entries.map(([k], i) => `${k}=$${i + 1}`).join(",");
  const values = entries.map(([_, v]) => v);
  const query = `UPDATE resources SET ${setClause} WHERE resource_id=$${
    entries.length + 1
  };`;
  
  const result = await pool.query(query, [...values, id]);
  return result.rows[0];
};

// query to delete resource
const deleteResource = async (id) => {
  const query = `DELETE FROM resources WHERE resource_id=$1 RETURNING *;`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
module.exports = {
  getAllResource,
  getResource,
  deleteResource,
  updateResource,
  createResource,
};
