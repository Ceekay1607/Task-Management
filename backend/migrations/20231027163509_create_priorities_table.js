exports.up = function (knex) {
    return knex.schema.createTable("priorities", function (table) {
        table.string("id").primary();
        table.string("name");
        table.integer("order");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("priorities");
};
