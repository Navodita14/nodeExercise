const asyncWrapper = require("../middleware/async");
const {
  getAllReservationsService,
  getUserReservationService,
  createReservationService,
  cancelReservationService,
  // deleteAnyReservationService,
} = require("../services/reservation.services");

// returns all reservations of a USER
const getUserReservation = asyncWrapper(async (req, res) => {
  const id = req.user.id;
  const userReservation = await getUserReservationService(id);
  console.log(userReservation);

  res.status(200).json(userReservation);
});
// creating a reservation for a user
const createReservation = async (req, res) => {
  const { resource_type, start_time, end_time } = req.body;
  const id = req.user.id;
  const reservations = await createReservationService(
    resource_type,
    start_time,
    end_time,
    id
  );
  if (!reservations) {
    res.status(400).send("Room type not available");
  } else {
    res.status(200).json(reservations);
  }
};
// (deletes/cancels) reservation based on role (USER/ADMIN)
const cancelReservation = async (req, res) => {
  const id = req.params.id;
  const role = req.user.role;
  console.log(role);
  let cancellation = null;
  cancellation = await cancelReservationService(id, req.user.id, role);
  //   if(role==='admin'){
  //       cancellation= await deleteAnyReservationService(id);
  //   }
  //   else{
  //  cancellation= await cancelReservationService(id, req.user.id);
  //   }

  console.log(cancellation);

  res.send(cancellation);
};

//gets all the reservations
const getAllReservations = async (req, res) => {
  const allreservations = await getAllReservationsService();
  res.status(200).json(allreservations);
};

// deleted function because of single endpoint will not call this
// const deleteAnyReservation = async (req, res) => {
//   const id=req.params.id
//   const cancelAny= deleteAnyReservationService(id);
//   res.send(200).json(cancelAny)
// };

module.exports = {
  getAllReservations,
  getUserReservation,
  createReservation,
  // deleteAnyReservation,
  cancelReservation,
};
