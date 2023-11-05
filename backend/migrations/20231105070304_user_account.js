// migrations/20231101000000_create_user_account_table.js
exports.up = function (knex) {
    return knex.schema.createTable("user_account", function (table) {
        table.increments("id").primary();
        table.integer("userId").unsigned();
        table
            .foreign("userId")
            .references("id")
            .inTable("User")
            .onDelete("CASCADE");
        table.string("account").unique().notNullable();
        table.string("password").notNullable();
        table.dateTime("createdAt").defaultTo(knex.fn.now());
        table.dateTime("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("user_account");
};
