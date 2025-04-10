const mongoose = require("mongoose");

const timetableEntrySchema = new mongoose.Schema({
  Subject: String,
  Room: String
}, { _id: false });

const classTimetableSchema = new mongoose.Schema({
  room: { type: String, required: true },
  timetable: {
    Monday: [timetableEntrySchema],
    Tuesday: [timetableEntrySchema],
    Wednesday: [timetableEntrySchema],
    Thursday: [timetableEntrySchema],
    Friday: [timetableEntrySchema]
  }
});

module.exports = mongoose.model("ClassTimetable", classTimetableSchema, "class_timetable");
