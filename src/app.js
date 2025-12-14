const express = require('express');

const app = express();

app.use(express.json());

const tasks = [

    {id: 1, titulo: "Aprender a programar", completada: false},
    {id: 2, titulo: "Manejar backend y frontend", completada: false},
    {id: 3, titulo: "Conseguir trabajo", completada: false}
]

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.get('/tasks', (req, res) => {
    res.json({tasks});
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(task => tasks.id === parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ Error: "Tarea no existe"})
    }
     res.json(task)
})

app.post('/tasks', (req, res) => {
    const {titulo} = req.body;

    if (!titulo) {
        return res.status(400).json ({ Error: "Titulo no existe"})
    }

   const nuevoId = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;

   const nuevaTask = {id : nuevoId, titulo: titulo, completada: false}

    tasks.push(nuevaTask)
    
    res.status(201).json(nuevaTask)
})

app.patch('/tasks/:id', (req, res) => {
const taskCompletada = tasks.find(task => task.id === parseInt(req.params.id));

if (!taskCompletada) {
    return res.status(404).json ({Error: "No existe la tarea"})
}

 taskCompletada.completada = !taskCompletada.completada;

    res.status(200).json(taskCompletada)

})
 
app.delete('/tasks/:id', (req, res) => {
 const index = tasks.findIndex(task => task.id === parseInt(req.params.id))

 if (index === -1)

    return res.status(404).json ({Error: "No existe la tarea"})

const eliminadas = tasks.splice(index, 1);

res.status(200).json(eliminadas)

console.log(`Tarea eliminada`, eliminadas)
})

module.exports = app;