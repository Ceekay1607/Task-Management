const express = require("express");
const issuesController = require("../controllers/issues.controller");

const router = express.Router({ mergeParams: true });

router.route("/").post(issuesController.createIssue);

router.route("/:number").get(issuesController.retrieveIssue);

module.exports = router;
