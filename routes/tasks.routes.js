const express  = require('express');
const router = express.Router();

const tasks = [

    {id: 1, titulo: "Aprender a programar", completada: false},
    {id: 2, titulo: "Manejar backend y frontend", completada: false},
    {id: 3, titulo: "Conseguir trabajo", completada: false}
]

router.get('/', (req, res) => {
    res.json({tasks});
});

router.get('/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ Error: "Tarea no existe"})
    }
     res.json(task)
})

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