const sql = require('mssql');
const request = require('request');
const { db_connection, db } = require('../DB/DB.JS');


//FETCHING SCHEDULE BASED UPON DOC NAME (DOC SERVICE ONLY)
exports.schedule = async (req, res) => {
  const con = await db_connection();
  let docName = await req.params.name;
  const result = await con.request().input('docName', sql.VarChar, docName).query("SELECT * FROM Schedule WHERE GivenName = @docName")
  res.send(result.recordset);
}
exports.BookSchedule = async (req, res) => {
  const con = await db_connection();
  let GivenName = await req.params.GivenName;
  let Day = await req.params.Day;
  let Slot1 = await req.params.Slot1;
  let Slot2 = await req.params.Slot2;
  const result = await con.request().input('GivenName', sql.VarChar, GivenName).input('Day', sql.VarChar, Day).input('Slot1', sql.VarChar, Slot1).input('Slot2', sql.VarChar, Slot2).query("INSERT INTO Schedule (GivenName, Day, Slot1, Slot2) VALUES (@GivenName, @Day, @Slot1, @Slot2)")
  console.log("created doc new schedule");
  res.send(result.recordset);
}
//SCHEDULE FOR ALL THE DOCTOR  (DOCTOR SERVICE ONLY)
exports.schedules = async (req, res) => {
  const con = await db_connection();
  let docName = await req.params.name;
  const result = await con.request().query("SELECT * FROM Schedule")
  res.send(result.recordset);
}


//doctor fetching patient booking  (APPOINTMENT SERVICE)
exports.book = (req, res1) => {
  const doc = req.params.doc;
  request.get('http://localhost:8091/book/' + doc, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log("Fecthed all appointment from  appointments microservice");
    res1.send(body);
  });
}
