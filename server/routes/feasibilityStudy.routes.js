const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/feasibilityStudy.controller");

router.post("/", ctrl.create);   
router.get("/", ctrl.getAll);   

module.exports = router;