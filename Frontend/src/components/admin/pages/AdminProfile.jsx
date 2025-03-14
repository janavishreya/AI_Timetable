import React, { useState } from 'react';

function AdminProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would update the user data
    alert('Profile updated successfully!');
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setProfileData({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
    setIsEditing(false);
  };

  return (
    <section className="dashboard-section">
      <h2>Admin Profile</h2>
      
      <div className="profile-container">
        <div className="profile-image">
          <img src="https://via.placeholder.com/150" alt="Admin Profile" />
        </div>
        
        <div className="profile-details">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                  type="text" 
                  id="phone" 
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn">Save Changes</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
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
                <h3>Account Information</h3>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Joined:</strong> {user.joinDate}</p>
                <p><strong>Last Login:</strong> Today, 9:30 AM</p>
              </div>
            </>
          )}
        </div>
      </div>
      
      {!isEditing && (
        <div className="profile-edit">
          <button className="btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
          <button className="btn btn-secondary">
            Change Password
          </button>
        </div>
      )}
      
      <div className="admin-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>Generated Fall Semester 2023 timetable (2 days ago)</li>
          <li>Updated system settings (1 week ago)</li>
          <li>Added new faculty member (2 weeks ago)</li>
          <li>Generated Spring Semester 2023 timetable (6 months ago)</li>
        </ul>
      </div>
    </section>
  );
}

export default AdminProfile;