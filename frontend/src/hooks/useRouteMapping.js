import { useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import JobDetails from '../pages/JobDetails';
import Login from '../pages/Login';  
import JobSeekerDashboard from '../pages/JobSeekerDashboard';
import Signup from '../pages/Signup';
import Success from '../pages/Success'; 
import Confirmation from '../pages/Confirmation';
import AddJobs from '../pages/AddJobs';
import LeftContainer from '../components/LeftContainer';

export const useRouteMapping = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const routeMappings = {
    '/': {
      leftContent: null,
      centerContent: <Home />,
      rightContent: null,
    },
    '/jobs': {
      leftContent: <LeftContainer />,  // or your custom Jobs Menu
      centerContent: <Jobs />,
      rightContent: null,
    },
    '/jobs/:jobId': {
      leftContent: <LeftContainer />,
      centerContent: <JobDetails />,
      rightContent: null,
    },
    '/login': {
      leftContent: <div>Login Options</div>,
      centerContent: <Login />,
      rightContent: null,
    },
    '/jobseekerdashboard': {
      leftContent: <div>Dashboard Menu</div>,
      centerContent: <JobSeekerDashboard />,
      rightContent: null,
    },
    '/signup-job-seeker': {
      leftContent: <div>Signup Options</div>,
      centerContent: <Signup />,
      rightContent: null,
    },
    '/success': {
      leftContent: <div>Success Info</div>,
      centerContent: <Success />,
      rightContent: null,
    },
    '/confirmation': {
      leftContent: <div>Confirmation Info</div>,
      centerContent: <Confirmation />,
      rightContent: null,
    },
    '/addjobs': {
      leftContent: <div>Add Job Menu</div>,
      centerContent: <AddJobs />,
      rightContent: null,
    },
  };

  return routeMappings[currentPath] || {
    leftContent: <LeftContainer />,
    centerContent: <div>404 Not Found</div>,
    rightContent: null,
  };
};
