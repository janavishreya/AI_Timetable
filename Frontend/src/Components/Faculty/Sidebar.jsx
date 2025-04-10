import React from 'react';

function Sidebar({ activePage, setActivePage }) {
  const handleNavClick = (page) => {
    setActivePage(page);
  };

  return (
    <nav className="fac-sidebar">
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
            className={`nav-link ${activePage === 'timetable' ? 'active' : ''}`} 
            onClick={() => handleNavClick('timetable')}
          >
            Timetable
          </button>
        </li>
        <li>
          <button 
            className={` nav-link ${activePage === 'courses' ? 'active' : ''}`} 
            onClick={() => handleNavClick('courses')}
          >
            Courses & Subjects
          </button>
        </li>
        <li>
          <button
            className={`nav-link ${activePage === 'schedule-change' ? 'active' : ''}`} 
            onClick={() => handleNavClick('schedule-change')}
          >
            Request Schedule Change
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

export default Sidebar;