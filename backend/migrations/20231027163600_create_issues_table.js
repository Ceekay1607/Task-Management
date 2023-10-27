exports.up = function (knex) {
    return knex.schema.createTable("issues", function (table) {
        table.uuid("id").primary();
        table.string("name");
        table.string("description");
        table.string("categoryType");
        table.uuid("reporterId").references("id").inTable("users");
        table.uuid("asigneeId").references("id").inTable("users");
        table.jsonb("comments");
        table.string("priorityId").references("id").inTable("priorities");
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("issues");
};
