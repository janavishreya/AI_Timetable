import React from 'react';

function Profile({ user }) {
  const handleEditProfile = () => {
    alert('Profile editing functionality would be implemented here.');
  };

  return (
    <section className="dashboard-section">
      <h2>Faculty Profile</h2>
      <div className="profile-container">
        <div className="profile-image">
          <img src="https://via.placeholder.com/150" alt="Faculty Profile" />
        </div>
        <div className="profile-details">
          <div className="profile-item">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Department:</strong> {user.department}</p>
            <p><strong>Designation:</strong> {user.designation}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
          <div className="profile-item">
            <h3>Academic Information</h3>
            <p><strong>Specialization:</strong> {user.specialization}</p>
            <p><strong>Joined:</strong> {user.joinDate}</p>
            <p><strong>Total Courses Taught:</strong> {user.totalCoursesTaught}</p>
          </div>
        </div>
      </div>
      <div className="profile-edit">
        <button id="edit-profile-btn" className="btn" onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>
    </section>
  );
}

export default Profile;