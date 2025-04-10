const axios = require("axios");
const ClassTimetable = require("../models/ClassTimetable");
const CourseCount = require("../models/CourseCount");

// Generate Timetable
exports.generateTimetable = async (req, res) => {
  const { faculty_name, subjects } = req.body;

  try {
    // Get unique room numbers from subjects
    const roomNumbers = [...new Set(subjects.map(s => s.room))];

    // Fetch timetables for each room
    const roomTimetableDocs = await ClassTimetable.find({ room: { $in: roomNumbers } });
    const room_timetables = {};
    roomTimetableDocs.forEach(doc => {
      room_timetables[doc.room] = doc.timetable;
    });

    // Fetch subject counts
    const courseNames = subjects.map(s => s.subject);
    const courseCountDocs = await CourseCount.find({ course: { $in: courseNames } });
    const subjectCountMap = {};
    courseCountDocs.forEach(doc => {
      subjectCountMap[doc.course] = doc.count;
    });

    const updatedSubjects = subjects.map(subject => ({
      ...subject,
      count: subjectCountMap[subject.subject] || 0
    }));

    const payload = {
      faculty_name,
      subjects: updatedSubjects,
      room_timetables
    };

    console.log("📤 Payload to Flask:", JSON.stringify(payload, null, 2)); // Add this to debug Flask input

    const flaskResponse = await axios.post("http://127.0.0.1:5001/api/generate-final-timetable", payload);
    const generatedData = flaskResponse.data;

    console.log("📡 Timetable from Flask:", generatedData);

    // ✅ Send only one response
    return res.status(200).json({ timetable: generatedData });

  } catch (err) {
    console.error("❌ Error generating timetable:", err);

    // ✅ Only send error response if headers aren't already sent
    if (!res.headersSent) {
      return res.status(500).json({ message: "Server error" });
    }
  }
};
