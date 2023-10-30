const express = require("express");
const projectsController = require("../controllers/projects.controller");

const router = express.Router();

router
    .route("/")
    .get(projectsController.retrieveAllProjects)
    .post(projectsController.createProject);

router
    .route("/:id")
    .get(projectsController.retrieveProject)
    .delete(projectsController.deleteProject);

module.exports = router;
