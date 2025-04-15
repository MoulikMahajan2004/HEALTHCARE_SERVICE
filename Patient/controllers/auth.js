const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db_connection } = require('../DB/db');
const sql = require('mssql'); // ✅ You need this for sql.VarChar

// LOGIN CONTROLLER
exports.login = async (req, res) => {
  try {
    let email = 'patient@gmail.com';
    let pass = '1234';

    const con = await db_connection();

    const result = await con
      .request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');

    if (!result.recordset.length) {
      console.log('❌ User not found');
      return res.send('Login failed');
    }

    const user = result.recordset[0];
    const passwordMatch = await bcrypt.compare(pass, user.password);

    if (!passwordMatch) {
      console.log('❌ Incorrect password');
      return res.send('Login failed');
    }

    const token = jwt.sign({ id: user.id }, 'secret', {
      expiresIn: '90d',
    });

    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    console.log('✅ Login successful');
    res.send('Login successful');
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).send('Internal Server Error');
  }
};

// REGISTER CONTROLLER
exports.register = async (req, res) => {
  try {
    const con = await db_connection();

    let email = 'patient@gmail.com';
    let pass = '1234';
    let GivenName = 'youssef';
    let phone = '01115349974';

    const check = await con
      .request()
      .input('email', sql.VarChar, email)
      .query('SELECT email FROM Users WHERE email = @email');

    if (check.recordset.length > 0) {
      console.log('⚠️ User already exists');
      return res.send('User is already registered');
    }

    const hashedPassword = await bcrypt.hash(pass, 8);

    // Insert into Patients
    await con
      .request()
      .input('GivenName', sql.VarChar, GivenName)
      .input('email', sql.VarChar, email)
      .input('phone', sql.VarChar, phone)
      .query(
        'INSERT INTO Patients (GivenName, email, phone) VALUES (@GivenName, @email, @phone)'
      );

    // Insert into Users
    await con
      .request()
      .input('email', sql.VarChar, email)
      .input('pass', sql.VarChar, hashedPassword)
      .query(
        'INSERT INTO Users (email, password) VALUES (@email, @pass)'
      );

    console.log('✅ Registration successful');
    res.send('Registered');
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).send('Internal Server Error');
  }
};
