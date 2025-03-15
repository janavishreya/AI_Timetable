const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const PERIODS = 8;
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate timetable
function distributeSubjectsEvenly(subjects) {
  let timetable = {};
  DAYS.forEach((day) => (timetable[day] = new Array(PERIODS).fill(null)));

  // Convert subjects into an array of occurrences
  let subjectList = subjects.flatMap(({ subject, room, count }) =>
    Array(count).fill({ subject, room })
  );

  // Shuffle subjectList
  subjectList.sort(() => Math.random() - 0.5);

  console.log("📌 Shuffled Subject List:", subjectList);

  subjectList.forEach(({ subject, room }) => {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 50) {
      let day = DAYS[random(0, DAYS.length - 1)];
      let period = random(0, PERIODS / 2) * 2;

      if (!timetable[day][period]) {
        timetable[day][period] = `${subject} (${room})`;
        placed = true;
      }
      attempts++;
    }

    if (!placed) {
      console.warn(`⚠️ Could not place ${subject} (${room}) after 50 attempts.`);
    }
  });

  return timetable;
}

// Controller function for generating the timetable
async function generateTimetable(req, res) {
  try {
    console.log("📩 Received request:", req.body);

    const { faculty_name, subjects } = req.body;
    if (!faculty_name || !subjects || subjects.length === 0) {
      console.error("❌ Missing required data:", req.body);
      return res.status(400).json({ error: "Missing required data" });
    }

    console.log(`📊 Generating timetable for ${faculty_name}...`);

    const generatedTimetable = distributeSubjectsEvenly(subjects);

    console.log("✅ Timetable successfully generated for", faculty_name);

    res.json({ faculty_name, timetable: generatedTimetable });
  } catch (error) {
    console.error("🔥 Error generating timetable:", error.stack);
    res.status(500).json({ error: "Failed to generate timetable", details: error.message });
  }
}

module.exports = { generateTimetable };
