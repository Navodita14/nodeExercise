const repo = require("../repository/reservation.repo");


const getUserReservation = async (id) => {
  return repo.getUserReservation(id);
};
const createReservation = async (
  resource_type,
  start_time,
  end_time,
  userId
) => {
  const available = await repo.getAvailableResource(resource_type);
  if (!available) {
    return false;
  }
  await repo.createReservation(
    available.resource_id,
    userId,
    start_time,
    end_time
  );
  await repo.updateResourceAvailability(available.resource_id, false);
  return "Reservation done";
};
const getAllReservations = async () => {
  return repo.getAllReservations();
};
const cancelReservation = async (reservationId, userId, userRole) => {
  let reservation;
  if (userRole === "admin") {
    reservation = await repo.getReservationById(reservationId);
  } else {
    reservation = await repo.getReservationByUser(reservationId, userId);
  }
  if (!reservation) {
    return "Reservation not found";
  }
  await repo.deleteReservation(reservationId);
  return "Reservation Cancelled";
};
module.exports = {
  getUserReservation,
  createReservation,
  getAllReservations,
  cancelReservation,
};
