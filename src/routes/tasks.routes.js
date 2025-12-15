const tasksControllers = require("../controllers/tasks.controller");

const express  = require('express');
const router = express.Router();

router.get('/', tasksControllers.getAllTasks);

router.get('/:id', tasksControllers.getTaskByID);

router.post('/', (req, res) => {
    const {titulo} = req.body;

    if (!titulo) {
        return res.status(400).json ({ Error: "Titulo no existe"})
    }

   const nuevoId = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;
   
   const nuevaTask = {id : nuevoId, titulo: titulo, completada: false}

    tasks.push(nuevaTask)
    
    res.status(201).json(nuevaTask)
})

router.patch('/:id', (req, res) => {
const taskCompletada = tasks.find(task => task.id === parseInt(req.params.id));

if (!taskCompletada) {
    return res.status(404).json ({Error: "No existe la tarea"})
}

 taskCompletada.completada = !taskCompletada.completada;

    res.status(200).json(taskCompletada)

})
 
router.delete('/:id', (req, res) => {
 const index = tasks.findIndex(task => task.id === parseInt(req.params.id))

 if (index === -1)

    return res.status(404).json ({Error: "No existe la tarea"})

const eliminadas = tasks.splice(index, 1);

res.status(200).json(eliminadas)

console.log(`Tarea eliminada`, eliminadas)
})

module.exports = router;