const express = require("express");
const categoryController = require("../controllers/category.controller");
const router = express.Router();

const { methodNotAllowed } = require("../controllers/error");

router
    .route("/")
    .get(categoryController.retrieveAllCategory)
    .all(methodNotAllowed);

router
    .route("/:id")
    .get(categoryController.retrieveCategory)
    .all(methodNotAllowed);

module.exports = router;
