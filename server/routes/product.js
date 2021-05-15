const express = require("express");
const router = express.Router();

//middlewares:
const { authCheck, adminCheck } = require("../middlewares/auth");

//import contoller:
const { create, listAll, remove } = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);

module.exports = router;
