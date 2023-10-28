// migrations/20231028000002_create_project_table.js
exports.up = function (knex) {
    return knex.schema.createTable("Project", function (table) {
        table.increments("id").primary();
        table.string("name");
        table.string("description");
        table.string("image");
        table.dateTime("createdAt").defaultTo(knex.fn.now());
        table.dateTime("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("Project");
};
