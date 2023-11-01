const ApiError = require("../api-error");
const knex = require("../database/knex");

function makeIssuesService() {
    function readIssue(payload) {
        const issue = {
            projectId: payload.projectId,
            categoryId: payload.categoryId,
            name: payload.name,
            description: payload.description,
            reporterId: payload.reporterId,
            assigneeId: payload.assigneeId,
            priorityId: payload.priorityId,
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
                return new ApiError(404, "Project not found");
            }

            // Check if reporterId is a member of the project
            const reporterIsMember = await knex("ProjectUser")
                .where({
                    projectId: projectId,
                    userId: issue.reporterId,
                })
                .first();

            if (!reporterIsMember) {
                throw new ApiError(
                    400,
                    "Reporter is not a member of the project"
                );
            }

            // Check if assigneeId is a member of the project
            const assigneeIsMember = await knex("ProjectUser")
                .where({
                    projectId: projectId,
                    userId: issue.assigneeId,
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
                ...issue,
            });

            // Retrieve the created issue
            const createdIssue = {
                id: newIssueId,
                number: nextIssueNumber,
                ...issue,
            };

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

            const issueNumbers = await knex("issue")
                .select("number")
                .where("issue.projectId", projectId);

            const issues = await Promise.all(
                issueNumbers.map(async ({ number }) => {
                    const issue = await knex("Issue")
                        .select(
                            "User.name as AssigneeName",
                            "issue.number as Number",
                            "issue.name as Name",
                            "issue.description as Description"
                        )
                        .leftJoin("User", "Issue.assigneeId", "User.id")
                        .leftJoin("Project", "Issue.projectId", "Project.id")
                        .where("issue.number", number)
                        .where("project.id", projectId);

                    return issue;
                })
            );

            return issues;
        } catch (error) {
            if (error instanceof ApiError) {
                // Re-throw the ApiError for specific cases
                throw error;
            } else {
                throw new ApiError(500, "Internal Server Error");
            }
        }
    }

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

    return {
        createIssue,
        retrieveIssue,
        retrieveAllIssues,
        deleteIssue,
    };
}

module.exports = makeIssuesService;
