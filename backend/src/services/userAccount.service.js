const knex = require("../database/knex");
const bcrypt = require("bcrypt");

function makeUserAccountService() {
    // Function to create a new user account
    async function createUserAccount({ userId, username, password }) {
        try {
            // Hash the password using a secure password hashing library like bcrypt
            const hashedPassword = await hashPassword(password);

            // Insert the user account into the database
            const [userAccountId] = await knex("user_account")
                .insert({
                    userId,
                    username,
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

    /**
     * Get user account by email
     * @param {string} email - Email address of the user
     * @returns {Promise<Object|null>} - User account information or null if not found
     */
    async function getUserByEmail(email) {
        try {
            const userAccount = await knex("user_account")
                .where("username", email)
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

    async function verifyPassword(plainTextPassword, hashedPassword) {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }

    return {
        createUserAccount,
        getUserByEmail,
        verifyPassword,
        hashPassword,
    };
}

module.exports = makeUserAccountService;
