// models/appointment.js
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const appointmentSchema = new mongoose.Schema({
  doc: { type: String, required: true },
  day: { type: String, required: true },
  slot: { type: String, required: true },
  patient_name:{type:String,required:true}
});

mongoose.Schema()
const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
