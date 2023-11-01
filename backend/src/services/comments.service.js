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

    async function retrieveAllComments(projectId, issueNumber) {
        try {
            const makeIssueService = require("./issues.service");
            const issueService = makeIssueService();

            // Check if the issue exists
            const issue = await issueService.retrieveIssue(
                projectId,
                issueNumber
            );

            // Retrieve all comments with issueId and projectId
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

            // Throw an error if no comments are found in the issue
            if (comments.length <= 0) {
                throw new ApiError(404, "Comments not found");
            }

            return comments;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                console.log(error);
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
