import React, { useState } from 'react';
import { coursesData } from '../../../Data/facultyData';

function ScheduleChange() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [currentSchedule, setCurrentSchedule] = useState('');
  const [requestedDay, setRequestedDay] = useState('');
  const [requestedTime, setRequestedTime] = useState('');
  const [reason, setReason] = useState('');

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    
    if (courseId) {
      const course = coursesData.find(c => c.id === courseId);
      setCurrentSchedule(course.schedule);
    } else {
      setCurrentSchedule('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, this would be sent to a server
    alert(`Schedule change request submitted for ${selectedCourse}.\nRequested: ${requestedDay} at ${requestedTime}\nReason: ${reason}`);
    
    // Reset form
    setSelectedCourse('');
    setCurrentSchedule('');
    setRequestedDay('');
    setRequestedTime('');
    setReason('');
  };

  return (
    <section className="dashboard-section">
      <h2>Request Schedule Change</h2>
      <form id="schedule-change-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="course-select">Select Course</label>
          <select 
            id="course-select" 
            value={selectedCourse}
            onChange={handleCourseChange}
            required
          >
            <option value="">-- Select Course --</option>
            {coursesData.map(course => (
              <option key={course.id} value={course.id}>
                {course.name} ({course.id})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="current-schedule">Current Schedule</label>
          <input 
            type="text" 
            id="current-schedule" 
            value={currentSchedule}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="requested-day">Requested Day</label>
          <select 
            id="requested-day" 
            value={requestedDay}
            onChange={(e) => setRequestedDay(e.target.value)}
            required
          >
            <option value="">-- Select Day --</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="requested-time">Requested Time</label>
          <select 
            id="requested-time" 
            value={requestedTime}
            onChange={(e) => setRequestedTime(e.target.value)}
            required
          >
            <option value="">-- Select Time --</option>
            <option value="9:00 - 10:30">9:00 - 10:30</option>
            <option value="10:30 - 12:00">10:30 - 12:00</option>
            <option value="1:00 - 2:30">1:00 - 2:30</option>
            <option value="2:30 - 4:00">2:30 - 4:00</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason for Change</label>
          <textarea 
            id="reason" 
            rows="4" 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn">Submit Request</button>
      </form>
    </section>
  );
}

export default ScheduleChange;