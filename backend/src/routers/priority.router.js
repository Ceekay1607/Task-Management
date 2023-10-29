const express = require("express");
const priorityController = require("../controllers/priority.controller");
const router = express.Router();

const { methodNotAllowed } = require("../controllers/error");

router
    .route("/")
    .get(priorityController.retrieveAllPriority)
    .all(methodNotAllowed);

router
    .route("/:id")
    .get(priorityController.retrievePriority)
    .all(methodNotAllowed);

module.exports = router;
