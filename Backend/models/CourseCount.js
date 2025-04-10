const mongoose = require("mongoose");

const courseCountSchema = new mongoose.Schema({
  course: { type: String, required: true },
  count: { type: Number, required: true },
  course_id: { type: String, required: true }
});

module.exports = mongoose.model("CourseCount", courseCountSchema, "course_counts");
