const request = require('request');
const { db_connection, cont, db } = require('../DB/db');


//PATIENT USING((DOC SERVICE) TO CHECK THE AVAIALABILITY FOR PARTICULAR DOCTOR
exports.schedule = (req, res1) => {
  let name = req.params.name;
  request(`http://localhost:3000/schedule/${name}`, { json: true }, (err, res, body) => {
    if (err) {
      console.error("Error fetching schedule:", err);
      return res1.status(500).json({ message: "Failed to fetch schedule data", error: err });
    }

    // If schedule is empty or not found
    if (!body || body.length === 0) {
      return res1.status(404).json({ message: `No schedule found for doctor '${name}'` });
    }
    res1.send(body);
  });
};

//PATIENT USING (DOC SERVICE )FETCHING ALL THE SCHEDULE FOR ALL DOCTOR
exports.schedules = (req, res1) => {
  request('http://localhost:3000/schedules', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    res1.send(body);
  });
}

//booking the slot based upon the doctor
exports.book = (req, res1) => {
  let doc = req.params.doc;
  let day = req.params.day;
  let slot = req.params.slot;
  let patient_name=req.params.patient_name;
  request.post('http://localhost:8091/book/' + doc + '/' + day + '/' + slot+'/'+patient_name, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    res1.send(body);
  });

}  