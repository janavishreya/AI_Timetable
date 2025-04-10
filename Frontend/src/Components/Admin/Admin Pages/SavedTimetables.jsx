import React, { useState } from 'react';
import { savedTimetables } from '../../../Data/adminData';

function SavedTimetables({ onViewTimetable }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTimetables = savedTimetables.filter(timetable => {
    const matchesFilter = filter === 'all' || timetable.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = timetable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          timetable.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const handleViewTimetable = (timetable) => {
    // In a real application, this would fetch the timetable data
    // For demo purposes, we'll create a mock timetable
    const mockTimetable = {
      ...timetable,
      schedule: generateMockSchedule()
    };
    
    onViewTimetable(mockTimetable);
  };
  
  // Generate a mock schedule for demonstration
  const generateMockSchedule = () => {
    const schedule = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['9:00 - 10:30', '10:30 - 12:00', '1:00 - 2:30', '2:30 - 4:00'];
    
    days.forEach(day => {
      schedule[day] = {};
      timeSlots.forEach(timeSlot => {
        schedule[day][timeSlot] = [];
      });
    });
    
    // Add some sample classes
    schedule['Monday']['9:00 - 10:30'].push({
      courseId: 'CS301',
      courseName: 'Web Development',
      facultyId: 'FAC-2023-001',
      facultyName: 'Dr. John Smith',
      room: 'Room 301'
    });
    
    schedule['Tuesday']['10:30 - 12:00'].push({
      courseId: 'CS302',
      courseName: 'Database Systems',
      facultyId: 'FAC-2023-003',
      facultyName: 'Prof. Michael Brown',
      room: 'Room 302'
    });
    
    schedule['Wednesday']['1:00 - 2:30'].push({
      courseId: 'CS303',
      courseName: 'Software Engineering',
      facultyId: 'FAC-2023-001',
      facultyName: 'Dr. John Smith',
      room: 'Room 303'
    });
    
    schedule['Thursday']['10:30 - 12:00'].push({
      courseId: 'CS302',
      courseName: 'Database Systems',
      facultyId: 'FAC-2023-003',
      facultyName: 'Prof. Michael Brown',
      room: 'Room 302'
    });
    
    schedule['Friday']['1:00 - 2:30'].push({
      courseId: 'CS303',
      courseName: 'Software Engineering',
      facultyId: 'FAC-2023-001',
      facultyName: 'Dr. John Smith',
      room: 'Room 303'
    });
    
    return schedule;
  };

  return (
    <section className="dashboard-section">
      <h2>Saved Timetables</h2>
      
      <div className="filter-controls">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search timetables..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'archived' ? 'active' : ''}`}
            onClick={() => setFilter('archived')}
          >
            Archived
          </button>
        </div>
      </div>
      
      <div className="timetables-list">
        {filteredTimetables.length > 0 ? (
          filteredTimetables.map(timetable => (
            <div key={timetable.id} className={`timetable-card ${timetable.status.toLowerCase()}`}>
              <div className="timetable-info">
                <h3>{timetable.name}</h3>
                <p><strong>Department:</strong> {timetable.department}</p>
                <p><strong>Created:</strong> {timetable.createdOn}</p>
                <p><strong>Last Modified:</strong> {timetable.lastModified}</p>
                <p><strong>Status:</strong> <span className={`status ${timetable.status.toLowerCase()}`}>{timetable.status}</span></p>
              </div>
              <div className="timetable-actions">
                <button className="btn" onClick={() => handleViewTimetable(timetable)}>View</button>
                <button className="btn btn-secondary">Edit</button>
                {timetable.status === 'Active' ? (
                  <button className="btn btn-warning">Archive</button>
                ) : (
                  <button className="btn btn-success">Activate</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No timetables found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SavedTimetables;