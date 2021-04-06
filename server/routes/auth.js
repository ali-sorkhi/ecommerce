const express = require("express");

const router = express.Router();

//middlewares:
const { authCheck } = require("../middlewares/auth");

//import contoller:
const { createOrUpdateUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser); //post cuz we post data from FE to BE

module.exports = router;
