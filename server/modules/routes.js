const express = require("express");
const path = require("path");
const api = require(path.resolve(".", "modules/controller.js"));
const router = express.Router();

router.get("/", api.home);

module.exports = router;
