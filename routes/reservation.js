const express= require('express')
const router= express.Router()
const {getAllReservations,getUserReservation,createReservation,cancelReservation,deleteAnyReservation}= require('../controller/reservation')
const { authorize } = require('../middleware/auth')

router('/my').get(getUserReservation)
router('/').post(createReservation)
router('/:id').delete(cancelReservation)
router('/').get(authorize,getAllReservations)
router('/:id').delete(authorize,deleteAnyReservation)

module.exports=router