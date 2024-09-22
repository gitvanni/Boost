const express = require('express');
const { createDiary, getDiaries,  deleteDiary } = require('../controllers/diaryController.js');
const { authenticateToken} = require('../middleware/tokenAuthentication.js')

const router = express.Router();

router.post('/', authenticateToken,createDiary);

router.delete('/:id', authenticateToken,deleteDiary);

router.get('/',authenticateToken,getDiaries);

module.exports = router;