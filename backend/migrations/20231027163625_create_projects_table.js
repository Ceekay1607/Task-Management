exports.up = function (knex) {
    return knex.schema.createTable("projects", function (table) {
        table.string("id").primary();
        table.string("name");
        table.string("description");
        table.jsonb("users");
        table.jsonb("categories");
        table.string("image");
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("projects");
};
