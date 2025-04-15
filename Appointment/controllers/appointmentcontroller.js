// controllers/appointmentController.js
const Appointment = require('../Model/appointmentModel');

// Book an appointment
exports.bookAppointment = async (req, res) => {
  const { doc, day, slot,patient_name } = req.params;
  try {
    // Check if the slot is already booked for the doctor
    const existingAppointment = await Appointment.findOne({ doc, day, slot,patient_name });

    if (existingAppointment) {
      return res.status(400).json({ message: 'The slot is already booked for this doctor on this day.' });
    }

    // Create a new appointment
    const newAppointment = new Appointment({ doc, day, slot,patient_name });
    await newAppointment.save();
    console.log("APPOINTMENT BOOK SUCCESSFULLY");
    return res.status(200).json({ message: `Appointment booked successfully for Dr. ${doc} on ${day} at slot ${slot}` });
  } catch (error) {
    return res.status(500).json({ message: 'Error booking appointment', error });
  }
};

// Fetch all booked appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    console.log("Fetched all the current appointments");
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

//fetching the appointment based upon doctor name 
exports.getBookedappointmentBasedonDocName = async(req,res) =>{
    try{
        const doc = req.params.doc;
        const appointments = await Appointment.find({doc});
        console.log("Fetched all the current appointments");
        return res.status(200).json(appointments);
    }
    catch(error){
        return res.status(500).json({ message: 'Error in ftehcing book appointnt for partiular doctor by hi nmaem ', error });
    }
}
