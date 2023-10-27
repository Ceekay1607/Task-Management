exports.up = function (knex) {
    return knex.schema.createTable("comments", function (table) {
        table.uuid("id").primary();
        table.uuid("userId").references("id").inTable("users");
        table.string("message");
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("comments");
};
