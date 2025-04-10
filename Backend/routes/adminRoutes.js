const express = require("express");
const router = express.Router();
const { getAdminProfile } = require("../controllers/adminController");
const { generateTimetable } = require('../controllers/generateController');

router.get("/profile", getAdminProfile);
router.post("/generate_timetable", generateTimetable);

module.exports = router;
