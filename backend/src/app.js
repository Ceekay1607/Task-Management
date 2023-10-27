const express = require("express");
const cors = require("cors");

const app = express();
const testRouter = require("./routers/testRouter");

const { resourceNotFound, handleError } = require("./controllers/error");

app.use(cors());
app.use(express.json());
app.use("/api/test", testRouter);

// Handle 404 response
app.use(resourceNotFound);

// Define error-handling middleware last
app.use(handleError);

app.get("/", (req, res) => {
    res.json({ message: "Hi I'm Kent" });
});

module.exports = app;
