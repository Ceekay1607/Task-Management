const express = require("express");
const { isAuthenticated } = require("../authMiddleware");
const issuesController = require("../controllers/issues.controller");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .post(isAuthenticated, issuesController.createIssue)
    .get(isAuthenticated, issuesController.retrieveAllIssues);

router
    .route("/:number")
    .get(isAuthenticated, issuesController.retrieveIssue)
    .delete(isAuthenticated, issuesController.deleteIssue)
    .put(isAuthenticated, issuesController.updateIssueController);

module.exports = router;
