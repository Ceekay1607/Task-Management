const makeProjectsService = require("../services/projects.service");
const ApiError = require("../api-error");

async function createProject(req, res, next) {
    if (!req.body?.name || !req.body?.memberIds || !req.body?.ownerId) {
        return next(new ApiError(400, "Body can not be empty"));
    }

    try {
        const projectsService = makeProjectsService();
        const project = await projectsService.createProject(req.body);
        return res.send();
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the project")
        );
    }
}

async function retrieveProject(req, res, next) {
    try {
        const projectsService = makeProjectsService();
        const project = await projectsService.retrieveProject(req.params.id);
        return res.send(project);
    } catch (e) {
        console.log(e);
        return next(
            new ApiError(500, "An error occurred while retrieving the project")
        );
    }
}

async function retrieveAllProjects(req, res, next) {
    try {
        const projectsService = makeProjectsService();
        const project = await projectsService.retrieveAllProjects();
        return res.send(project);
    } catch (e) {
        console.log(e);
        return next(
            new ApiError(500, "An error occurred while retrieving the project")
        );
    }
}

module.exports = {
    createProject,
    retrieveProject,
    retrieveAllProjects,
};
