exports.up = function (knex) {
    return knex.schema.createTable("categories", function (table) {
        table.uuid("id").primary();
        table.string("type");
        table.string("name");
        table.jsonb("issues");
        table.integer("order");
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("categories");
};
