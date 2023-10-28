const { faker } = require("@faker-js/faker");

function createUser() {
    return {
        name: faker.person.fullName(),
        image: faker.image.avatar(),
        color: faker.color.human(),
    };
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("users").insert(Array(4).fill().map(createUser));
};
