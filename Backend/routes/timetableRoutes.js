const express = require("express");
const { generateTimetable } = require("../controllers/timetableController");

const router = express.Router();

router.post("/generate_timetable", generateTimetable);

module.exports = router;
