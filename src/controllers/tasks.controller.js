const AppError = require("../utils/AppError");
const prisma = require("../prisma/client");

async function getAllTasks(req, res, next) {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: "asc" },
    });

    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
}

async function getTaskById(req, res, next){
  
     const id = Number(req.params.id)

     if(Number.isNaN(id)){
      
     return next(new AppError("Id invalido", 400))
     }

     try {
      const task = await prisma.task.findUnique({
        where: {id}
      });
  
      if(!task) {
  
     return next(new AppError("No existe la tarea", 404))
      }

     return res.status(200).json(task)

     } catch (err) {
       return next(err);
     }
}

async function createTask(req, res, next) {

   const {titulo} = req.body;
     
   if(!titulo || titulo.trim() === "") {
       
       return next(new AppError("El título es obligatorio", 400))
    }
    
    const cleanTitle = titulo.trim()

  try {
   const task = await prisma.task.create ({ 
    data: {titulo: cleanTitle}, 
  });

    return res.status(201).json(task)

    } catch (err) {
      return next(err)
    }
}

async function toggleTaskCompleted (req, res, next) {
     const id = Number(req.params.id)

     if (Number.isNaN(id)) {
      
      return next (new AppError( "Id invalido", 400))
     }

     try {
      const task = await prisma.task.findUnique({
        where: { id },
      });
      
      if (!task) {
        
       return next (new AppError("No existe la tarea", 404))
      }

      const newValue = !task.completada; 
      
      const updatedTask = await prisma.task.update ({
        where: {id}, 
        data: {completada : newValue},
      })

      return res.status(200).json(updatedTask)

    } catch (err){
      return next(err)
    }
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