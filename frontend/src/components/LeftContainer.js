import React from 'react';
import './global.css'; // Ensure this path is correct

const LeftContainer = ({ contentType }) => {
  let content;

  switch (contentType) {
    case 'jobs':
      content = (
        <div>
          <h2>Jobs Sidebar</h2>
          <ul>
            <li><a href="/saved-jobs">Saved Jobs</a></li>
            <li><a href="/applied-jobs">Applied Jobs</a></li>
            <li><a href="/job-alerts">Job Alerts</a></li>
          </ul>
        </div>
      );
      break;
    case 'auth':
      content = (
        <div>
          <h2>Auth Sidebar</h2>
          <ul>
            <li><a href="/forgot-password">Forgot Password</a></li>
            <li><a href="/help">Help Center</a></li>
          </ul>
        </div>
      );
      break;
    case 'dashboard':
      content = (
        <div>
          <h2>Dashboard Sidebar</h2>
          <ul>
            <li><a href="/jobsapplied">Jobs Applied</a></li>
            <li><a href="/jobsrecomm">Recommended Jos</a></li>
          </ul>
        </div>
      );
      break;
    case 'addJobs':
      content = (
        <div>
          <h2>Add Job Sidebar</h2>
          <ul>
            <li><a href="/view-jobs">View Posted Jobs</a></li>
            <li><a href="/job-templates">Job Templates</a></li>
          </ul>
        </div>
      );
      break;
    case 'info':
      content = (
        <div>
          <h2>Info Sidebar</h2>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      );
      break;
    default:
      content = <div>No Additional Information Available</div>;
  }

  return <div className="left-container">{content}</div>; // Correct class name
};

export default LeftContainer;
