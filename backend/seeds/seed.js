const { faker } = require("@faker-js/faker");

function createFakeUser() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
    };
}

const category = [
    {
        type: "TODO",
        name: "To Do",
        order: 0,
    },

    {
        type: "ONPROGRESS",
        name: "On Progress",
        order: 1,
    },

    {
        type: "DONE",
        name: "Done",
        order: 2,
    },
];

const priority = [
    {
        name: "Low",
        order: 0,
    },

    {
        name: "Medium",
        order: 1,
    },

    {
        name: "High",
        order: 2,
    },
];

exports.seed = async function (knex) {
    await knex("user").del();
    await knex("user").insert(Array(25).fill().map(createFakeUser));
    await knex("category").insert(category);
    await knex("priority").insert(priority);
};
