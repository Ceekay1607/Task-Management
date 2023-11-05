const knex = require("../database/knex");
const { faker } = require("@faker-js/faker");

function makeUsersService() {
    function readUser(payload) {
        const user = {
            name: payload.name,
            email: payload.email,
            image: payload?.image ?? faker.image.avatar(),
        };

        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );

        return user;
    }

    async function createUser(payload) {
        const user = readUser(payload);
        const [id] = await knex("user").insert(user);
        return { id, ...user };
    }

    async function retrieveAllUsers(query) {
        const { name } = query;
        let result = await knex("user")
            .where((builder) => {
                if (name) {
                    builder.where("name", "like", `%${name}%`);
                }
            })
            .select("id", "name", "email", "image");
        let totalRecords = 0;
        result = result.map((result) => {
            totalRecords = result.recordsCount;
            delete result.recordsCount;
            return result;
        });
        return {
            users: result,
        };
    }

    async function getUserById(id) {
        return knex("user").where("id", id).select("*").first();
    }

    async function updateUser(id, payload) {
        const update = readUser(payload);
        return knex("user").where("id", id).update(update);
    }

    async function deleteUser(id) {
        return knex("user").where("id", id).del();
    }

    async function deleteAllUsers() {
        return knex("user").del();
    }

    return {
        createUser,
        retrieveAllUsers,
        getUserById,
        updateUser,
        deleteUser,
        deleteAllUsers,
    };
}

module.exports = makeUsersService;
