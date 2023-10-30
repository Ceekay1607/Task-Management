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

    return {
        createIssue,
    };
}

module.exports = makeIssuesService;
