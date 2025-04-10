import React from 'react';

function DashboardHome() {
  return (
    <section className="dashboard-section">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Today's Classes</h3>
          <p className="count">3</p>
          <p>Next: Database Systems at 10:30 AM</p>
        </div>
        <div className="card">
          <h3>Total Courses</h3>
          <p className="count">4</p>
        </div>
        <div className="card">
          <h3>Announcements</h3>
          <p>Faculty meeting on Friday at 2 PM</p>
        </div>
      </div>
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>Schedule updated for Web Development (Yesterday)</li>
          <li>New course allocation: Mobile App Development (2 days ago)</li>
          <li>Timetable modified for Spring Semester (1 week ago)</li>
        </ul>
      </div>
    </section>
  );
}

export default DashboardHome;