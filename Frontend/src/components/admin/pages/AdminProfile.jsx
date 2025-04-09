import React, { useEffect, useState } from "react";

function AdminProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/profile", {
      method: "GET",
      credentials: "include", // important for cookies/session
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to load profile");
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        console.error("❌ Error fetching profile:", err);
        setError(err.message);
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <section className="dashboard-section">
      <h2>Admin Profile</h2>
      <div className="profile-container">
        <div className="profile-image">
          <img src="https://via.placeholder.com/150" alt="Admin Profile" />
        </div>
        <div className="profile-details">
          <div className="profile-item">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>ID:</strong> {user.roleid}</p>
            <p><strong>Department:</strong> {user.department}</p>
            <p><strong>Designation:</strong> {user.designation}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
          <div className="profile-item">
            <h3>Account Information</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Joined:</strong> {new Date(user.joinDate).toDateString()}</p>
            <p><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminProfile;
