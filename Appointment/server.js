// server.js
const express = require('express');
const bodyParser = require('body-parser');
const appointmentRoutes = require('../Appointment/routes/appointmentroutes');
require('../Appointment/Db/db');

const app = express();
const port = 8091;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Register routes
app.use('/', appointmentRoutes); // This will use the router defined in appointmentRoutes.js

// Start the server 
app.listen(port, () => {
  console.log(`Appointment app listening at http://localhost:${port}`);
});
