const makeUsersService = require("../services/users.service");
const makeUserAccountService = require("../services/userAccount.service");
const ApiError = require("../api-error");
const knex = require("knex");

async function createUser(req, res, next) {
    if (!req.body?.name || !req.body?.email || !req.body?.password) {
        return next(
            new ApiError(400, "Name, email, and password are required")
        );
    }

    try {
        const userAccountService = makeUserAccountService();
        const isEmailExist = await userAccountService.getUserByEmail(
            req.body.email
        );
        if (isEmailExist) return next(new ApiError(400, "Email is exist"));

        const usersService = makeUsersService();

        const user = await usersService.createUser(req.body);

        const userAccount = await userAccountService.createUserAccount({
            userId: user.id,
            username: req.body.email,
            password: req.body.password,
        });

        return res.send({ user, userAccount });
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(
                500,
                "An error occurred while creating the user and user account"
            )
        );
    }
}

async function retrieveAllUsers(req, res, next) {
    let users = [];

    try {
        const usersService = makeUsersService();
        users = await usersService.retrieveAllUsers(req.query);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while retreiving contacts")
        );
    }

    return res.send(users);
}

async function getUserById(req, res, next) {
    try {
        const usersService = makeUsersService();
        const user = await usersService.getUserById(req.params.id);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send(user);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving user with id=${req.params.id}`)
        );
    }
}

async function getUserInfo(req, res, next) {
    try {
        const usersService = makeUsersService();
        const user = await usersService.getUserById(req.user.id);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send(user);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving user with id=${req.user.id}`)
        );
    }
}

async function updateUser(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const usersService = makeUsersService();
        const updated = await usersService.updateUser(req.params.id, req.body);

        if (!updated) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send({ message: "User was updated successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error updating user with id=${req.params.id}`)
        );
    }
}

async function deleteUser(req, res, next) {
    try {
        const usersService = makeUsersService();
        const deleted = await usersService.deleteUser(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send({ message: "User was deleted successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Could not delete user with id=${req.params.id}`)
        );
    }
}

async function deleteAllUsers(req, res, next) {
    try {
        const usersService = makeUsersService();
        const deleted = await usersService.deleteAllUsers();
        return res.send({
            message: `${deleted} users were deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while removing all users")
        );
    }
}

module.exports = {
    createUser,
    retrieveAllUsers,
    getUserInfo,
    updateUser,
    deleteUser,
    deleteAllUsers,
};
