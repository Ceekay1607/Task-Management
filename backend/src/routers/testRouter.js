const express = require("express");

const testController = require("../controllers/test");
const { methodNotAllowed } = require("../controllers/error");

const router = express.Router();

router.route("/").get(testController.getHelloMessage).all(methodNotAllowed);

module.exports = router;
