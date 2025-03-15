import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { departments, rooms, facultyMembers, courses } from "../../../data/adminData";

function TimetableGenerator({ onGenerateTimetable }) {
  const navigate = useNavigate(); // ✅ Initialize navigate function

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [courseClassroomPairs, setCourseClassroomPairs] = useState([{ course: "", classroom: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTimetable, setGeneratedTimetable] = useState(null);

  // Handle Faculty Selection & Auto-fill Department
  const handleFacultyChange = (e) => {
    const facultyName = e.target.value;
    setSelectedFaculty(facultyName);
    const faculty = facultyMembers.find((f) => f.name === facultyName);
    setSelectedDepartment(faculty ? faculty.department : "");
  };

  // Handle Course Selection
  const handleCourseChange = (index, selectedCourse) => {
    const updatedPairs = [...courseClassroomPairs];
    updatedPairs[index].course = selectedCourse;
    setCourseClassroomPairs(updatedPairs);
  };

  // Handle Classroom Selection
  const handleClassroomChange = (index, selectedRoom) => {
    const updatedPairs = [...courseClassroomPairs];
    updatedPairs[index].classroom = selectedRoom;
    setCourseClassroomPairs(updatedPairs);
  };

  // Add More Course-Classroom Pair
  const handleAddMore = () => {
    setCourseClassroomPairs([...courseClassroomPairs, { course: "", classroom: "" }]);
  };

  // Handle Form Submission (Generate Timetable)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFaculty) {
      alert("Please select a faculty member.");
      return;
    }

    if (courseClassroomPairs.some(pair => !pair.course || !pair.classroom)) {
      alert("Please select both course and classroom for all entries.");
      return;
    }

    setIsLoading(true);

    // Prepare request payload
    const requestData = {
      faculty_name: selectedFaculty,
      subjects: courseClassroomPairs.map(pair => ({
        subject: pair.course,
        room: pair.classroom,
      })),
    };

    try {
      // Send request to Flask backend
      const response = await fetch("http://localhost:5000/api/timetable/generate_timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        // ✅ Fix facultyName and navigate to display page
        navigate("/timetable-display", { state: { faculty_name: selectedFaculty, timetable: data.timetable } });
      } else {
        alert("Error generating timetable: " + data.error);
      }
    } catch (error) {
      setIsLoading(false);
      alert("Failed to fetch timetable. Please try again.");
    }
  };

  // Reset Form
  const handleReset = () => {
    setSelectedFaculty("");
    setSelectedDepartment("");
    setCourseClassroomPairs([{ course: "", classroom: "" }]);
    setGeneratedTimetable(null);
  };

  return (
    <section className="dashboard-section">
      <h2>Timetable Generator</h2>

      {isLoading ? (
        <div className="loading-container">
          <p>Generating timetable... Please wait.</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="timetable-generator-form">
          {/* Faculty & Department Selection */}
          <div className="form-row">
            <div className="form-group">
              <label>Faculty Name</label>
              <select value={selectedFaculty} onChange={handleFacultyChange}>
                <option value="">Select Faculty</option>
                {facultyMembers.map((faculty) => (
                  <option key={faculty.name} value={faculty.name}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Department</label>
              <input type="text" value={selectedDepartment} disabled />
            </div>
          </div>

          {/* Course & Classroom Selection */}
          {courseClassroomPairs.map((pair, index) => (
            <div key={index} className="centered">
              <div className="small-width">
                <select value={pair.course} onChange={(e) => handleCourseChange(index, e.target.value)}>
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.name} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <span className="arrow">→</span>

              <div className="small-width">
                <select value={pair.classroom} onChange={(e) => handleClassroomChange(index, e.target.value)}>
                  <option value="">Select Classroom</option>
                  {rooms.map((room) => (
                    <option key={room} value={room}>
                      {room}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {/* Add More Button */}
          <div className="add-more-container">
            <button type="button" onClick={handleAddMore} className="btn btn-small">
              + Add More
            </button>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit" className="btn">Generate Timetable</button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset Form
            </button>
          </div>
        </form>
      )}

      {/* Display Generated Timetable */}
      {generatedTimetable && (
        <div className="generated-timetable">
          <h3>Generated Timetable for {generatedTimetable.faculty_name}</h3>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Schedule</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(generatedTimetable.timetable).map(([day, periods]) => (
                <tr key={day}>
                  <td>{day}</td>
                  <td>
                    {periods.map((period, index) => (
                      <span key={index} className="period">
                        {period ? period : "Free"}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TimetableGenerator;
