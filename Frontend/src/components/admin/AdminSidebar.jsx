import React from 'react';

function AdminSidebar({ activePage, setActivePage }) {
  const handleNavClick = (page) => {
    setActivePage(page);
  };

  return (
    <nav className="adm-sidebar">
      <ul>
        <li>
          <button 
            className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`} 
            onClick={() => handleNavClick('dashboard')}
          >
            Dashboard
          </button>
        </li>
        <li>
          <button 
            className={`nav-link ${activePage === 'timetable-generator' ? 'active' : ''}`} 
            onClick={() => handleNavClick('timetable-generator')}
          >
            Generate Timetable
          </button>
        </li>
        <li>
          <button 
            className={`nav-link ${activePage === 'saved-timetables' ? 'active' : ''}`} 
            onClick={() => handleNavClick('saved-timetables')}
          >
            Saved Timetables
          </button>
        </li>
        <li>
          <button 
            className={`nav-link ${activePage === 'profile' ? 'active' : ''}`} 
            onClick={() => handleNavClick('profile')}
          >
            Profile
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default AdminSidebar;