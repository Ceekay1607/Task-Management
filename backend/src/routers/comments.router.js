const express = require("express");
const commentsController = require("../controllers/comments.controller");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .post(commentsController.createComment)
    .get(commentsController.retrieveAllComments);

router.route("/:id").delete(commentsController.deleteComment);

module.exports = router;
