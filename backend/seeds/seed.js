const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const users = [
    {
        name: "Ngu Cong Khanh",
        email: "admin@gmail.com",
        image: faker.image.avatar(),
    },
    {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
    },
    {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
    },
    {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
    },
    {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
    },
    {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
    },
];

const hashedPassword = async () => await bcrypt.hash("12345678", 10);

const generateAccounts = async () => {
    const account = [
        {
            userId: 1,
            username: users[0].email,
            password: await hashedPassword(),
        },
        {
            userId: 2,
            username: users[1].email,
            password: await hashedPassword(),
        },
        {
            userId: 3,
            username: users[2].email,
            password: await hashedPassword(),
        },
        {
            userId: 4,
            username: users[3].email,
            password: await hashedPassword(),
        },
        {
            userId: 5,
            username: users[4].email,
            password: await hashedPassword(),
        },
        {
            userId: 6,
            username: users[5].email,
            password: await hashedPassword(),
        },
    ];
    return account;
};

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
    const accounts = await generateAccounts();
    await knex("user").insert(users);
    await knex("user_account").insert(accounts);
    await knex("category").insert(category);
    await knex("priority").insert(priority);
};
