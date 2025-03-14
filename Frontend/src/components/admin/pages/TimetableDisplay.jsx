import React, { useState } from 'react';
import { days, timeSlots } from '../../../data/adminData';

function TimetableDisplay({ timetable }) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  if (!timetable) {
    return (
      <section className="dashboard-section">
        <h2>Timetable Display</h2>
        <div className="empty-state">
          <p>No timetable to display. Please generate a timetable first.</p>
        </div>
      </section>
    );
  }
  
  const handleSave = () => {
    // In a real application, this would save to a database
    alert('Timetable saved successfully!');
    setShowSaveModal(false);
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="dashboard-section timetable-display-section">
      <div className="timetable-header">
        <h2>Timetable: {timetable.name}</h2>
        <div className="timetable-meta">
          {timetable.department && <span><strong>Department:</strong> {timetable.department}</span>}
          {timetable.semester && <span><strong>Semester:</strong> {timetable.semester}</span>}
          <span><strong>Created:</strong> {timetable.createdOn}</span>
        </div>
        <div className="timetable-actions">
          <button className="btn btn-small" onClick={() => setShowSaveModal(true)}>Save Timetable</button>
          <button className="btn btn-small" onClick={handlePrint}>Print Timetable</button>
        </div>
      </div>
      
      <div className="timetable">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              {days.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(timeSlot => (
              <tr key={timeSlot}>
                <td>{timeSlot}</td>
                {days.map(day => (
                  <td key={`${day}-${timeSlot}`}>
                    {timetable.schedule[day][timeSlot].length > 0 ? (
                      timetable.schedule[day][timeSlot].map((item, index) => (
                        <div key={index} className="timetable-cell">
                          <div className="course-name">{item.courseName}</div>
                          <div className="faculty-name">{item.facultyName}</div>
                          <div className="room">{item.room}</div>
                        </div>
                      ))
                    ) : (
                      <span className="empty-slot">-</span>
                    )}
                  </td>
                ))}
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
    </section>
  );
}

export default TimetableDisplay;