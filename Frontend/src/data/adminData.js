// Sample admin data
export const adminData = {
    id: "ADM-2023-001",
    name: "Admin User",
    department: "Administration",
    designation: "System Administrator",
    email: "admin@university.edu",
    phone: "(123) 456-7890",
    joinDate: "January 10, 2017",
    username: "admin",
    password: "admin123" // In a real application, this would be hashed
  };
  
  // Sample saved timetables
  export const savedTimetables = [
    {
      id: "TT-2023-FALL",
      name: "Fall Semester 2023",
      department: "Computer Science",
      createdOn: "July 15, 2023",
      lastModified: "August 10, 2023",
      status: "Active"
    },
    {
      id: "TT-2023-SPRING",
      name: "Spring Semester 2023",
      department: "Computer Science",
      createdOn: "December 10, 2022",
      lastModified: "January 5, 2023",
      status: "Archived"
    },
    {
      id: "TT-2023-SUMMER",
      name: "Summer Semester 2023",
      department: "Computer Science",
      createdOn: "April 20, 2023",
      lastModified: "May 1, 2023",
      status: "Archived"
    }
  ];
  
  // Sample departments
  export const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Business Administration"
  ];
  
  // Sample rooms
  export const rooms = [
    "Room 101",
    "Room 102",
    "Room 103",
    "Room 201",
    "Room 202",
    "Room 203",
    "Lab 101",
    "Lab 102"
  ];
  
  // Sample time slots
  export const timeSlots = [
    "9:00 - 10:30",
    "10:30 - 12:00",
    "1:00 - 2:30",
    "2:30 - 4:00"
  ];
  
  // Sample days
  export const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ];
  
  // Sample faculty members
  export const facultyMembers = [
    {
      id: "FAC-2023-001",
      name: "Dr. John Smith",
      department: "Computer Science",
      specialization: "Software Engineering, Web Technologies"
    },
    {
      id: "FAC-2023-002",
      name: "Dr. Sarah Johnson",
      department: "Computer Science",
      specialization: "Artificial Intelligence, Machine Learning"
    },
    {
      id: "FAC-2023-003",
      name: "Prof. Michael Brown",
      department: "Computer Science",
      specialization: "Database Systems, Data Mining"
    },
    {
      id: "FAC-2023-004",
      name: "Dr. Emily Davis",
      department: "Computer Science",
      specialization: "Computer Networks, Cybersecurity"
    }
  ];
  
  // Sample courses
  export const courses = [
    {
      id: "CS301",
      name: "Web Development",
      department: "Computer Science",
      semester: "5th",
      credits: 3
    },
    {
      id: "CS302",
      name: "Database Systems",
      department: "Computer Science",
      semester: "5th",
      credits: 3
    },
    {
      id: "CS303",
      name: "Software Engineering",
      department: "Computer Science",
      semester: "5th",
      credits: 4
    },
    {
      id: "CS304",
      name: "Artificial Intelligence",
      department: "Computer Science",
      semester: "6th",
      credits: 3
    },
    {
      id: "CS305",
      name: "Mobile App Development",
      department: "Computer Science",
      semester: "6th",
      credits: 3
    }
  ];