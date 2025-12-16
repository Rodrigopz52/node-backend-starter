const tasksControllers = require("../controllers/tasks.controller");

const express  = require('express');
const router = express.Router();

router.get('/', tasksControllers.getAllTasks);

router.get('/:id', tasksControllers.getTaskByID);

router.post('/', tasksControllers.createTask);

router.patch('/:id', tasksControllers.toggleTaskCompleted)
 
router.delete('/:id', (req, res) => {
 const index = tasks.findIndex(task => task.id === parseInt(req.params.id))

 if (index === -1)

    return res.status(404).json ({Error: "No existe la tarea"})

const eliminadas = tasks.splice(index, 1);

res.status(200).json(eliminadas)

console.log(`Tarea eliminada`, eliminadas)
})

module.exports = router;