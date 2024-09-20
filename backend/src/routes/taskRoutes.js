const express = require('express');
const { createTask, getTasks, getTask, deleteTask, updateTask } = require('../controllers/taskController.js');
const { authenticateToken} = require('../middleware/tokenAuthentication.js');
const router = express.Router();

// Create a new task
router.post('/:schedule_id/tasks',authenticateToken, createTask);

// Get all tasks for the given schedule
router.get('/:schedule_id/tasks',authenticateToken, getTasks);

//get the task with the associated id for the given schedule
router.get('/:schedule_id/tasks/:task_id', authenticateToken,getTask)

//Deletes the task with the given id
router.delete('/:schedule_id/tasks/:task_id',authenticateToken, deleteTask);

//router.put('/:id',updateTaskStatus);

router.put('/:schedule_id/tasks/:task_id',authenticateToken,updateTask);


module.exports = router;