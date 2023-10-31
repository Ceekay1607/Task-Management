const makeCommentsService = require("../services/comments.service");
const ApiError = require("../api-error");

async function createComment(req, res, next) {
    if (!req.body || !req.body.userId || !req.body.content) {
        return next(new ApiError(400, "Invalid comment data"));
    }

    try {
        const projectId = req.params.projectId;
        const issueNumber = req.params.issueNumber;
        const commentsService = makeCommentsService();
        const comment = await commentsService.createComment({
            projectId,
            issueNumber,
            ...req.body,
        });

        return res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

module.exports = {
    createComment,
};
