const express = require("express");
const priorityController = require("../controllers/priorities.controller");
const router = express.Router();

const { methodNotAllowed } = require("../controllers/errors");

router
    .route("/")
    .get(priorityController.retrieveAllPriority)
    .all(methodNotAllowed);

router
    .route("/:id")
    .get(priorityController.retrievePriority)
    .all(methodNotAllowed);

module.exports = router;
