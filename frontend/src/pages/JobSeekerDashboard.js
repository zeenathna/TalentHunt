import React, { useState, useEffect } from 'react'; 
import './JobSeekerDashboard.css';

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedSection, setSelectedSection] = useState('recommended'); // Track which section is active
  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Software Developer',
    location: 'Phoenix, AZ',
    visaStatus: 'H1B'
  });

  useEffect(() => {
    // Fetch recommended jobs
    fetch('http://localhost:5000/api/recommended-jobs')
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));

    // Fetch applied jobs
    const email = 'jobseeker@example.com'; // Replace with the actual logged-in user's email
    fetch(`http://localhost:5000/api/applied-jobs?email=${email}`)
      .then((response) => response.json())
      .then((data) => setAppliedJobs(data))
      .catch((error) => console.error('Error fetching applied jobs:', error));
  }, []);

  const renderJobs = () => {
    if (selectedSection === 'recommended') {
      return (
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
      );
    } else if (selectedSection === 'applied') {
      return (
        <div className="applied-jobs">
          <h2>Applied Jobs</h2>
          {appliedJobs.length > 0 ? (
            <ul className="applied-job-list">
              {appliedJobs.map((job) => (
                <li key={job.jobId} className="applied-job-item">
                  <h3>{job.jobTitle}</h3>
                  <p>{job.companyName}</p>
                  <p>{job.location}</p>
                  <p>Applied on: {new Date(job.dateApplied).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven't applied to any jobs yet.</p>
          )}
        </div>
      );
    }
  };

  return (
    <div className="dashboard-main">
      <div className="sidebar">
        <h3>Dashboard</h3>
        <ul>
          <li 
            className={selectedSection === 'recommended' ? 'active' : ''} 
            onClick={() => setSelectedSection('recommended')}
          >
            Recommended Jobs
          </li>
          <li 
            className={selectedSection === 'applied' ? 'active' : ''} 
            onClick={() => setSelectedSection('applied')}
          >
            Applied Jobs
          </li>
        </ul>
      </div>

      <div className="content">
        {renderJobs()}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
