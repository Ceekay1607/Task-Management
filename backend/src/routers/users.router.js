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
    .put(isAuthenticated, usersController.updateUser)
    .delete(isAuthenticated, usersController.deleteUser);

router.route("/info").get(isAuthenticated, usersController.getUserInfo);

module.exports = router;
