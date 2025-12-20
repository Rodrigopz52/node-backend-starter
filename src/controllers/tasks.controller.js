const { tasks } = require ('../store/tasks.store')
const AppError = require("../utils/AppError");

function getAllTasks(req, res) {
    res.json(tasks)
}

function getTaskById(req, res, next){

    const id = Number(req.params.id)

    if(Number.isNaN(id)){
        
    return next (new AppError("Id invalido", 400))
    }
    
    const task = tasks.find(t => t.id === id)

    if(!task) {

    return next (new AppError("No existe la tarea", 404))
    }

    res.status(200).json(task)
}

function createTask(req, res) {
    const {titulo} = req.body;
     
    if(!titulo) {

        return res.status(400).json({Error: "Titulo no existe"})
    }
    const newId = tasks.length === 0 ? 1 : tasks[tasks.length -1].id + 1;
    
    const newTask = {id : newId, titulo : titulo, completada : false}
    
    tasks.push(newTask)

    res.status(201).json(newTask)
}

function toggleTaskCompleted (req, res) {
     const taskCompleted = tasks.find(task => task.id === parseInt(req.params.id))

     if (!taskCompleted){
        return res.status(404).json({Error: "No existe la tarea"})
     }

     taskCompleted.completada = !taskCompleted.completada;
    
     res.status(200).json(taskCompleted)
}

function deleteTask (req, res) {

    const id = Number(req.params.id)

    if (Number.isNaN(id)) {

        return res.status(400).json({error: "Id invalido"})
    }

    const taskIndex = tasks.findIndex(t => t.id === id)

    if (taskIndex === -1) {

        return  res.status(404).json({error: "No existe la tarea."})
    }
    
    const deletedTasks = tasks.splice(taskIndex, 1);
    
    const deletedTask = deletedTasks[0];

    return  res.status(200).json({ message: "Tarea eliminada", task: deletedTask})
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    toggleTaskCompleted,
    deleteTask,
}