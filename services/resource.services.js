const pool = require("../db/connectdb");
//query to get all the resources
const getAllResourceService = async () => {
  const result = await pool.query(`SELECT * FROM resources`);
  return result.rows;
};

// quesry to create new resource
const createResourceService = async (resource_name, resource_type) => {
  const result = await pool.query(
    `INSERT INTO resources (resource_name, resource_type) VALUES ($1, $2); `,
    [resource_name, resource_type]
  );
  console.log(result);

  return "Row inserted";
};

//query to get a resource by its id
const getResourceService = async (id) => {
  const result = await pool.query(
    `SELECT * FROM resources WHERE resource_id = $1;`,
    [id]
  );
  return result.rows[0];
};

//query to update resources
const updateResourceService = async (id, updates) => {
  try {
    if (!Object.keys(updates).length) {
      return "Nothing to update";
    }
    const entries = Object.entries(updates);
    const setClause = entries.map(([k], i) => `${k}=$${i + 1}`).join(",");
    const values = entries.map(([_, v]) => v);

    const result = await pool.query(
      `
        Update resources set ${setClause} where
        resource_id= $${entries.length + 1}`,
      [...values, id]
    );
    return result.rows[0];
  } catch (e) {
    console.log(e);
  }
};
const deleteResourceService = async (id) => {
  const result = await pool.query(
    `
        Delete from resources where resource_id = $1`,
    [id]
  );
};

module.exports = {
  getAllResourceService,
  getResourceService,
  deleteResourceService,
  updateResourceService,
  createResourceService,
};
