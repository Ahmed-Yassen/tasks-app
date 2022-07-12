const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");
const authMW = require("../middlewares/authMW");

router.route("/tasks").post(authMW, controller.createTask);

module.exports = router;
