// migrations/20231028122842_create_issue_table.js
exports.up = function (knex) {
    return knex.schema.createTable("Issue", function (table) {
        table.increments("id").primary();
        table.integer("categoryId").unsigned();
        table
            .foreign("categoryId")
            .references("id")
            .inTable("Category")
            .onDelete("CASCADE");
        table.string("name");
        table.string("description");
        table.integer("reporterId").unsigned();
        table
            .foreign("reporterId")
            .references("id")
            .inTable("User")
            .onDelete("CASCADE");
        table.integer("assigneeId").unsigned();
        table
            .foreign("assigneeId")
            .references("id")
            .inTable("User")
            .onDelete("CASCADE");
        table.integer("priorityId").unsigned().nullable();
        table.dateTime("createdAt").defaultTo(knex.fn.now());
        table.dateTime("updatedAt").defaultTo(knex.fn.now());

        // Foreign key reference to the 'Priority' table
        table
            .foreign("priorityId")
            .references("id")
            .inTable("Priority")
            .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("Issue");
};
