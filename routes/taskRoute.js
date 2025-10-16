const {createTask} =require("../controllers/taskController");

const express = require("express");

const router = express.Router();

router.post("/create",createTask);

module.exports = router;