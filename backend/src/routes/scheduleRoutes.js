const express = require('express');
const { createSchedule, getSchedules, deleteSchedule} = require('../controllers/scheduleController.js');
const { authenticateToken} = require('../middleware/tokenAuthentication.js');

const router = express.Router();

router.post('/', authenticateToken,createSchedule);

router.delete('/:id',authenticateToken, deleteSchedule);

router.get('/',authenticateToken,getSchedules);

module.exports = router;
