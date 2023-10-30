const express = require("express");
const issuesController = require("../controllers/issues.controller");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .post(issuesController.createIssue)
    .get(issuesController.retrieveAllIssues);

router
    .route("/:id")
    .get(issuesController.retrieveIssue)
    .delete(issuesController.deleteIssue);

module.exports = router;
