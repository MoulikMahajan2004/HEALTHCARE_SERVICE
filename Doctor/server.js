const express = require("express");
const app = express();
const { db_connection, db } = require('../Doctors/DB/DB.JS');
//connection to db
(async () => {
  try {
    await db_connection().then(console.log("✔️✔️ SERVER connected TO DB successfully"));

    //SWITHCING TO DB DOCOTRS TO ADD TABLES INSIDE THE DB
    await db.query("USE doctors")
    console.log("successfuly sqwithced to doctors");
    //CREATED THE TABLE OF DOCTORS
    await db.query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Doctors' AND xtype='U')

    CREATE TABLE Doctors (
      id INT IDENTITY(1,1) PRIMARY KEY,
      GivenName VARCHAR(30) NOT NULL,
      Expertise VARCHAR(30) NOT NULL,
      email VARCHAR(50),
      phone VARCHAR(11)
    )
    `);
    console.log("doctor table created successfully")

    //CREATED THE TABEL OF USERS
    await db.query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
  
      CREATE TABLE Users 
      (id INT IDENTITY(1,1) PRIMARY KEY,
      email VARCHAR(30) NOT NULL,
      password VARCHAR(100) NOT NULL
      )
    
    `);
    console.log("Users table created");
    //CREATED THE SCHEDULE TABLE TO ADD THE SCHEDULE OF THE DOCTOR
    await db.query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Schedule' AND xtype='U')
      
      CREATE TABLE Schedule (
      id    INT       IDENTITY(1,1) PRIMARY KEY,
      GivenName VARCHAR(30) NOT NULL,
      Day   VARCHAR(10) NOT NULL,
      Slot1 BIT          NOT NULL,
      Slot2 BIT          NOT NULL
    );`);
    console.log("Schedule table created");

  }
  catch (err) {
    console.log(err);
    // ... error checks
  }
})();

app.use(express.json());

//--------------------link paths ----------------------------


//*********************SCHEDULE FOR DOCTOR************************************************
//:SCHEDULE THE APPOINTMENT
app.get('/schedule/:name', require('./pages/routes.js'));

//:SCHEDULE FOR ALL DOCTOR
app.get('/schedules', require('./pages/routes.js'));
//DOCTOR BOOKING ITS SCHEDULE
app.post('/schedule/:GivenName/:Day/:Slot1/:Slot2',require('./pages/routes.js'));

//*********************DOC USING APPOINTMENT MICROSERVICE TO GET WHICH PATIENTS BOOKED HIME WHEN **************************
app.get('/book/:doc', require('./pages/routes.js'));

//****************************************DOCTOR LOGIN INFO**************************************************

//:AUTH  - REGISTER TO CREATE THE NEW USER 
app.post('/register', require('./pages/routes.js'));

//:AUTH - LOGIN TO NEW USER ACCOUNT 
app.post('/login', require('./pages/routes.js'));
//******************************************************************************************************** */



app.listen(3000, function () {
  console.log("Server is running");
})