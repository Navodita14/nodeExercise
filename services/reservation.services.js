const pool = require("../db/connectdb");

const getUserReservationService = async (id) => {
  const result = await pool.query(`
    SELECT * from reservations where user_id= ${id};
    `);
  // console.log(result.rows)
  return result.rows;
};
const createReservationService = async (
  resource_type,
  start_time,
  end_time,
  id
) => {
  const available = await pool.query(
    `
    SELECT * FROM resources where resource_type= $1 and availability = true;
    `,
    [resource_type]
  );
  // console.log(available);

  if (!available.rows.length) {
    return false;
  }

  await pool.query(
    `
      INSERT INTO reservations(resource_id, user_id, start_time, end_time) values (${available.rows[0].resource_id}, $1, $2, $3);
      `,
    [id, start_time, end_time]
  );

  //after making a reservation seting the resource unavailable
  await pool.query(`
      Update resources set availability = false where
        resource_id= ${available.rows[0].resource_id}
      `);

  return "Inserted value";
};

const getAllReservationsService = async () => {
  const result = await pool.query(`
    SELECT * from reservations;
    `);
  return result.rows;
};

const cancelReservationService = async (id, user_id, user_role) => {
  //trying to get resource_id if users try to delete by resource name
  // const resource= await pool.query(`
  //   Select resource_id from resources where resource_name=${name}`)
  //   console.log(resource);


  let reservation = null;

  // get list of all reservations
  if (user_role == "admin") {
    reservation = await pool.query(`
    SELECT * from reservations where reservation_id=${id};
    `);
  } else {
    // gets list of all reservation of user
    reservation = await pool.query(`
      SELECT * from reservations where reservation_id=${id} and user_id= ${user_id};
    `);
  }

  if (!reservation.rows.length) {
    return "Reservation not found";
  }

 await pool.query(`
    delete from reservations where reservation_id= ${id};`);
  return "Reservation Cancelled";
};

// removed this function to reduce redundancy
// const deleteAnyReservationService = async (id) => {
//   try {
//     let reservation = await pool.query(`
//     SELECT * from reservations where reservation_id=${id};
//     `);
//     // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!111');

//     // console.log(id);

//     // console.log(reservation.rows);

//     console.log(reservation.rows.length);

//     if (!reservation.rows.length) {
//       return "Reservation not found";
//     }

//     const result = await pool.query(`
//     delete from reservations where reservation_id= ${id};`);
//     return "Reservation Cancelled";
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  getAllReservationsService,
  getUserReservationService,
  createReservationService,
  // deleteAnyReservationService,
  cancelReservationService,
};
