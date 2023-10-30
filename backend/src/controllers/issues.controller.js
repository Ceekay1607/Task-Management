const makeIssuesService = require("../services/issues.service");
const ApiError = require("../api-error");

async function createIssue(req, res, next) {
    const projectId = req.params.projectId;

    if (
        !req.body ||
        !req.body.name ||
        !req.body.reporterId ||
        !req.body.assigneeId
    ) {
        return next(new ApiError(400, "Invalid issue data"));
    }

    try {
        const issuesService = makeIssuesService();
        const issue = await issuesService.createIssue({
            projectId,
            ...req.body,
        });
        return res.status(201).json(issue);
    } catch (error) {
        console.error(error);
        if (error.message === "Project not found") {
            return next(new ApiError(404, "Project not found"));
        } else {
            return next(
                new ApiError(500, "An error occurred while creating the issue")
            );
        }
    }
}

async function retrieveIssue(req, res, next) {
    const { projectId, number } = req.params;
    try {
        const issuesService = makeIssuesService();
        const issue = await issuesService.retrieveIssue(projectId, number);
        res.json(issue);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createIssue,
    retrieveIssue,
};
