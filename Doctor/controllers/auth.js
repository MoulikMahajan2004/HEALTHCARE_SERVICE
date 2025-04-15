const sql = require('mssql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db_connection, db, cont } = require('../DB/DB.JS');

//login 
exports.login = async (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;

  //connection established
  const conn = await db_connection();
  //db func fetched 
  const result = await conn.request().input('email', sql.VarChar, email).query('SELECT * from Users WHERE email= @email');
  //user recordset 
  if (result.recordset[0] < 0) {
    return console.log("USER  NOT SUCCESSFULLY LOGGED");
  }
  const user = result.recordset[0];
  console.log(user.password);
  //bcrypt to decrypt the password 
  const bool_pass = (await bcrypt.compare(pass, user.password)).valueOf();
  //just checking the status password correct or not 
  console.log(bool_pass);
  if (!bool_pass) {
    return console.log("USER  NOT SUCCESSFULLY LOGGED");
  }

  //assgining the jwt token 
  const token = jwt.sign(
    { id: user.id }, "test",        // use an env‑var, not a hardcoded “secret”
    { expiresIn: '90d' }
  );

  //Send it back as a secure, HTTP‑only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 90 * 24 * 60 * 60 * 1000               // 90 days in milliseconds
  });
  console.log("SUCCESS FULLY LOGGED IN ");
  res.send("SUCCESS FULLY LOGGED IN ");
}

exports.register = async (req, res) => {
  let GivenName = req.body.GivenName
  let Expertise = req.body.Expertise;
  let email = req.body.email;
  let phone = req.body.phone;
  let pass = req.body.pass;

  try {
    const conn = await db_connection();
    // Check if email already exists
    const checkResult = await conn.request()
      .input('email', sql.VarChar, email)
      .query('SELECT email FROM Users WHERE email = @email');

    if (checkResult.recordset.length > 0) {
      console.log('User already exists');
      return res.send(" already registered");
    }
    else {
      // Hash the password
      let hashedPassword = await bcrypt.hash(pass, 8);

      // Insert into doctors
      await conn.request()
        .input('GivenName', sql.VarChar, GivenName)
        .input('Expertise', sql.VarChar, Expertise)
        .input('email', sql.VarChar, email)
        .input('phone', sql.VarChar, phone)
        .query('INSERT INTO doctors (GivenName, Expertise, email, phone) VALUES (@GivenName, @Expertise, @email, @phone)').then(console.log("successfully created doctor account"));

      // Insert into users
      await conn.request()
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, hashedPassword)
        .query('INSERT INTO Users (email, password) VALUES (@email, @password)').then("Successfully logged in as docotr");

      // Create Schedule table only once globally — don't create per doctor
      // You probably meant to insert a schedule record per doctor, not recreate the table
      await conn.request()
        .input('GivenName', sql.VarChar, GivenName)
        .input('Day', sql.VarChar, 'sunday')
        .input('Slot1', sql.Bit, true)
        .input('Slot2', sql.Bit, false)
        .query("INSERT INTO Schedule (GivenName,Day, Slot1, Slot2) VALUES (@GivenName,@Day, @Slot1, @Slot2)").then("successfully created defualt availability schedule for doctor");
      console.log("new users registered");
      res.send(" new user registered");
    }
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).send("Internal Server Error");
  }
}