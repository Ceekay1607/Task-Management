const makeProjectsService = require("../services/projects.service");
const ApiError = require("../api-error");

async function createProject(req, res, next) {
    const { name, description, image, memberEmails } = req.body;

    if (!name) {
        return next(new ApiError(400, "Name is required"));
    }

    try {
        const projectsService = makeProjectsService();
        const project = await projectsService.createProject({
            name,
            description,
            image,
            memberEmails,
            ownerId: req.user.id,
            ownerEmail: req.user.email,
        });

        return res.send(project);
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

async function retrieveProject(req, res, next) {
    try {
        const projectsService = makeProjectsService();
        const project = await projectsService.retrieveProject(req.params.id);

        return res.send(project);
    } catch (e) {
        console.error(error);

        return res.status(error.statusCode || 500).json({
            error: {
                message: error.message || "Internal Server Error",
                statusCode: error.statusCode || 500,
            },
        });
    }
}

async function retrieveAllProjects(req, res, next) {
    try {
        const userId = req.user.id;

        const projectsService = makeProjectsService();
        const projects = await projectsService.retrieveProjectsBelongToUser(
            userId
        );

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

async function updateProject(req, res, next) {
    try {
        const projectsService = makeProjectsService();
        const updated = await projectsService.updateProject(
            req.params.id,
            req.body
        );
        console.log(updated);
        return res.send({ message: "Project was updated successfully" });
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
        console.error(error);

        return res.status(error.statusCode || 500).json({
            error: {
                message: error.message || "Internal Server Error",
                statusCode: error.statusCode || 500,
            },
        });
    }
}

module.exports = {
    createProject,
    retrieveProject,
    retrieveAllProjects,
    updateProject,
    deleteProject,
};
