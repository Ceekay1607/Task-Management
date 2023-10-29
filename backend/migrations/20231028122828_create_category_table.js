// migrations/20231028000004_create_category_table.js
exports.up = function (knex) {
    return knex.schema.createTable("Category", function (table) {
        table.increments("id").primary();
        table.string("type").defaultTo("TODO");
        table.string("name");
        table.integer("order");
        table.dateTime("createdAt").defaultTo(knex.fn.now());
        table.dateTime("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("Category");
};
