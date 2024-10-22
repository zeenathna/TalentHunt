import React, { useState, useEffect } from 'react';
import './JobSeekerDashboard.css';

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Software Developer',
    location: 'Phoenix, AZ',
    visaStatus: 'H1B'
  });

  useEffect(() => {
    // Fetch job recommendations
    fetch('http://localhost:5000/api/recommended-jobs')
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div className="dashboard-main">
      <div className="profile-summary">
        <img src="/path/to/profile-pic.jpg" alt="Profile" className="profile-pic" />
        <h3>{profile.name}</h3>
        <p>{profile.title}</p>
        <p>{profile.location}</p>
        <p>Visa Status: {profile.visaStatus}</p>
      </div>

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
    </div>
  );
};

export default JobSeekerDashboard;
