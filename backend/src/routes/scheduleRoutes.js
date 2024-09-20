const express = require('express');
const { createSchedule, getSchedules, deleteSchedule} = require('../controllers/scheduleController.js');
const { authenticateToken} = require('../middleware/tokenAuthentication.js');

const router = express.Router();

// Create a new schedule
router.post('/', authenticateToken,createSchedule);

// Get all schedules for the given user
//router.get('/:user_id', getSchedules);

//Deletes the schedule with the given id
router.delete('/:id',authenticateToken, deleteSchedule);

router.get('/',authenticateToken,getSchedules);

module.exports = router;
