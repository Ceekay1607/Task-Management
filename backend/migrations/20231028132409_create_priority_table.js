// migrations/20231028122827_create_priority_table.js
exports.up = function (knex) {
    return knex.schema.createTable("Priority", function (table) {
        table.increments("id").primary();
        table.string("name");
        table.integer("order");
        table.dateTime("createdAt").defaultTo(knex.fn.now());
        table.dateTime("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("Priority");
};
