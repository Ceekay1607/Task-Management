const express = require("express");
const cors = require("cors");

const app = express();

const { resourceNotFound, handleError } = require("./controllers/error");

app.use(cors());
app.use(express.json());

const categoryRouter = require("./routers/category.router");

app.use("/api/category", categoryRouter);

// Handle 404 response
app.use(resourceNotFound);

// Define error-handling middleware last
app.use(handleError);

module.exports = app;
