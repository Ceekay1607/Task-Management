const express = require("express");
const issuesController = require("../controllers/issues.controller");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .post(issuesController.createIssue)
    .get(issuesController.retrieveAllIssues);

router
    .route("/:number")
    .get(issuesController.retrieveIssue)
    .delete(issuesController.deleteIssue)
    .put(issuesController.updateIssueController);

module.exports = router;
