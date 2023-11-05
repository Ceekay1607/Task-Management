const makeCommentsService = require("../services/comments.service");
const ApiError = require("../api-error");

async function createComment(req, res, next) {
    if (!req.body || !req.body.content) {
        return next(new ApiError(400, "Body cannot be empty"));
    }

    const userId = req.user.id;

    try {
        const projectId = req.params.projectId;
        const issueNumber = req.params.issueNumber;
        const commentsService = makeCommentsService();
        const comment = await commentsService.createComment({
            projectId,
            issueNumber,
            userId,
            ...req.body,
        });

        return res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

async function retrieveAllComments(req, res, next) {
    try {
        const { projectId, issueNumber } = req.params;
        const commentsService = makeCommentsService();
        const comments = await commentsService.retrieveAllComments(
            projectId,
            issueNumber
        );

        return res.send(comments);
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

async function deleteComment(req, res, next) {
    try {
        const commentId = req.params.id;
        const projectId = req.params.projectId;
        const issueNumber = req.params.issueNumber;
        const commentsService = makeCommentsService();
        const deletedComment = await commentsService.deleteComment({
            projectId,
            issueNumber,
            commentId,
        });

        return res.send(deletedComment);
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

module.exports = {
    createComment,
    retrieveAllComments,
    deleteComment,
};
