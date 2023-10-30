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
        const projectsService = makeProjectsService();
        const project = await projectsService.retrieveAllProjects();

        return res.send(project);
    } catch (e) {
        console.log(e);
        return next(e);
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
