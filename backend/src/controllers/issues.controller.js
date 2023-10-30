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
        return next(error);
    }
}

async function retrieveIssue(req, res, next) {
    const { projectId, number } = req.params;
    try {
        const issuesService = makeIssuesService();
        const issue = await issuesService.retrieveIssue(projectId, number);
        res.json(issue);
    } catch (error) {
        return next(error);
    }
}

async function retrieveAllIssues(req, res, next) {
    try {
        const issuesService = makeIssuesService();
        const issues = await issuesService.retrieveAllIssues(
            req.params.projectId
        );

        return res.send(issues);
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

async function deleteIssue(req, res, next) {
    try {
        const { projectId, number } = req.params;
        const issuesService = makeIssuesService();
        const issue = await issuesService.deleteIssue(projectId, number);

        return res.send(issue);
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

module.exports = {
    createIssue,
    retrieveIssue,
    retrieveAllIssues,
    deleteIssue,
};
