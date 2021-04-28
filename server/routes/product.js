const express = require("express");
const router = express.Router();

//middlewares:
const { authCheck, adminCheck } = require("../middlewares/auth");

//import contoller:
const { create, read } = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products", authCheck, adminCheck, create);

module.exports = router;
