import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const timeSlots = [
  "8:40 - 9:30",
  "9:30 - 10:20",
  "10:30 - 11:20",
  "11:20 - 12:10",
  "12:50 - 1:35",
  "1:35 - 2:20",
  "2:30 - 3:15",
  "3:15 - 4:00",
];

const breakIndices = [1, 3, 5]; // breaks after 2nd, 4th, and 6th periods
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function TimetableDisplay({ timetable: propTimetable }) {
  const location = useLocation();
  const navigate = useNavigate();
  const stateTimetable = location.state?.timetable;
  const timetableData = propTimetable || stateTimetable;

  const facultyName = timetableData?.faculty_name || location.state?.faculty_name;
  const schedule = timetableData?.timetable;
  const { faculty_name, timetable } = location.state || {};
  const [showSaveModal, setShowSaveModal] = useState(false);

  if (!timetableData || !schedule) {
    return (
      <section className="dashboard-section">
        <h2>Timetable Display</h2>
        <div className="empty-state">
          <p>No timetable to display. Please generate a timetable first.</p>
          <button className="btn btn-primary" onClick={() => navigate("/generate_timetable")}>
            Generate Timetable
          </button>
        </div>
      </section>
    );
  }

  const handleSave = () => {
    alert("Timetable saved successfully!");
    setShowSaveModal(false);
  };

  const handlePrint = () => {
    window.print();
  };
  console.log("Schedule:", schedule);


  return (
    <section className="dashboard-section timetable-display-section">
      <div className="timetable-header">
        <h2>Generated Timetable for {facultyName}</h2>
        <div className="timetable-actions">
          <button className="btn btn-small" onClick={() => setShowSaveModal(true)}>Save Timetable</button>
          <button className="btn btn-small" onClick={handlePrint}>Print Timetable</button>
          <button className="btn btn-secondary btn-small" onClick={() => navigate("/generate-timetable")}>
            Generate Another Timetable
          </button>
        </div>
      </div>

      <div className="timetable">
        <table>
          <thead>
            <tr>
              <th>Day</th>
              {timeSlots.map((slot, idx) => (
                <React.Fragment key={idx}>
                  <th>{slot}</th>
                  {breakIndices.includes(idx) && (
                    <th className="break-slot-header">Break</th>
                  )}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td><strong>{day}</strong></td>
                {Array.isArray(schedule?.timetable?.[day]) ? (
                  schedule.timetable[day].map((entry, idx) => (
                    <React.Fragment key={idx}>
                      <td className={entry ? "filled-slot" : "empty-slot"}>
                        {entry || "-"}
                      </td>
                      {breakIndices.includes(idx) && (
                        <td className="break-slot">⏸️</td>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <td colSpan={timeSlots.length + breakIndices.length}>No data</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showSaveModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Save Timetable</h3>
            <p>Are you sure you want to save this timetable?</p>
            <div className="modal-actions">
              <button className="btn" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary" onClick={() => setShowSaveModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .filled-slot { background-color: #e0f7ff; }
          .empty-slot { background-color: #f9f9f9; color: #aaa; text-align: center; }
          .break-slot {
            background-color: #ffe5e5;
            text-align: center;
            font-weight: bold;
            color: #b00;
          }
          .break-slot-header {
            background-color: #ffcccc;
            color: #900;
            font-weight: bold;
          }
          .timetable td, .timetable th {
            padding: 10px;
            border: 1px solid #ccc;
            min-width: 110px;
          }
          .timetable table {
            border-collapse: collapse;
            width: 100%;
          }
        `}
      </style>
    </section>
  );
}

export default TimetableDisplay;
