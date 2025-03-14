import React, { useState } from 'react';
import { departments, rooms, timeSlots, days, facultyMembers, courses } from '../../../data/adminData';

function TimetableGenerator({ onGenerateTimetable }) {
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [timetableName, setTimetableName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredCourses = courses.filter(course => 
    (!department || course.department === department) &&
    (!semester || course.semester === semester)
  );

 
  const handleCourseSelection = (e) => {
    const courseId = e.target.value;
    if (e.target.checked) {
      setSelectedCourses([...selectedCourses, courseId]);
    } else {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!timetableName) {
      alert('Please enter a name for the timetable');
      return;
    }
    
    if (selectedCourses.length === 0) {
      alert('Please select at least one course');
      return;
    }
    
 
    
    setIsLoading(true);
    
    // In a real application, this would be a complex algorithm
    // For demo purposes, we'll create a simple timetable
    setTimeout(() => {
      const generatedTimetable = {
        name: timetableName,
        department: department,
        semester: semester,
        createdOn: new Date().toLocaleDateString(),
        schedule: generateMockSchedule()
      };
      
      setIsLoading(false);
      onGenerateTimetable(generatedTimetable);
    }, 1500);
  };
  
  // Generate a mock schedule for demonstration
  const generateMockSchedule = () => {
    const schedule = {};
    
    days.forEach(day => {
      schedule[day] = {};
      timeSlots.forEach(timeSlot => {
        schedule[day][timeSlot] = [];
      });
    });
    
    // Assign courses to time slots
    let courseIndex = 0;
  
    selectedCourses.forEach(courseId => {
      const course = courses.find(c => c.id === courseId);
      const day = days[courseIndex % days.length];
      const timeSlot = timeSlots[courseIndex % timeSlots.length];
      
      schedule[day][timeSlot].push({
        courseId: course.id,
        courseName: course.name
      });
      
      courseIndex++;
      
    });
    
    return schedule;
  };

  return (
    <section className="dashboard-section">
      <h2>Timetable Generator</h2>
      
      {isLoading ? (
        <div className="loading-container">
          <p>Generating timetable... Please wait.</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="timetable-generator-form">
          <div className="form-section">
            <h3>Timetable Information</h3>
            <div className="form-group">
              <label htmlFor="timetable-name">Timetable Name</label>
              <input 
                type="text" 
                id="timetable-name" 
                value={timetableName}
                onChange={(e) => setTimetableName(e.target.value)}
                placeholder="e.g., Fall Semester 2023"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select 
                  id="department" 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <select 
                  id="semester" 
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">All Semesters</option>
                  <option value="1st">1st Semester</option>
                  <option value="2nd">2nd Semester</option>
                  <option value="3rd">3rd Semester</option>
                  <option value="4th">4th Semester</option>
                  <option value="5th">5th Semester</option>
                  <option value="6th">6th Semester</option>
                  <option value="7th">7th Semester</option>
                  <option value="8th">8th Semester</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Select Courses</h3>
            <div className="checkbox-grid">
              {filteredCourses.map(course => (
                <div key={course.id} className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id={`course-${course.id}`} 
                    value={course.id}
                    onChange={handleCourseSelection}
                    checked={selectedCourses.includes(course.id)}
                  />
                  <label htmlFor={`course-${course.id}`}>
                    {course.name} ({course.id})
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          
          
          <div className="form-actions">
            <button type="submit" className="btn">Generate Timetable</button>
            <button type="button" className="btn btn-secondary" onClick={() => {
              setDepartment('');
              setSemester('');
              setSelectedCourses([]);
              setTimetableName('');
            }}>
              Reset Form
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default TimetableGenerator;