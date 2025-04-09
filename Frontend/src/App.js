import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import TimetableGenerator from "./components/admin/pages/TimetableGenerator";
import TimetableDisplay from "./components/admin/pages/TimetableDisplay";
import AdminProfile from "./components/admin/pages/AdminProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [generatedTimetable, setGeneratedTimetable] = useState(null);

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

  const handleGenerateTimetable = (timetable) => {
    setGeneratedTimetable(timetable);
  };

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              userType === "admin" ? (
                <AdminDashboard user={user} onLogout={handleLogout}>
                  <TimetableGenerator onGenerateTimetable={handleGenerateTimetable} />
                </AdminDashboard>
              ) : (
                <Dashboard user={user} onLogout={handleLogout}>
                  <TimetableGenerator onGenerateTimetable={handleGenerateTimetable} />
                </Dashboard>
              )
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Admin Profile Route */}
        <Route
          path="/admin-profile"
          element={
            isLoggedIn && userType === "admin" ? (
              <AdminDashboard user={user} onLogout={handleLogout}>
                <AdminProfile user={user} />
              </AdminDashboard>
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Timetable Display Route */}
        <Route
          path="/timetable-display"
          element={<TimetableDisplay />}
        />
      </Routes>
    </Router>
  );
}

export default App;
