import React from 'react';

function Timetable() {
  return (
    <section className="dashboard-section">
      <h2>Weekly Timetable</h2>
      <div className="timetable">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>9:00 - 10:30</td>
              <td>Web Development<br /><span className="room">Room 301</span></td>
              <td>-</td>
              <td>Web Development<br /><span className="room">Room 301</span></td>
              <td>-</td>
              <td>Mobile App Dev<br /><span className="room">Room 305</span></td>
            </tr>
            <tr>
              <td>10:30 - 12:00</td>
              <td>-</td>
              <td>Database Systems<br /><span className="room">Room 302</span></td>
              <td>-</td>
              <td>Database Systems<br /><span className="room">Room 302</span></td>
              <td>-</td>
            </tr>
            <tr>
              <td>12:00 - 1:00</td>
              <td colSpan="5" className="break">Lunch Break</td>
            </tr>
            <tr>
              <td>1:00 - 2:30</td>
              <td>-</td>
              <td>-</td>
              <td>Software Engineering<br /><span className="room">Room 303</span></td>
              <td>-</td>
              <td>Software Engineering<br /><span className="room">Room 303</span></td>
            </tr>
            <tr>
              <td>2:30 - 4:00</td>
              <td>Mobile App Dev<br /><span className="room">Room 305</span></td>
              <td>-</td>
              <td>-</td>
              <td>AI Fundamentals<br /><span className="room">Room 304</span></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Timetable;