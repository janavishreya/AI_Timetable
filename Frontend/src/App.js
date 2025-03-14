import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  
  // Check session on page load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/check-session", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.user) {
          setIsLoggedIn(true);
          setUser(data.user);
          setUserType(data.user.role);
        }
      } catch (error) {
        console.error("Session check failed", error);
      }
    };

    checkSession();
  }, []);

  const handleLogin = (userData) => {
    if (!userData || !userData.username) {
      console.error("Invalid user data received:", userData);
      alert("Login failed. Please try again.");
      return;
    }
  
    setIsLoggedIn(true);
    setUser(userData);
    setUserType(userData.role);
  };
  

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsLoggedIn(false);
      setUser(null);
      setUserType(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        userType === 'admin' ? (
          <AdminDashboard user={user} onLogout={handleLogout} />
        ) : (
          <Dashboard user={user} onLogout={handleLogout} />
        )
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
