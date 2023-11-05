const knex = require("../database/knex");
const bcrypt = require("bcrypt");

function makeUserAccountService() {
    // Function to create a new user account
    async function createUserAccount({ userId, account, password }) {
        try {
            // Hash the password using a secure password hashing library like bcrypt
            const hashedPassword = await hashPassword(password);

            // Insert the user account into the database
            const [userAccountId] = await knex("user_account")
                .insert({
                    userId,
                    account,
                    password: hashedPassword,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                .returning("id");

            // Retrieve and return the created user account
            const userAccount = await getUserAccountById(userAccountId);
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    // Function to get a user account by its ID
    async function getUserAccountById(userAccountId) {
        try {
            const userAccount = await knex("user_account")
                .where({ id: userAccountId })
                .first();
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    // Function to hash a password
    async function hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    return {
        createUserAccount,
    };
}

module.exports = makeUserAccountService;
