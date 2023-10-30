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
        const issue = readIssue(payload);

        const projectExists = await knex("Project")
            .select("id")
            .where("id", payload.projectId)
            .first();

        if (!projectExists) {
            throw new Error("Project not found");
        }

        try {
            // Insert into Issue table
            const [newIssueId] = await knex("Issue")
                .insert(issue)
                .returning("id");

            // Respond with the created issue
            return { newIssueId, ...issue };
        } catch (error) {
            if (error.message === "Project not found") {
                // Handle project not found error
                console.error("Project not found");
                throw new Error("Project not found");
            } else {
                // Handle other errors
                console.error(error);
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
