const knex = require("../database/knex");

function makeProjectsService() {
    /**
     * Create a new project
     *
     * @param {*} payload: name, description, image, ownerId, memberIds
     * @returns
     */
    async function createProject(payload) {
        const { name, description, image, ownerId, memberIds } = payload;

        try {
            // Insert into Project table
            const [projectId] = await knex("Project").insert({
                name,
                description,
                image,
                ownerId,
            });

            // Insert into ProjectUser junction table
            if (memberIds && Array.isArray(memberIds) && memberIds.length > 0) {
                const projectUserInsert = memberIds.map((userId) => ({
                    projectId,
                    userId,
                }));
                await knex("ProjectUser").insert(projectUserInsert);
            }

            // Retrieve the created project with owner and members
            const createdProject = await knex("Project")
                .select(
                    "Project.id",
                    "Project.name",
                    "Project.description",
                    "Project.image",
                    "Project.ownerId as ownerId",
                    "User.name as ownerName",
                    "Project.createdAt",
                    "Project.updatedAt"
                )
                .leftJoin("User", "Project.ownerId", "User.id")
                .where("Project.id", projectId)
                .first();

            // Respond with the created project
            return createdProject;
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
                .select(
                    "Project.id",
                    "Project.name", // Specify the table name or alias for the 'name' column
                    "Project.description",
                    "Project.image",
                    "Project.ownerId as ownerId",
                    "User.name as ownerName",
                    "Project.createdAt",
                    "Project.updatedAt"
                )
                .leftJoin("User", "Project.ownerId", "User.id")
                .where("Project.id", projectId)
                .first();

            if (!project) {
                throw new Error("Project not found");
            }

            // Retrieve members associated with the project
            const members = await knex("ProjectUser")
                .select("User.id as memberId", "User.name as memberName")
                .leftJoin("User", "ProjectUser.userId", "User.id")
                .where("ProjectUser.projectId", projectId);

            // Add the 'members' property to the project
            project.members = members;

            return project;
        } catch (error) {
            console.error(error);
            // Rethrow the error or handle it accordingly
            throw new Error("Internal Server Error");
        }
    }

    /**
     * Retrieve projects by
     *
     * @returns
     */
    async function retrieveAllProjects() {
        try {
            // Retrieve all projects with owner details
            const projects = await knex("Project")
                .select(
                    "Project.id",
                    "Project.name", // Specify the table name or alias for the 'name' column
                    "Project.description",
                    "Project.image",
                    "Project.ownerId as ownerId",
                    "User.name as ownerName",
                    "Project.createdAt",
                    "Project.updatedAt"
                )
                .leftJoin("User", "Project.ownerId", "User.id");

            // Retrieve members for each project
            const projectsWithMembers = await Promise.all(
                projects.map(async (project) => {
                    const members = await knex("ProjectUser")
                        .select(
                            "User.id as memberId",
                            "User.name as memberName"
                        )
                        .leftJoin("User", "ProjectUser.userId", "User.id")
                        .where("ProjectUser.projectId", project.id);

                    // Add the 'members' property to each project
                    project.members = members;

                    return project;
                })
            );

            return projectsWithMembers;
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
    };
}

module.exports = makeProjectsService;
