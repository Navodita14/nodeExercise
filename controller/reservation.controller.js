const asyncWrapper = require("../middleware/async");
const { StatusCodes } = require("http-status-codes");
const reservationService = require("../services/reservation.services");


const getUserReservation = asyncWrapper(async (req, res) => {
  const id = req.user.id;
  const userReservation = await reservationService.getUserReservation(id);
  if (!userReservation || !userReservation.length) {
    return res.status(StatusCodes.NOT_FOUND).send("No reservations");
  }
  res.status(StatusCodes.OK).json(userReservation);
});


const createReservation = asyncWrapper(async (req, res) => {
  const { resource_type, start_time, end_time } = req.body;
  const id = req.user.id;
  const reservations = await reservationService.createReservation(
    resource_type,
    start_time,
    end_time,
    id
  );
  if (!reservations) {
    return res.status(StatusCodes.NOT_FOUND).send("Room type not available");
  }
  res.status(StatusCodes.CREATED).json(reservations);
});


// (deletes/cancels) reservation based on role (USER/ADMIN)
const cancelReservation = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const role = req.user.role;
  const cancellation = await reservationService.cancelReservation(id, req.user.id, role);
  res.send(cancellation);
});


//gets all the reservations
const getAllReservations = asyncWrapper(async (req, res) => {
  const allreservations = await reservationService.getAllReservations();
  res.status(StatusCodes.OK).json(allreservations);
});
module.exports = {
  getAllReservations,
  getUserReservation,
  createReservation,
  cancelReservation,
};