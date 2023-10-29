const makeCategoryService = require("../services/category.service");
const ApiError = require("../api-error");

const categoryService = makeCategoryService();

async function retrieveAllCategory(req, res, next) {
    try {
        const categories = await categoryService.retrieveCategories();
        return res.send(categories);
    } catch (e) {
        console.log(e);
        return next(
            new ApiError(500, " An error occured while retrieving categories")
        );
    }
}

async function retrieveCategory(req, res, next) {
    try {
        const category = await categoryService.retrieveCategoryById(
            req.params.id
        );

        if (!category) {
            return new ApiError(404, "Category not found");
        }

        return res.send(category);
    } catch (e) {
        console.log(e);
        return next(
            new ApiError(500, " An error occured while retrieving category")
        );
    }
}

module.exports = {
    retrieveAllCategory,
    retrieveCategory,
};