// migrations/20231028000001_create_user_table.js
exports.up = function (knex) {
    return knex.schema.createTable("User", function (table) {
        table.increments("id").primary();
        table.string("name");
        table.string("email");
        table.string("image");
        table.string("color");
        table.dateTime("createdAt").defaultTo(knex.fn.now());
        table.dateTime("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("User");
};
