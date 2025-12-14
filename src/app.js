const express = require("express");
const tasksRoutes = require("../routes/tasks.routes");
const healthRoutes = require("../routes/health.routes");

const app = express();

app.use(express.json());

app.use("/tasks", tasksRoutes);
app.use("/health", healthRoutes);
module.exports = app;