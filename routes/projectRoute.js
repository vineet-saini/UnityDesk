const {createProject} = require("../controllers/projectController");

const express = require("express");

const router = express.Router();

router.post("/create",createProject);


module.exports = router;