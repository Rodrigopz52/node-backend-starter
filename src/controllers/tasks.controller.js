const { tasks } = require ('../store/tasks.store')

function getAllTasks(req, res) {
    res.json(tasks)
}

function getTaskByID(req, res){
    const id = tasks.find(task => task.id === parseInt((req.params.id)))

    if(!id){
        res.status(404).json({error: "tarea no existe"})
    }
    
    res.status(200).json(id)

}

module.exports = {
    getAllTasks,
    getTaskByID,
}