import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { departments, rooms, facultyMembers, courses } from "../../../Data/adminData";

function TimetableGenerator({ onGenerateTimetable }) {
  const navigate = useNavigate();

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [courseClassroomPairs, setCourseClassroomPairs] = useState([{ course: "", classroom: "" }]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFacultyChange = (e) => {
    const facultyName = e.target.value;
    setSelectedFaculty(facultyName);
    const faculty = facultyMembers.find((f) => f.name === facultyName);
    setSelectedDepartment(faculty ? faculty.department : "");
  };

  const handleCourseChange = (index, selectedCourse) => {
    const updatedPairs = [...courseClassroomPairs];
    updatedPairs[index].course = selectedCourse;
    setCourseClassroomPairs(updatedPairs);
  };

  const handleClassroomChange = (index, selectedRoom) => {
    const updatedPairs = [...courseClassroomPairs];
    updatedPairs[index].classroom = selectedRoom;
    setCourseClassroomPairs(updatedPairs);
  };

  const handleAddMore = () => {
    setCourseClassroomPairs([...courseClassroomPairs, { course: "", classroom: "" }]);
  };

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

    try {
      const response = await fetch("http://localhost:5000/api/admin/generate_timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          faculty_name: selectedFaculty,
          subjects: courseClassroomPairs.map(pair => ({
            subject: pair.course,
            room: pair.classroom,
          })),
        }),
      });

      const data = await response.json();
      setIsLoading(false);

      console.log("✅ Timetable generation response:", data);
      console.log("Navigating to TimetableDisplay with:", {
        faculty_name: selectedFaculty,
        timetable: data.timetable,
      });



      if (response.ok) {
        onGenerateTimetable({
          faculty_name: selectedFaculty,
          timetable: data.timetable,
        });
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      setIsLoading(false);
      alert("Failed to fetch timetable. Please try again.");
    }
  };

  const handleReset = () => {
    setSelectedFaculty("");
    setSelectedDepartment("");
    setCourseClassroomPairs([{ course: "", classroom: "" }]);
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

          <div className="add-more-container">
            <button type="button" onClick={handleAddMore} className="btn btn-small">
              + Add More
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">Generate Timetable</button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset Form
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default TimetableGenerator;
