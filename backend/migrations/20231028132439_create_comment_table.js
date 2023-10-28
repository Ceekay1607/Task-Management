// migrations/20231028122855_create_comment_table.js
exports.up = function (knex) {
    return knex.schema.createTable("Comment", function (table) {
        table.increments("id").primary();
        table.integer("issueId").unsigned();
        table
            .foreign("issueId")
            .references("id")
            .inTable("Issue")
            .onDelete("CASCADE");
        table.integer("userId").unsigned();
        table
            .foreign("userId")
            .references("id")
            .inTable("User")
            .onDelete("CASCADE");
        table.text("content");
        table.dateTime("createdAt").defaultTo(knex.fn.now());
        table.dateTime("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("Comment");
};
