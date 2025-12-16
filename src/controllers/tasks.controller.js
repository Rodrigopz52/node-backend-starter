const { tasks } = require ('../store/tasks.store')

function getAllTasks(req, res) {
    res.json(tasks)
}

function getTaskByID(req, res){
    const id = tasks.find(task => task.id === parseInt((req.params.id)))

    if(!id){

      return res.status(404).json({error: "tarea no existe"})
    }
    
    res.status(200).json(id)
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
     const id = tasks.find(task => task.id === parseInt(req.params.id))

     if (!id){
        return res.status(400).json({Error: "No existe la tarea"})
     }

     id.completada = !id.completada;

     res.status(200).json(id)
}

module.exports = {
    getAllTasks,
    getTaskByID,
    createTask,
    toggleTaskCompleted,
}