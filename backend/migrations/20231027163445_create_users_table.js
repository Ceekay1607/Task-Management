exports.up = function (knex) {
    return knex.schema.createTable("users", function (table) {
        table.uuid("id").primary();
        table.string("name");
        table.string("image");
        table.string("color");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
