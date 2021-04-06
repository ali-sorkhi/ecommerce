const express = require("express");

const router = express.Router();

//import contoller:

router.get("/user", (req, res) => {
    res.json({ data: "user page" });
  });

module.exports = router;