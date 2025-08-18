
const {createTeam, getTeams} = require("../controllers/teamController");

const express = require("express");
const router = express.Router();
// const Passport = require("../middlewares/Passport");


router.post("/create",createTeam);

router.get("/",getTeams);



module.exports = router;