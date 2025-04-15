const express=require('express');
const router=express.Router();

//main logic 
const controller= require('../controllers/auth.js');
const messaging= require('../controllers/messaging.js');


//all the routes 
// auth controller routes 
router.post('/register',controller.register);
router.post('/login',controller.login);


//DOCTOR FETCHING THE BOOKING FROM (APPOINTMENTS SERVICE ONLY)
router.get('/book/:doc',messaging.book);



//SCHEDULE FOR ALL DOCTOR   (DOCOTOR SERVICE ONLY)
router.get('/schedules',messaging.schedules);
//SCHEDULE FOR PARTICULAR DOCTOR
router.get('/schedule/:name',messaging.schedule);
//DOCTOR booking its schdeuLE (USING DOC SERVICE ONLY)
router.post('/schedule/:GivenName/:Day/:Slot1/:Slot2',messaging.BookSchedule);

module.exports=router;