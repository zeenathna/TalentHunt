// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';  
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import Signup from './pages/Signup';
import Success from './pages/Success'; 
import Confirmation from './pages/Confirmation';
import { UserProvider, useUser } from './context/UserContext';
import './App.css'; 
import AddJobs from './pages/AddJobs';
import MainLayout from './components/MainLayout'; // Import the MainLayout component

function App() {
  return (
    <UserProvider>
      <Router>
        <HeaderContainer />
        <Routes>
          <Route path="/" element={<MainLayout centerContent={<Home />} leftContent={null} rightContent={null} />} /> {/* No left/right for Home */}
          <Route path="/jobs" element={<MainLayout leftContent={<JobCategories />} centerContent={<Jobs />} rightContent={<Advertisements />} />} />
          <Route path="/jobs/:jobId" element={<MainLayout leftContent={<JobCategories />} centerContent={<JobDetails />} rightContent={<Advertisements />} />} />
          <Route path="/login" element={<MainLayout leftContent={<JobCategories />} centerContent={<Login />} rightContent={<Advertisements />} />} />
          <Route path="/jobseekerdashboard" element={<MainLayout leftContent={<JobCategories />} centerContent={<JobSeekerDashboard />} rightContent={<Advertisements />} />} />
          <Route path="/signup-job-seeker" element={<MainLayout leftContent={<JobCategories />} centerContent={<Signup />} rightContent={<Advertisements />} />} />
          <Route path="/success" element={<MainLayout leftContent={<JobCategories />} centerContent={<Success />} rightContent={<Advertisements />} />} />
          <Route path="/confirmation" element={<MainLayout leftContent={<JobCategories />} centerContent={<Confirmation />} rightContent={<Advertisements />} />} />
          <Route path="/addjobs" element={<MainLayout leftContent={<JobCategories />} centerContent={<AddJobs />} rightContent={<Advertisements />} />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

// JobCategories Component for Left Section
const JobCategories = () => (
  <div>
    <h3>Job Categories</h3>
    <ul>
      <li><Link to="/jobs">IT Jobs</Link></li>
      <li><Link to="/jobs">Marketing Jobs</Link></li>
      <li><Link to="/jobs">Engineering Jobs</Link></li>
      <li><Link to="/jobs">Healthcare Jobs</Link></li>
    </ul>
  </div>
);

// Advertisements Component for Right Section
const Advertisements = () => (
  <div>
    <h3>Advertisements</h3>
    <p>Your ads or additional links can go here.</p>
  </div>
);

// HeaderContainer to access and manage user state from context
const HeaderContainer = () => {
  const { user, logout } = useUser();
  return <Header user={user} onLogout={logout} />;
};

export default App;
