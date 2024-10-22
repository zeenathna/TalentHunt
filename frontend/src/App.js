import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import LoginSuccess from './pages/LoginSuccess';
import Signup from './pages/Signup';
import Success from './pages/Success'; 
import Confirmation from './pages/Confirmation'; // Import the new Confirmation component
import { UserProvider, useUser } from './context/UserContext';
import './App.css'; 
import AddJobs from './pages/AddJobs';

function App() {
  return (
    <UserProvider>
      <Router>
        <HeaderContainer /> {/* Encapsulate header with user context */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Landing Page */}
          <Route path="/jobs" element={<MainLayout><Jobs /></MainLayout>} />
          <Route path="/jobs/:jobId" element={<MainLayout><JobDetails /></MainLayout>} /> {/* Dynamic Job Details */}
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/loginsuccess" element={<MainLayout><LoginSuccess /></MainLayout>} />
          <Route path="/signup-job-seeker" element={<MainLayout><Signup /></MainLayout>} />
          <Route path="/success" element={<MainLayout><Success /></MainLayout>} /> {/* Success page after sign-up */}
          <Route path="/confirmation" element={<MainLayout><Confirmation /></MainLayout>} /> {/* Add this line */}
          <Route path="/addjobs" element={<MainLayout><AddJobs /></MainLayout>} /> {/* Add this line */}
        </Routes>
        <Footer /> {/* Static footer for all pages */}
      </Router>
    </UserProvider>
  );
}

// HeaderContainer to access and manage user state from context
const HeaderContainer = () => {
  const { user, logout } = useUser(); // Access user state and logout action from UserContext
  return <Header user={user} onLogout={logout} />; // Pass user state and logout function to Header
};

// Main layout that renders left sidebar, main content, and right section for advertisements
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
      {children} {/* Render main content based on the route */}
    </div>
    <div className="right">
      <h3>Advertisements</h3>
      <p>Your ads or additional links can go here.</p>
    </div>
  </div>
);

export default App;
