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

    /**
     *
     * @param {*} payload: projectId, issueNumber, commentId, content, userId
     * @returns
     */

    async function createComment(payload) {
        try {
            const projectId = payload.projectId;
            const userId = payload.userId;
            const issueNumber = payload.issueNumber;

            // check existing issue
            const issueIdExists = await knex("issue")
                .select("id")
                .where("projectId", projectId)
                .where("number", issueNumber)
                .first();

            // throw error if issue is not exist
            if (!issueIdExists) {
                throw new ApiError(404, "Issue not found");
            }

            // check if user is a member of the project
            const isMember = await knex("ProjectUser")
                .where({
                    projectId: projectId,
                    userId: userId,
                })
                .first();

            // throw error if user is not a member
            if (!isMember) {
                throw new ApiError(400, "User is not a member of the project");
            }

            const issueId = issueIdExists.id;
            payload.issueId = issueId;

            // insert a new comment into issue
            const comment = readComment(payload);
            const [newCommentId] = await knex("comment").insert(comment);

            return {
                message: "comment created successfully",
                content: payload.content,
            };
        } catch (error) {
            console.log(error);
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, "Internal Server Error");
            }
        }
    }

    async function retrieveAllComments(payload) {
        try {
            // check exist issue
            const issueIdExists = await knex("issue")
                .select("id")
                .where("projectId", payload.projectId)
                .where("number", payload.issueNumber)
                .first();

            // throw error if issue is not exist
            if (!issueIdExists) {
                throw new ApiError(404, "Issue not found");
            }

            // get issue Id
            const issueId = JSON.parse(JSON.stringify(issueIdExists)).id;

            // retrieve all comments with issueId and projectId
            const comment = await knex("comment")
                .select(
                    "comment.userId",
                    "comment.content",
                    "issue.name",
                    "project.name"
                )
                .leftJoin("issue", "comment.issueId", "issue.id")
                .leftJoin("project", "issue.projectId", "project.id")
                .where("comment.issueId", issueId)
                .where("issue.projectId", payload.projectId);

            // throw error if no comment is exist in issue
            if (comment.length <= 0) {
                throw new ApiError(404, "Comment not found");
            }

            return comment;
        } catch (error) {
            console.log(error);
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, "Internal Server Error");
            }
        }
    }

    async function deleteComment(payload) {
        try {
            // check exist issue
            const issueIdExists = await knex("issue")
                .select("id")
                .where("projectId", payload.projectId)
                .where("number", payload.issueNumber)
                .first();

            //throw error if issue is not exist
            if (!issueIdExists) {
                throw new ApiError(404, "Issue not found");
            }

            // get issue Id
            const issueId = JSON.parse(JSON.stringify(issueIdExists)).id;

            // delete comment with commentId and issueId
            const deleteCount = await knex("comment")
                .where("id", payload.commentId)
                .where("issueId", issueId)
                .del();

            // throw error if no comment is exist
            if (deleteCount === 0) {
                throw new ApiError(404, "Comment not found");
            }

            return { message: "Commnet deleted successfully" };
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
        retrieveAllComments,
        deleteComment,
    };
}

module.exports = makeCommentsService;
