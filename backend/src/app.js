const express = require("express");
const cors = require("cors");

const app = express();

const { resourceNotFound, handleError } = require("./controllers/error");

app.use(cors());
app.use(express.json());

const categoryRouter = require("./routers/category.router");
const priorityRouter = require("./routers/priority.router");
const usersRouter = require("./routers/users.router");

//Handle applicaiton response
app.use("/api/category", categoryRouter);
app.use("/api/priority", priorityRouter);
app.use("/api/user", usersRouter);

// Handle 404 response
app.use(resourceNotFound);

// Define error-handling middleware last
app.use(handleError);

module.exports = app;
