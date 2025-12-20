const AppError = require("../utils/AppError");

function errorHandler(err, req, res, next) {
   
   let statusCode = 500;
   let message = "Internal Server Error";

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    
    console.error(err)

    return res.status(statusCode).json({error: message})

}

module.exports = errorHandler;