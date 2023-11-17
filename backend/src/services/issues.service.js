const ApiError = require("../api-error");
const knex = require("../database/knex");

function makeIssuesService() {
    async function getUserIdByEmail(email) {
        const user = await knex("User")
            .select("id")
            .where("email", email)
            .first();
        return user ? user.id : null;
    }

    function getCategoryId(category) {
        if (!category) return 1;
        else {
            return knex("Category").select("id").where("name", category);
        }
    }

    function getPriorityId(priority) {
        if (!priority) return 1;
        else {
            return knex("Priority").select("id").where("name", priority);
        }
    }

    function readIssue(payload) {
        const issue = {
            projectId: payload.projectId,
            categoryId: getCategoryId(payload.category),
            name: payload.name,
            description: payload.description,
            reporterEmail: payload.reporterEmail,
            assigneeEmail: payload.assigneeEmail,
            priorityId: getPriorityId(payload.priority),
        };

        Object.keys(issue).forEach(
            (key) => issue[key] === undefined && delete issue[key]
        );

        return issue;
    }

    async function createIssue(payload) {
        try {
            const issue = readIssue(payload);
            const projectId = payload.projectId;

            // Check if the project exists
            const projectExists = await knex("Project")
                .select("id")
                .where("id", projectId)
                .first();

            if (!projectExists) {
                throw new ApiError(404, "Project not found");
            }

            // Check if reporterEmail is a member of the project
            const reporterId = await getUserIdByEmail(issue.reporterEmail);
            const reporterIsMember = await knex("ProjectUser")
                .where({
                    projectId: projectId,
                    userId: reporterId,
                })
                .first();

            if (!reporterIsMember) {
                throw new ApiError(
                    400,
                    "Reporter is not a member of the project"
                );
            }

            // Check if assigneeEmail is a member of the project
            const assigneeId = await getUserIdByEmail(issue.assigneeEmail);
            const assigneeIsMember = await knex("ProjectUser")
                .where({
                    projectId: projectId,
                    userId: assigneeId,
                })
                .first();

            if (!assigneeIsMember) {
                throw new ApiError(
                    400,
                    "Assignee is not a member of the project"
                );
            }

            // Get the maximum issue number for the given project
            const maxIssueNumber = await knex("Issue")
                .max("number as maxIssueNumber")
                .where("projectId", projectId)
                .first();

            // Calculate the next issue number
            const nextIssueNumber = (maxIssueNumber.maxIssueNumber || 0) + 1;

            // Insert into Issue table with the calculated issue number
            const [newIssueId] = await knex("Issue").insert({
                projectId,
                number: nextIssueNumber,
                categoryId: issue.categoryId,
                priorityId: issue.priorityId,
                name: issue.name,
                description: issue.description,
                reporterId,
                assigneeId,
            });

            // Retrieve the created issue
            const createdIssue = await knex("Issue")
                .select(
                    "Issue.id",
                    "Issue.number",
                    "Issue.name",
                    "Issue.description",
                    "Category.name as categoryName",
                    "UserReporter.name as reporterName",
                    "UserAssignee.name as assigneeName",
                    "Priority.name as priorityName",
                    "Issue.createdAt",
                    "Issue.updatedAt"
                )
                .leftJoin("Category", "Issue.categoryId", "Category.id")
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
                .where({ "Issue.id": newIssueId })
                .first();

            return createdIssue;
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

    /**
     * Get issue by project Id and issue number
     *
     * @param {*} projectId
     * @param {*} number
     * @returns
     */
    async function retrieveIssue(projectId, number) {
        try {
            // Check if the project exists
            const projectExists = await knex("Project")
                .select("id")
                .where("id", projectId)
                .first();

            if (!projectExists) {
                throw new ApiError(404, "Project not found");
            }

            // Retrieve the main issue details
            const issue = await knex("Issue")
                .select(
                    "Issue.id",
                    "Issue.number",
                    "Issue.name",
                    "Issue.description",
                    "Category.name as categoryName",
                    "UserReporter.name as reporterName",
                    "UserAssignee.name as assigneeName",
                    "Priority.name as priorityName"
                )
                .leftJoin("Category", "Issue.categoryId", "Category.id")
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
                .where({ "Issue.projectId": projectId, "Issue.number": number })
                .first();

            if (!issue) {
                throw new ApiError(404, "Issue not found");
            }

            // Retrieve comments for the issue
            const comments = await knex("Comment")
                .select(
                    "Comment.content",
                    "User.name as userName",
                    "User.image as userImage",
                    "Project.name as projectName",
                    "Issue.name as issueName"
                )
                .leftJoin("User", "Comment.userId", "User.id")
                .leftJoin("Issue", "Comment.issueId", "Issue.id")
                .leftJoin("Project", "Issue.projectId", "Project.id")
                .where("Comment.issueId", issue.id);

            // Attach comments to the issue object
            issue.comments = comments;

            return issue;
        } catch (error) {
            console.error(error);
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, "Internal Server Error");
            }
        }
    }

    /**
     * Retrieve all Issues
     *
     * @param {*} projectId
     * @returns
     */
    async function retrieveAllIssues(projectId) {
        try {
            // Check if the project exists
            const projectExists = await knex("Project")
                .select("id")
                .where("id", projectId)
                .first();

            if (!projectExists) {
                throw new ApiError(404, "Project not found");
            }

            // Retrieve all issues with detailed information
            const issues = await knex("Issue")
                .select(
                    "Issue.id",
                    "Issue.number",
                    "Issue.name",
                    "Issue.description",
                    "Category.name as categoryName",
                    "UserReporter.name as reporterName",
                    "UserAssignee.name as assigneeName",
                    "Priority.name as priorityName"
                )
                .leftJoin("Category", "Issue.categoryId", "Category.id")
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
                .where({ "Issue.projectId": projectId });

            // Retrieve comments for each issue
            const issuesWithComments = await Promise.all(
                issues.map(async (issue) => {
                    const comments = await knex("Comment")
                        .select(
                            "Comment.content",
                            "User.name as userName",
                            "User.image as userImage",
                            "Project.name as projectName",
                            "Issue.name as issueName"
                        )
                        .leftJoin("User", "Comment.userId", "User.id")
                        .leftJoin("Issue", "Comment.issueId", "Issue.id")
                        .leftJoin("Project", "Issue.projectId", "Project.id")
                        .where("Comment.issueId", issue.id);

                    // Attach comments to the issue object
                    issue.comments = comments;

                    return issue;
                })
            );

            return issuesWithComments;
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

    /**
     * Delete Issue and all related information
     *
     * @param {*} projectId
     * @param {*} issueNumber
     * @returns
     */
    async function deleteIssue(projectId, issueNumber) {
        try {
            // Check if the project exists
            const projectExists = await knex("Project")
                .select("id")
                .where("id", projectId)
                .first();

            if (!projectExists) {
                throw new ApiError(404, "Project not found");
            }

            // Delete the issue
            const deleteCount = await knex("Issue")
                .where({
                    projectId: projectId,
                    number: issueNumber,
                })
                .del();

            if (deleteCount === 0) {
                throw new ApiError(404, "Issue not found");
            }

            // Update the issue numbers for remaining issues in the project
            await knex.raw(
                `
                UPDATE Issue
                SET number = number - 1
                WHERE projectId = ? AND number > ?
                `,
                [projectId, issueNumber]
            );

            return { success: true, message: "Issue deleted successfully" };
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

    async function updateIssue(projectId, number, payload) {
        try {
            // Check if the project exists
            const projectExists = await knex("Project")
                .select("id")
                .where("id", projectId)
                .first();

            if (!projectExists) {
                throw new ApiError(404, "Project not found");
            }

            // Check if the issue exists
            const issue = await knex("Issue")
                .select("id")
                .where({ projectId, number })
                .first();

            if (!issue) {
                throw new ApiError(404, "Issue not found");
            }

            // Create updateIssue object from request data
            const updateIssue = readIssue({
                projectId,
                ...payload,
            });

            // Update the issue
            await knex("Issue").where({ id: issue.id }).update(updateIssue);

            return { success: true, message: "Issue updated successfully" };
        } catch (error) {
            console.error(error);
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, "Internal Server Error");
            }
        }
    }

    return {
        createIssue,
        retrieveIssue,
        retrieveAllIssues,
        deleteIssue,
        updateIssue,
    };
}

module.exports = makeIssuesService;
