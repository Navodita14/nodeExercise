const express = require("express");
const router = express.Router();
const {
  getAllReservations,
  getUserReservation,
  createReservation,
  cancelReservation,
  // deleteAnyReservation,
} = require("../controller/reservation.controller");
const { authorize } = require("../middleware/auth.middleware");

router.get("/my", getUserReservation);
router.post("/", createReservation);
router.delete("/:id", cancelReservation);
router.get("/", authorize, getAllReservations);
// router.delete("/:id", authorize, deleteAnyReservation);

module.exports = router;
