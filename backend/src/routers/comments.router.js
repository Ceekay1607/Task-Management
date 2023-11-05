const express = require("express");
const { isAuthenticated } = require("../authMiddleware");
const commentsController = require("../controllers/comments.controller");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .post(isAuthenticated, commentsController.createComment)
    .get(isAuthenticated, commentsController.retrieveAllComments);

router.route("/:id").delete(commentsController.deleteComment);

module.exports = router;
