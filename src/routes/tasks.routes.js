const tasksControllers = require("../controllers/tasks.controller");

const express  = require('express');
const router = express.Router();

router.get('/', tasksControllers.getAllTasks);

router.get('/:id', tasksControllers.getTaskById);

router.post('/', tasksControllers.createTask);

router.patch('/:id', tasksControllers.toggleTaskCompleted)
 
router.delete('/:id', tasksControllers.deleteTask)

module.exports = router;