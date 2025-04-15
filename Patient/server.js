const express = require("express");
const app = express();
const { db_connection, db, cont } = require('../Patients/DB/db.js');

(async () => {
  try {
    await db_connection();
    console.log("✔️ Patient DB connected");

    await db.query("USE patients");
    console.log("✔️ Switched to patients");

    // Create Patients table if not exists
    const patientsTableCheck = `
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Patients')
      BEGIN
        CREATE TABLE Patients (
          id INT IDENTITY(1,1) PRIMARY KEY,
          GivenName VARCHAR(30) NOT NULL,
          email VARCHAR(50),
          phone VARCHAR(11)
        )
      END`;
    await db.query(patientsTableCheck);
    console.log("✔️ Patients table ensured");

    // Create Users table if not exists
    const usersTableCheck = `
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
      BEGIN
        CREATE TABLE Users (
          id INT IDENTITY(1,1) PRIMARY KEY,
          email VARCHAR(30) NOT NULL,
          password VARCHAR(100) NOT NULL
        )
      END`;
    await db.query(usersTableCheck);
    console.log("✔️ Users table ensured");
  } catch (err) {
    console.error("❌ DB Init Error:", err);
  }
})();



app.use(express.json());
//define routes
//****************USED PY PATIENT TO LOGIN **********************/
//This is used to create the patient account
app.post('/register', require('./pages/routes.js'));
//This is used to login for the patient
app.post('/login', require('./pages/routes.js'));

//***************PATIENT USING THE (APPOINTMENT SERVICE) TO BOOK *********************/
//patient booking appointent (APPOINTMENT SERVICE)
app.post('/book/:doc/:day/:slot/:patient_name', require('./pages/routes.js'));

//********************FETCHING SCHEDULE BASED UPON DOC *******************/
//fething the schedule based upon the doc name   (DOC SERVICE)
app.get("/schedule/:name", require('./pages/routes.js'));
//fetching the schedule for all the doctors       (DOC SERVICE)
app.get("/schedules", require('./pages/routes.js'));



app.listen(3001, function () {
  console.log("Server is running");
})