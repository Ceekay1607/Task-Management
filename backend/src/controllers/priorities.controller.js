const makePriorityService = require("../services/priority.service");
const ApiError = require("../api-error");

async function retrieveAllPriority(req, res, next) {
    try {
        const priorityService = makePriorityService();
        const categories = await priorityService.retrieveCategories();
        return res.send(categories);
    } catch (e) {
        console.log(e);
        return next(
            new ApiError(500, " An error occured while retrieving categories")
        );
    }
}

async function retrievePriority(req, res, next) {
    try {
        const priorityService = makePriorityService();
        const priority = await priorityService.retrievePriorityById(
            req.params.id
        );

        if (!priority) {
            return new ApiError(404, "Priority not found");
        }

        return res.send(priority);
    } catch (e) {
        console.log(e);
        return next(
            new ApiError(500, " An error occured while retrieving Priority")
        );
    }
}

module.exports = {
    retrieveAllPriority,
    retrievePriority,
};
