import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success'; 
import { UserProvider, useUser } from './context/UserContext';
import './App.css'; 

function App() {
  return (
    <UserProvider>
      <Router>
        <HeaderContainer />
        <Routes>
          <Route path="/" element={<Home />} />  {/* Landing Page */}
          <Route path="/jobs" element={<MainLayout><Jobs /></MainLayout>} />
          <Route path="/jobs/:jobId" element={<MainLayout><JobDetails /></MainLayout>} /> {/* Update route to match JobDetails */}
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/signup-job-seeker" element={<MainLayout><Signup /></MainLayout>} />
          <Route path="/success" element={<MainLayout><Success /></MainLayout>} />
        </Routes>
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

// Main layout with left, center, and right sections
const MainLayout = ({ children }) => (
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
      {children}
    </div>
    <div className="right">
      <h3>Advertisements</h3>
      <p>Your ads or additional links can go here.</p>
    </div>
  </div>
);

export default App;
