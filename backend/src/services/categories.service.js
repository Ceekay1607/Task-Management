const knex = require("../database/knex");

function makeCategoryService() {
    function retrieveCategories() {
        return knex("category").select("*");
    }

    function retrieveCategoryById(id) {
        return knex("category").where("id", id).select("*").first();
    }

    return {
        retrieveCategories,
        retrieveCategoryById: retrieveCategoryById,
    };
}

module.exports = makeCategoryService;
