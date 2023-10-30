const express = require("express");
const cors = require("cors");

const app = express();

const { resourceNotFound, handleError } = require("./controllers/errors");

app.use(cors());
app.use(express.json());

const categoryRouter = require("./routers/categories.router");
const priorityRouter = require("./routers/priorities.router");
const usersRouter = require("./routers/users.router");
const projectsRouter = require("./routers/projects.router");
const issueRouter = require("./routers/issues.router");

// Handle application response
app.use("/api/category", categoryRouter);
app.use("/api/priority", priorityRouter);
app.use("/api/user", usersRouter);
app.use("/api/project", projectsRouter);
app.use("/api/project/:projectId/issue", issueRouter);

// Handle 404 response
app.use(resourceNotFound);

// Define error-handling middleware last
app.use(handleError);

module.exports = app;
