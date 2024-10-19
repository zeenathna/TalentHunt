// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success'; // Import the Success page
import { UserProvider, useUser } from './context/UserContext'; // Import UserProvider and useUser
import './App.css'; // Optional: For styling

function App() {
  return (
    <UserProvider>
      <Router>
        <HeaderContainer />
        <div className="layout">
          <div className="left">
            <h3>Job Categories</h3>
            <ul>
              <li><Link to="/jobs">IT Jobs</Link></li>
              <li><Link to="/jobs">Marketing Jobs</Link></li>
              <li><Link to="/jobs">Engineering Jobs</Link></li>
              <li><Link to="/jobs">Healthcare Jobs</Link></li>
            </ul>
          </div>
          <div className="center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </div>
          <div className="right">
            <h3>Advertisements</h3>
            <p>Your ads or additional links can go here.</p>
          </div>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
}

// Create a separate HeaderContainer to access user context
const HeaderContainer = () => {
  const { user, logout } = useUser(); // Get user and logout function from context
  return <Header user={user} onLogout={logout} />; // Pass user and onLogout to Header
};

export default App;