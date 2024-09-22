const express = require('express');
const { createTask, getTasks, deleteTask, updateTask } = require('../controllers/taskController.js');
const { authenticateToken} = require('../middleware/tokenAuthentication.js');
const router = express.Router();

router.post('/:schedule_id/tasks',authenticateToken, createTask);

router.get('/:schedule_id/tasks',authenticateToken, getTasks);

router.delete('/:schedule_id/tasks/:task_id',authenticateToken, deleteTask);

router.put('/:schedule_id/tasks/:task_id',authenticateToken,updateTask);


module.exports = router;