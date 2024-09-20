const express = require('express');
const { createDiary, getDiaries,  deleteDiary } = require('../controllers/diaryController.js');
const { authenticateToken} = require('../middleware/tokenAuthentication.js')

const router = express.Router();

// Create a new schedule
router.post('/', authenticateToken,createDiary);

// Get all schedules for the given user
//router.get('/:user_id', getDiariesSchedules);

//Deletes the schedule with the given id
router.delete('/:id', authenticateToken,deleteDiary);

router.get('/',authenticateToken,getDiaries);

module.exports = router;