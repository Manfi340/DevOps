const express = require("express");
const router = express.Router();
const { VerifyToken } = require("../middlewares/verifyToken");
const { getAllLocation, getBestLocations } = require("../controllers/location.controller");

// Protect all routes with VerifyToken middleware
router.use(VerifyToken);

// GET all locations
router.get("/", getAllLocation);

// GET best locations based on categoryId
router.get("/best/:categoryId", getBestLocations);

module.exports = router;
