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
                throw new ApiError(404, "Project not found");
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
                throw new Error("Internal Server Error");
            }
        }
    }

    async function retrieveIssue(issueId) {
        try {
            const issue = await knex("issue")
                .select(
                    "issue.id",
                    "issue.name",
                    "project.name as projectName",
                    "category.name as Category",
                    "priority.name as Priority",
                    "Reporter.id as reporterId",
                    "Reporter.name as reporterName",
                    "Assignee.id as assigneeId",
                    "Assignee.name as assigneeName"
                )
                .join("Project", "issue.projectId", "project.id")
                .join("Category", "issue.categoryId", "category.id")
                .join("Priority", "issue.priorityId", "priority.id")
                .join("User as Reporter", "issue.reporterId", "Reporter.id")
                .join("User as Assignee", "issue.assigneeId", "Assignee.id")
                .where("issue.id", issueId);

            if (!issue) {
                return new ApiError(404, "Issue not found");
            }

            return issue;
        } catch (error) {
            console.log(error);
            throw new Error("Internal Server Error");
        }
    }

    async function retrieveAllIssues() {
        try {
            const issueId = await knex("issue").select("id");

            const issues = issueId.map(async ({ id }) => {
                const result = await retrieveIssue(id);
                return result;
            });

            return issues;
        } catch (error) {}
    }

    return {
        createIssue,
        retrieveIssue,
        retrieveAllIssues,
    };
}

module.exports = makeIssuesService;
