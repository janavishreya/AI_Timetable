from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
PERIODS = 8  # Number of periods per day

def distribute_subjects_evenly(subjects, room_timetables):
    """ Distributes subjects across the week while ensuring alternate periods and avoiding conflicts. """
    timetable = {day: [None] * PERIODS for day in DAYS}
    subject_counts = {sub["subject"]: sub["count"] for sub in subjects}

    # Create a list of (subject, room) pairs to schedule
    subject_list = []
    for sub in subjects:
        subject_list.extend([(sub["subject"], sub["room"])] * sub["count"])

    # Shuffle to avoid bias in allocation
    random.shuffle(subject_list)

    # Place subjects ensuring even distribution
    for subject, room in subject_list:
        placed = False
        attempts = 0

        while not placed and attempts < 50:  # Avoid infinite loops
            day = random.choice(DAYS)
            period = random.choice(range(0, PERIODS, 2))  # Pick only even periods (0, 2, 4, 6)

            # Ensure no conflicts in room timetable
            if (
                timetable[day][period] is None and 
                day in room_timetables.get(room, {}) and 
                room_timetables[room][day][period] is None
            ):
                timetable[day][period] = f"{subject} ({room})"
                placed = True

            attempts += 1

    return timetable

@app.route("/api/generate-final-timetable", methods=["POST"])
def generate_timetable():
    try:
        data = request.json
        faculty_name = data["faculty_name"]
        subjects = data["subjects"]
        room_timetables = data["room_timetables"]

        # Generate optimized timetable while avoiding conflicts
        optimized_timetable = distribute_subjects_evenly(subjects, room_timetables)

        return jsonify({"faculty_name": faculty_name, "timetable": optimized_timetable})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
