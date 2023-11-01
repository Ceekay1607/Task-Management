const ApiError = require("../api-error");
const knex = require("../database/knex");

function makeProjectsService() {
    function readProject(payload) {
        const project = {
            name: payload.name,
            description: payload.description,
            image: payload.image,
            ownerId: payload.ownerId,
        };

        Object.keys(project).forEach(
            (key) => project[key] === undefined && delete project[key]
        );

        return project;
    }

    /**
     * Create a new project
     *
     * @param {*} payload: name, description, image, ownerId, memberIds
     * @returns
     */
    async function createProject(payload) {
        const project = readProject(payload);
        const memberIds = payload.memberIds;

        memberIds.push(payload.ownerId);

        try {
            // Insert into Project table
            const [projectId] = await knex("Project").insert(project);

            // Insert into ProjectUser junction table
            if (memberIds && Array.isArray(memberIds) && memberIds.length > 0) {
                const projectUserInsert = memberIds.map((userId) => ({
                    projectId,
                    userId,
                }));
                await knex("ProjectUser").insert(projectUserInsert);
            }

            project.memberIds = memberIds;

            // Respond with the created project
            return { projectId, ...project };
        } catch (error) {
            console.error(error);
            // Rethrow the error or handle it accordingly
            throw new Error("Internal Server Error");
        }
    }

    /**
     * Retrieve a project by ID
     *
     * @param {*} projectId
     * @returns
     */
    async function retrieveProject(projectId) {
        try {
            // Retrieve the project with owner and members
            const project = await knex("Project")
                .select("*")
                .leftJoin("User", "Project.ownerId", "User.id")
                .where("Project.id", projectId)
                .first();

            if (!project) {
                return new ApiError(404, "Project not found");
            }

            // Retrieve members associated with the project
            const members = await knex("ProjectUser")
                .select("User.id as memberId", "User.name as memberName")
                .leftJoin("User", "ProjectUser.userId", "User.id")
                .where("ProjectUser.projectId", projectId);

            // Add the 'members' property to the project
            project.members = members;

            // Retrieve issues associated with the project
            const issues = await knex("Issue")
                .select("*")
                .where("projectId", projectId);

            // Add the 'issues' property to each project
            project.issues = issues;

            return project;
        } catch (error) {
            console.error(error);
            // Rethrow the error or handle it accordingly
            throw new Error("Internal Server Error");
        }
    }

    /**
     * Retrieve all projects with members and issues
     *
     * @returns
     */
    async function retrieveAllProjects() {
        try {
            // Retrieve unique project IDs
            const projectIds = await knex("Project").select("id");

            // Retrieve members and issues for each project
            const projectsWithMembers = await Promise.all(
                projectIds.map(async ({ id }) => {
                    // Retrieve project details
                    const project = await knex("Project as P")
                        .select(
                            "P.id as projectId",
                            "P.name as projectName",
                            "P.description as projectDescription",
                            "P.image as projectImage",
                            "P.ownerId as projectOwnerId",
                            "U.name as ownerName",
                            "P.createdAt as projectCreatedAt",
                            "P.updatedAt as projectUpdatedAt"
                        )
                        .leftJoin("User as U", "P.ownerId", "U.id")
                        .where("P.id", id)
                        .first();

                    // Retrieve members associated with the project
                    const members = await knex("ProjectUser as PU")
                        .select("U.id as memberId", "U.name as memberName")
                        .leftJoin("User as U", "PU.userId", "U.id")
                        .where("PU.projectId", id);

                    // Add the 'members' property to the project
                    project.members = members;

                    return project;
                })
            );

            return projectsWithMembers;
        } catch (error) {
            console.error(error);
            // Rethrow the error or handle it accordingly
            throw new ApiError(500, "Internal Server Error");
        }
    }

    /**
     * Delete project by ID
     *
     * @param {*} projectId
     * @returns
     */
    async function deleteProject(projectId) {
        try {
            // Delete project from Project table
            const deleteCount = await knex("Project")
                .where("id", projectId)
                .del();

            if (deleteCount === 0) {
                // If no project was deleted, throw an error
                return new ApiError(404, "Project not found");
            }

            // Delete project-user relationships from ProjectUser table
            await knex("ProjectUser").where("projectId", projectId).del();

            return { success: true, message: "Project deleted successfully" };
        } catch (error) {
            console.error(error);
            // Rethrow the error or handle it accordingly
            throw new Error("Internal Server Error");
        }
    }

    return {
        createProject,
        retrieveProject,
        retrieveAllProjects,
        deleteProject,
    };
}

module.exports = makeProjectsService;
