const { faker } = require("@faker-js/faker");

function createFakeUser() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
        color: faker.internet.color(),
    };
}

exports.seed = async function (knex) {
    await knex("user").del();
    await knex("user").insert(Array(25).fill().map(createFakeUser));
};
