const makeProjectsService = require("../services/projects.service");
const ApiError = require("../api-error");

async function createProject(req, res, next) {
    if (!req.body?.name || !req.body?.memberIds || !req.body?.ownerId) {
        return next(new ApiError(400, "Body can not be empty"));
    }

    try {
        const projectsService = makeProjectsService();
        const project = await projectsService.createProject(req.body);

        return res.send(project);
    } catch (e) {
        console.log(e);
        return next(e);
    }
}

async function retrieveProject(req, res, next) {
    try {
        const projectsService = makeProjectsService();
        const project = await projectsService.retrieveProject(req.params.id);

        return res.send(project);
    } catch (e) {
        console.log(e);
        return next(e);
    }
}

async function retrieveAllProjects(req, res, next) {
    try {
        // userId is required
        if (!req.body.userId) {
            throw new ApiError(400, "Missing userId in the request body");
        }

        const userId = req.body.userId;

        const projectsService = makeProjectsService();
        const projects = await projectsService.retrieveProjectsBelongToUser(
            userId
        );

        if (projects.length === 0) {
            throw new ApiError(404, "No projects found for the specified user");
        }

        return res.json(projects);
    } catch (error) {
        console.error(error);

        return res.status(error.statusCode || 500).json({
            error: {
                message: error.message || "Internal Server Error",
                statusCode: error.statusCode || 500,
            },
        });
    }
}

async function deleteProject(req, res, next) {
    try {
        const projectsService = makeProjectsService();
        const project = await projectsService.deleteProject(req.params.id);

        return res.send(project);
    } catch (e) {
        console.log(e);
        return next(e);
    }
}

module.exports = {
    createProject,
    retrieveProject,
    retrieveAllProjects,
    deleteProject,
};
