import React from 'react';
import { savedTimetables, facultyMembers, courses } from '../../../Data/adminData';

function AdminHome() {
  // Calculate some statistics for the dashboard
  const activeTimetables = savedTimetables.filter(tt => tt.status === 'Active').length;
  const totalFaculty = facultyMembers.length;
  const totalCourses = courses.length;

  return (
    <section className="dashboard-section">
      <h2>Admin Dashboard Overview</h2>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Active Timetables</h3>
          <p className="count">{activeTimetables}</p>
          <p>Latest: Fall Semester 2023</p>
        </div>
        <div className="card">
          <h3>Faculty Members</h3>
          <p className="count">{totalFaculty}</p>
          <p>Across all departments</p>
        </div>
        <div className="card">
          <h3>Total Courses</h3>
          <p className="count">{totalCourses}</p>
          <p>Available for scheduling</p>
        </div>
        <div className="card">
          <h3>Announcements</h3>
          <p>New semester planning meeting on Friday at 2 PM</p>
        </div>
      </div>
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>Fall Semester 2023 timetable published (2 days ago)</li>
          <li>New faculty member added: Dr. Emily Davis (1 week ago)</li>
          <li>Spring Semester 2023 timetable archived (3 months ago)</li>
          <li>System maintenance completed (3 months ago)</li>
        </ul>
      </div>
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="btn">Generate New Timetable</button>
          <button className="btn">Manage Faculty</button>
          <button className="btn">Manage Courses</button>
        </div>
      </div>
    </section>
  );
}

export default AdminHome;