import './style.css'

// Sample faculty data
const facultyData = {
  id: "FAC-2023-001",
  name: "Dr. John Smith",
  department: "Computer Science",
  designation: "Associate Professor",
  email: "john.smith@university.edu",
  phone: "(123) 456-7890",
  specialization: "Software Engineering, Web Technologies",
  joinDate: "August 15, 2018",
  totalCoursesTaught: 12,
  username: "jsmith",
  password: "password123" // In a real application, this would be hashed
};

// Sample course data
const coursesData = [
  {
    id: "CS301",
    name: "Web Development",
    department: "Computer Science",
    semester: "5th",
    students: 45,
    schedule: "Monday, Wednesday (9:00 - 10:30)",
    room: "Room 301"
  },
  {
    id: "CS302",
    name: "Database Systems",
    department: "Computer Science",
    semester: "5th",
    students: 40,
    schedule: "Tuesday, Thursday (10:30 - 12:00)",
    room: "Room 302"
  },
  {
    id: "CS303",
    name: "Software Engineering",
    department: "Computer Science",
    semester: "5th",
    students: 38,
    schedule: "Wednesday, Friday (1:00 - 2:30)",
    room: "Room 303"
  },
  {
    id: "CS305",
    name: "Mobile App Development",
    department: "Computer Science",
    semester: "6th",
    students: 35,
    schedule: "Monday (2:30 - 4:00), Friday (9:00 - 10:30)",
    room: "Room 305"
  }
];

// DOM Elements
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const facultyNameElement = document.getElementById('faculty-name');
const navLinks = document.querySelectorAll('.sidebar a');
const dashboardSections = document.querySelectorAll('.dashboard-section');
const scheduleChangeForm = document.getElementById('schedule-change-form');
const courseSelect = document.getElementById('course-select');
const currentSchedule = document.getElementById('current-schedule');
const editProfileBtn = document.getElementById('edit-profile-btn');

// Login Form Submission
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Simple authentication (in a real app, this would be done server-side)
  if (username === facultyData.username && password === facultyData.password) {
    loginContainer.classList.add('hidden');
    dashboardContainer.classList.remove('hidden');
    facultyNameElement.textContent = `Welcome, ${facultyData.name}`;
  } else {
    alert('Invalid username or password. Please try again.');
  }
});

// Logout Button
logoutBtn.addEventListener('click', function() {
  dashboardContainer.classList.add('hidden');
  loginContainer.classList.remove('hidden');
  loginForm.reset();
});

// Navigation
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    this.classList.add('active');
    
    // Show corresponding section
    const sectionId = this.getAttribute('data-section') + '-section';
    dashboardSections.forEach(section => {
      section.classList.remove('active');
      if (section.id === sectionId) {
        section.classList.add('active');
      }
    });
  });
});

// Course Select Change
courseSelect.addEventListener('change', function() {
  const selectedCourseId = this.value;
  if (selectedCourseId) {
    const selectedCourse = coursesData.find(course => course.id === selectedCourseId);
    currentSchedule.value = selectedCourse.schedule;
  } else {
    currentSchedule.value = '';
  }
});

// Schedule Change Form Submission
scheduleChangeForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const courseId = courseSelect.value;
  const requestedDay = document.getElementById('requested-day').value;
  const requestedTime = document.getElementById('requested-time').value;
  const reason = document.getElementById('reason').value;
  
  // In a real application, this would be sent to a server
  alert(`Schedule change request submitted for ${courseId}.\nRequested: ${requestedDay} at ${requestedTime}\nReason: ${reason}`);
  
  this.reset();
  currentSchedule.value = '';
});

// Edit Profile Button
editProfileBtn.addEventListener('click', function() {
  alert('Profile editing functionality would be implemented here.');
});

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Set faculty name in profile section
  const profileSection = document.getElementById('profile-section');
  if (profileSection) {
    const nameElement = profileSection.querySelector('p:nth-child(2)');
    if (nameElement) {
      nameElement.innerHTML = `<strong>Name:</strong> ${facultyData.name}`;
    }
  }
});