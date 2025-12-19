const express = require("express");
const tasksRoutes = require("./routes/tasks.routes");
const healthRoutes = require("./routes/health.routes");

const notFound = require("./middlewares/notFound")
const errorHandler = require("./middlewares/errorHandler")

const app = express();

app.use(express.json());

app.use("/tasks", tasksRoutes);
app.use("/health", healthRoutes);
app.use(notFound);
app.use(errorHandler);
module.exports = app;