const express = require("express");
const usersController = require("../controllers/users.controller");

const router = express.Router();

router
    .route("/")
    .post(usersController.createUser)
    .get(usersController.getManyUsers)
    .delete(usersController.deleteAllUsers);

router
    .route("/:id")
    .get(usersController.getUserById)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;
