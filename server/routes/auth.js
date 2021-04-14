const express = require("express");

const router = express.Router();

//middlewares:
const { authCheck, adminCheck } = require("../middlewares/auth");

//import contoller:
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser); //post cuz we post data from FE to BE
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
