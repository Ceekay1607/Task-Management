const knex = require("../database/knex");

function makePriorityService() {
    function retrieveCategories() {
        return knex("Priority").select("*");
    }

    function retrievePriorityById(id) {
        return knex("Priority").where("id", id).select("*").first();
    }

    return {
        retrieveCategories,
        retrievePriorityById: retrievePriorityById,
    };
}

module.exports = makePriorityService;
