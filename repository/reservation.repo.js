const pool = require("../db/connectdb");

const getUserReservation = async (id) => {
  const query = `SELECT * from reservations where user_id= $1;
    `;

  const result = await pool.query(query, [id]);
  console.log(result);

  return result.rows;
};

const getAllReservations = async () => {
  const query = `SELECT * FROM reservations`;
  const result = await pool.query(query);
  return result.rows;
};

const getAvailableResource = async (resource_type) => {
  const query = `SELECT * FROM resources WHERE resource_type=$1 AND availability=true LIMIT 1`;
  const result = await pool.query(query, [resource_type]);
  return result.rows[0];
};

const createReservation = async (resourceId, userId, start_time, end_time) => {
  const query = `INSERT INTO reservations(resource_id, user_id, start_time, end_time) VALUES ($1, $2, $3, $4)`;
  await pool.query(query, [resourceId, userId, start_time, end_time]);
};

const updateResourceAvailability = async (resourceId, availability) => {
  const query = `UPDATE resources SET availability=$1 WHERE resource_id=$2`;
  await pool.query(query, [availability, resourceId]);
};

const getReservationById = async (id) => {
  const query = `SELECT * FROM reservations WHERE reservation_id=$1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const getReservationByUser = async (reservationId, userId) => {
  const query = `SELECT * FROM reservations WHERE reservation_id=$1 AND user_id=$2`;
  const result = await pool.query(query, [reservationId, userId]);
  return result.rows[0];
};

const deleteReservation = async (id) => {
  const query = `DELETE FROM reservations WHERE reservation_id=$1`;
  await pool.query(query, [id]);
};
module.exports = {
  getUserReservation,
  getAllReservations,
  getAvailableResource,
  createReservation,
  updateResourceAvailability,
  getReservationById,
  getReservationByUser,
  deleteReservation,
};
