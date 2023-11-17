// projects.router.js
const express = require("express");
const { isAuthenticated } = require("../authMiddleware");
const projectsController = require("../controllers/projects.controller");

const router = express.Router();

router
    .route("/")
    .get(isAuthenticated, projectsController.retrieveAllProjects)
    .post(isAuthenticated, projectsController.createProject);

router
    .route("/:id")
    .get(isAuthenticated, projectsController.retrieveProject)
    .put(isAuthenticated, projectsController.updateProject)
    .delete(isAuthenticated, projectsController.deleteProject);

module.exports = router;
