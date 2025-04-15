// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentcontroller');

// Book an appointment USE BY PATIENT SERVICE TO DO THE BOOKING 
router.post('/book/:doc/:day/:slot/:patient_name', appointmentController.bookAppointment);

// Get all appointment USED BY DOCTOR TO FETCH CAN IMPLEMENT    
router.get('/book', appointmentController.getAppointments);

//get all appointments based upon their name 
router.get('/book/:doc', appointmentController.getBookedappointmentBasedonDocName);

module.exports = router;
