import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHome from './Admin Pages/AdminHome';
import TimetableGenerator from './Admin Pages/TimetableGenerator';
import TimetableDisplay from './Admin Pages/TimetableDisplay';
import SavedTimetables from './Admin Pages/SavedTimetables';
import AdminProfile from './Admin Pages/AdminProfile';

function AdminDashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [generatedTimetable, setGeneratedTimetable] = useState(null);

  const handleGenerateTimetable = (timetableData) => {
    setGeneratedTimetable(timetableData);
    setActivePage('timetable-display');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdminHome />;
      case 'timetable-generator':
        return <TimetableGenerator onGenerateTimetable={handleGenerateTimetable} />;
      case 'timetable-display':
        return <TimetableDisplay timetable={generatedTimetable} />;
      case 'saved-timetables':
        return <SavedTimetables onViewTimetable={(timetable) => {
          setGeneratedTimetable(timetable);
          setActivePage('timetable-display');
        }} />;
      case 'profile':
        return <AdminProfile user={user} />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div id="dashboard-container">
      <header>
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span id="admin-name">Welcome, {user.name}</span>
          <button id="logout-btn" className="btn-small" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>
      
      <AdminSidebar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="content">
        {renderPage()}
      </main>
    </div>
  );
}

export default AdminDashboard;