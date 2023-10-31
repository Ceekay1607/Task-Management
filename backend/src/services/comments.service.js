const ApiError = require("../api-error");
const knex = require("../database/knex");

function makeCommentsService() {
    function readComment(payload) {
        const comment = {
            userId: payload.userId,
            issueId: payload.issueId,
            content: payload.content,
        };

        Object.keys(comment).forEach(
            (key) => comment[key] === undefined && delete comment[key]
        );

        return comment;
    }

    async function createComment(payload) {
        try {
            const projectId = payload.projectId;
            const issueNumber = payload.issueNumber;
            const issueIdExists = await knex("issue")
                .select("id")
                .where("projectId", projectId)
                .where("number", issueNumber)
                .first();

            if (!issueIdExists) {
                throw new ApiError(404, "Issue not found");
            }

            const issueId = JSON.parse(JSON.stringify(issueIdExists)).id;
            payload.issueId = issueId;

            const comment = readComment(payload);
            const [newCommentId] = await knex("comment").insert(comment);

            return { newCommentId, ...comment };
        } catch (error) {
            console.log(error);
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, "Internal Server Error");
            }
        }
    }

    return {
        createComment,
    };
}

module.exports = makeCommentsService;
