const pool = require("../db/connectdb");
const getAllResourceService = async () => {
  const result = await pool.query(`SELECT * FROM resources`);
  return result.rows[0];
};
const createResourceService = async (resource_name, resource_type) => {
    const result= await pool.query(`INSERT INTO resources (resorce_name, resource_type) VALUES ($1, $2); `, [resource_name, resource_type]);
    return result.rows[0];
};
const getResourceService = async (id) => {
    const result= await pool.query(`SELECT * FROM resources WHERE resource_id = $1;`, [id]);
    return result.rows[0];
};
const updateResourceService = async (id, updates) => {
    if(!Object.keys(updates).length){
        return "Nothing to update"
    }
    const entries= Object.entries(updates)
    const setClause = entries.map(([k],i)=>`${k}=$${i+1}`).join(',');
    const values= entries.map((_,n)=>v)

    const result= await pool.query(`
        Update resources set ${setClause} where
        resource_id= ${entries.length+1}`,[...values,id]);
    return result.rows[0];

};
const deleteResourceService = async (id) => {
    const result = await pool.query(`
        Delete from resources where resource_id = $1`, [id])
};

module.exports={getAllResourceService, getResourceService, deleteResourceService, updateResourceService, createResourceService}
