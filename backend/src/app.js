require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("./auth");
const cors = require("cors");

const app = express();

const { resourceNotFound, handleError } = require("./controllers/errors");
const store = session.Cookie();

app.use(cors());
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store,
    })
);

app.use(passport.initialize());
app.use(passport.session());

const { isAuthenticated } = require("./authMiddleware");

//Handle authentication
const authRouter = require("./routers/auth.router");
app.use("/api/auth", authRouter);

const categoryRouter = require("./routers/categories.router");
const priorityRouter = require("./routers/priorities.router");
const usersRouter = require("./routers/users.router");
const projectsRouter = require("./routers/projects.router");
const issuesRouter = require("./routers/issues.router");
const commentsRouter = require("./routers/comments.router");
const { fa } = require("@faker-js/faker");

// Handle application response
app.use("/api/category", categoryRouter);
app.use("/api/priority", priorityRouter);
app.use("/api/user", usersRouter);
app.use("/api/project", projectsRouter);
app.use("/api/project/:projectId/issue", issuesRouter);
app.use("/api/project/:projectId/issue/:issueNumber/comment", commentsRouter);

// Handle 404 response
app.use(resourceNotFound);

// Define error-handling middleware last
app.use(handleError);

module.exports = app;
