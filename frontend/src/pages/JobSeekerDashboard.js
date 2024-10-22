import React, { useState, useEffect } from 'react';
import './JobSeekerDashboard.css'; // Add relevant styles

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Software Developer',
    location: 'Phoenix, AZ',
    visaStatus: 'H1B'
  });

  useEffect(() => {
    // Fetch job recommendations, saved jobs, etc.
    fetch('http://localhost:5000/api/recommended-jobs')
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div className="dashboard-container">
      {/* Left Section: Navigation/Filters */}
      <aside className="dashboard-sidebar">
        <div className="profile-summary">
          <img src="/path/to/profile-pic.jpg" alt="Profile" className="profile-pic" />
          <h3>{profile.name}</h3>
          <p>{profile.title}</p>
          <p>{profile.location}</p>
          <p>Visa Status: {profile.visaStatus}</p>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><a href="/dashboard">Dashboard Overview</a></li>
            <li><a href="/search-jobs">Job Search</a></li>
            <li><a href="/saved-jobs">Saved Jobs</a></li>
            <li><a href="/applied-jobs">Applied Jobs</a></li>
            <li><a href="/profile">Profile Management</a></li>
            <li><a href="/alerts">Job Alerts</a></li>
            <li><a href="/settings">Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Center Section: Main Content (Job Listings/Recommendations) */}
      <main className="dashboard-main">
        <div className="job-search">
          <input type="text" placeholder="Search jobs by title or company" className="search-bar" />
          <button type="button" className="search-button">Search</button>
        </div>

        <div className="job-recommendations">
          <h2>Recommended Jobs</h2>
          {jobs.length > 0 ? (
            <ul className="job-list">
              {jobs.map((job) => (
                <li key={job.id} className="job-item">
                  <h3>{job.title}</h3>
                  <p>{job.companyName}</p>
                  <p>{job.location}</p>
                  <button type="button">Apply Now</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No job recommendations available.</p>
          )}
        </div>
      </main>

      {/* Right Section: Additional Resources/Insights */}
      <aside className="dashboard-right">
        <div className="resources-section">
          <h3>Career Resources</h3>
          <ul>
            <li><a href="/resume-builder">Resume Builder</a></li>
            <li><a href="/interview-tips">Interview Tips</a></li>
            <li><a href="/market-trends">Job Market Trends</a></li>
          </ul>
        </div>

        <div className="events-section">
          <h3>Upcoming Events</h3>
          <ul>
            <li>Webinar: How to Ace Remote Interviews - Oct 25</li>
            <li>Career Fair: Tech Jobs Expo - Nov 1</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default JobSeekerDashboard;
