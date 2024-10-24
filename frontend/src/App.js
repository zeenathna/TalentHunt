import React from 'react';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import AddJobs from './pages/AddJobs';
import MainLayout from './components/MainLayout';
import LeftContainer from './components/LeftContainer';
import RightContainer from './components/RightContainer';
import './components/global.css';


const routeMappings = {
  '/': {
    leftContent: null,
    centerContent: <Home />,
    rightContent: null,
  },
  '/jobs': {
    leftContent: <LeftContainer contentType="jobs" />,
    centerContent: <Jobs />,
    rightContent: <RightContainer contentType="jobs" />,
  },
  '/jobs/:jobId': {
    leftContent: <LeftContainer contentType="jobs" />,
    centerContent: <JobDetails />, // JobDetails will get jobId via props
    rightContent: <RightContainer contentType="jobs" />,
  },
  '/login': {
    leftContent: <LeftContainer contentType="auth" />,
    centerContent: <Login />,
    rightContent: <RightContainer contentType="auth" />,
  },
  '/jobseekerdashboard': {
    leftContent: <LeftContainer contentType="dashboard" />,
    centerContent: <JobSeekerDashboard />,
    rightContent: <RightContainer contentType="dashboard" />,
  },
  '/signup-job-seeker': {
    leftContent: <LeftContainer contentType="auth" />,
    centerContent: <Signup />,
    rightContent: <RightContainer contentType="auth" />,
  },
  '/success': {
    leftContent: <LeftContainer contentType="info" />,
    centerContent: <Success />,
    rightContent: <RightContainer contentType="info" />,
  },
  '/confirmation': {
    leftContent: <LeftContainer contentType="info" />,
    centerContent: <Confirmation />,
    rightContent: <RightContainer contentType="info" />,
  },
  '/addjobs': {
    leftContent: <LeftContainer contentType="addJobs" />,
    centerContent: <AddJobs />,
    rightContent: <RightContainer contentType="addJobs" />,
  },
  '/jobsapplied': {
    leftContent: <LeftContainer contentType="addJobs" />,
    centerContent: <AddJobs />,
    rightContent: <RightContainer contentType="addJobs" />,
  },
  '/jobsrecomm': {
    leftContent: <LeftContainer contentType="addJobs" />,
    centerContent: <AddJobs />,
    rightContent: <RightContainer contentType="addJobs" />,
  },
};

const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Function to find matching route
  const getRoute = (path) => {
    for (const key in routeMappings) {
      const regex = new RegExp('^' + key.replace(/:\w+/g, '(\\w+)') + '$');
      const match = path.match(regex);
      if (match) {
        const route = { ...routeMappings[key] }; // Copy the route
        if (key.includes(':jobId')) {
          route.centerContent = React.cloneElement(route.centerContent, { jobId: match[1] });
        }
        return route;
      }
    }
    return null; // Return null if no route matches
  };

  const { leftContent, centerContent, rightContent } = getRoute(currentPath) || {
    leftContent: null,
    centerContent: <div>404 Not Found</div>,
    rightContent: null,
  };

  return (
    <>
      <Header />
      <MainLayout leftContent={leftContent} centerContent={centerContent} rightContent={rightContent} />
      <Footer />
    </>
  );
};

const AppWrapper = () => (
  <UserProvider>  {/* Wrap the entire app in UserProvider */}
    <Router>
      <Routes>
        <Route path="/*" element={<App />} /> {/* All routes handled here */}
      </Routes>
    </Router>
  </UserProvider>
);

export default AppWrapper;
