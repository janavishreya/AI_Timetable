import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHome from './Pages/DashboardHome';
import Timetable from './Pages/Timetable';
import Courses from './Pages/Courses';
import ScheduleChange from './Pages/ScheduleChange';
import Profile from './Pages/Profile';

function Dashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'timetable':
        return <Timetable />;
      case 'courses':
        return <Courses />;
      case 'schedule-change':
        return <ScheduleChange />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div id="dashboard-container">
      <header>
        <h1>Faculty Dashboard</h1>
        <div className="user-info">
          <span id="faculty-name">Welcome, {user.name}</span>
          <button id="logout-btn" className="btn-small" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>
      
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="content">
        {renderPage()}
      </main>
    </div>
  );
}

export default Dashboard;