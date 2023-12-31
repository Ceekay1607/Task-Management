const ApiError = require("../api-error");
const knex = require("../database/knex");
const { faker } = require("@faker-js/faker");

function makeProjectsService() {
    function readProject(payload) {
        const project = {
            name: payload.name,
            description: payload.description,
            image: payload?.image ?? faker.image.urlLoremFlickr(),
            ownerId: payload.ownerId,
        };

        Object.keys(project).forEach(
            (key) => project[key] === undefined && delete project[key]
        );

        return project;
    }

    /**
     * Create new project
     *
     * @param {*} payload {name, description, image, ownerId, memberEmails}
     * @returns
     */
    async function createProject(payload) {
        const project = readProject(payload);
        const ownerEmail = payload.ownerEmail;
        const ownerId = payload.ownerId;

        try {
            const [projectId] = await knex("Project").insert(project);

            // Add owner to the ProjectUser table
            await knex("ProjectUser").insert({
                projectId,
                userId: ownerId,
            });

            // Check if memberEmails are present in payload
            if (
                payload.memberEmails &&
                Array.isArray(payload.memberEmails) &&
                payload.memberEmails.length > 0
            ) {
                // Check if owner email is in memberEmails
                const isOwnerIncluded =
                    payload.memberEmails.includes(ownerEmail);

                if (isOwnerIncluded) {
                    // Remove owner email from memberEmails to avoid duplication
                    payload.memberEmails = payload.memberEmails.filter(
                        (email) => email !== ownerEmail
                    );
                }

                // Add other members to the ProjectUser table
                await handleProjectMembers(projectId, payload.memberEmails);
            }

            return { projectId, ...project };
        } catch (error) {
            console.error(error);
            if (error instanceof ApiError) {
                // Re-throw the ApiError for specific cases
                throw error;
            } else {
                throw new ApiError(500, "Internal Server Error");
            }
        }
    }

    async function handleProjectMembers(projectId, memberEmails) {
        const notFoundEmails = [];

        for (const email of memberEmails) {
            try {
                const member = await knex("user")
                    .select("id")
                    .where("email", email)
                    .first();

                if (!member) {
                    console.log(`User with email ${email} not found`);
                    // Add the email to the notFoundEmails array
                    notFoundEmails.push(email);
                    continue;
                }

                const isMember = await knex("projectuser")
                    .select("*")
                    .where("userId", member.id)
                    .where("projectId", projectId)
                    .first();
                // Add member to the ProjectUser table
                if (!isMember) {
                    // Add member to the ProjectUser table
                    await knex("ProjectUser").insert({
                        projectId: projectId,
                        userId: member.id,
                    });
                }
            } catch (error) {
                console.error(
                    `Error processing email ${email}: ${error.message}`
                );
                // Handle the error gracefully, log it, and continue with the next email
                continue;
            }
        }

        // If there are emails not found, throw ApiError
        if (notFoundEmails.length > 0) {
            throw new ApiError(
                404,
                `Users not found with emails: ${notFoundEmails.join(", ")}`
            );
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
                    "Project.name as name",
                    "Project.description as description",
                    "user.id as ownerId",
                    "user.name as ownerName",
                    "user.email as ownerEmail"
                )
                .leftJoin("User", "Project.ownerId", "User.id")
                .where("Project.id", projectId)
                .first();

            if (!project) {
                throw new ApiError(404, "Project not found");
            }

            // Retrieve members associated with the project
            const members = await knex("ProjectUser")
                .select("User.email as memberEmail")
                .leftJoin("User", "ProjectUser.userId", "User.id")
                .where("ProjectUser.projectId", projectId);

            // Add the 'members' property to the project
            project.members = members;

            // Retrieve issues associated with the project
            const issues = await knex("Issue")
                .select(
                    "Issue.id",
                    "Issue.number",
                    "Issue.name as issueName",
                    "Issue.description as issueDescription",
                    "UserReporter.name as reporterName",
                    "UserReporter.email as reporterEmail",
                    "UserAssignee.name as assigneeName",
                    "UserAssignee.email as assigneeEmail",
                    "Priority.name as priorityName",
                    "Issue.createdAt",
                    "Issue.updatedAt"
                )
                .leftJoin(
                    "User as UserReporter",
                    "Issue.reporterId",
                    "UserReporter.id"
                )
                .leftJoin(
                    "User as UserAssignee",
                    "Issue.assigneeId",
                    "UserAssignee.id"
                )
                .leftJoin("Priority", "Issue.priorityId", "Priority.id")
                .where("Issue.projectId", projectId);

            // Add the 'issues' property to each project
            project.issues = issues;

            return project;
        } catch (error) {
            console.error(error);
            // Rethrow the error or handle it accordingly
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, "Internal Server Error");
            }
        }
    }

    /**
     * Retrieve all projects with members and issues
     *
     * @param {*} userId
     * @returns
     */
    async function retrieveProjectsBelongToUser(userId) {
        try {
            // Retrieve unique project IDs associated with the user
            const projectIds = await knex("ProjectUser")
                .select("projectId")
                .where("userId", userId);

            // Retrieve details for each project
            const projectsWithMembers = await Promise.all(
                projectIds.map(async ({ projectId }) => {
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
                        .where("P.id", projectId)
                        .first();

                    // Retrieve members associated with the project
                    const members = await knex("ProjectUser as PU")
                        .select(
                            "U.name as memberName",
                            "U.email as memberEmail"
                        )
                        .leftJoin("User as U", "PU.userId", "U.id")
                        .where("PU.projectId", projectId);

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
     *
     * @param {*} id
     * @param {*} payload
     * @returns
     */

    async function updateProject(projectId, payload) {
        try {
            const project = {
                name: payload.name,
                description: payload.description,
            };
            const updated = await knex("Project")
                .where("id", projectId)
                .update(project);

            if (
                payload.memberEmails &&
                Array.isArray(payload.memberEmails) &&
                payload.memberEmails.length > 0
            ) {
                // Add other members to the ProjectUser table
                await handleProjectMembers(projectId, payload.memberEmails);
            }

            return updated;
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
        retrieveProjectsBelongToUser,
        updateProject,
        deleteProject,
    };
}

module.exports = makeProjectsService;
