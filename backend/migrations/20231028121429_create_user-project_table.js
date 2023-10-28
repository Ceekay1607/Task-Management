// migrations/20231028121429_create_user-project_table.js
exports.up = function (knex) {
    return knex.schema.createTable("ProjectUser", function (table) {
        table.increments("id").primary();
        table.integer("userId").unsigned();
        table
            .foreign("userId")
            .references("id")
            .inTable("User")
            .onDelete("CASCADE");
        table.integer("projectId").unsigned();
        table
            .foreign("projectId")
            .references("id")
            .inTable("Project")
            .onDelete("CASCADE");
        table.dateTime("createdAt").defaultTo(knex.fn.now());
        table.dateTime("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("ProjectUser");
};
