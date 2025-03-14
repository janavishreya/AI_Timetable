import React from 'react';
import { coursesData } from '../../data/facultyData';

function Courses() {
  return (
    <section className="dashboard-section">
      <h2>Courses & Subjects Allocation</h2>
      <div className="courses-list">
        {coursesData.map(course => (
          <div className="course-item" key={course.id}>
            <h3>{course.name}</h3>
            <p><strong>Course Code:</strong> {course.id}</p>
            <p><strong>Department:</strong> {course.department}</p>
            <p><strong>Semester:</strong> {course.semester}</p>
            <p><strong>Students:</strong> {course.students}</p>
            <p><strong>Schedule:</strong> {course.schedule}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Courses;