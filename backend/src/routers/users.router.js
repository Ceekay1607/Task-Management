const express = require("express");
const { isAuthenticated } = require("../authMiddleware");
const usersController = require("../controllers/users.controller");

const router = express.Router();

router
    .route("/")
    .post(usersController.createUser)
    .get(usersController.retrieveAllUsers)
    .delete(usersController.deleteAllUsers);

router
    .route("/:id")
    .get(isAuthenticated, usersController.getUserById)
    .put(isAuthenticated, usersController.updateUser)
    .delete(isAuthenticated, usersController.deleteUser);

module.exports = router;
