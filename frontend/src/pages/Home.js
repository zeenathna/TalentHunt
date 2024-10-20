// src/pages/Home.js
import React, { useState } from 'react';
import './Home.css'; // Optional: Create this for styling

const Home = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleSearch = async () => {
    // Fetch jobs from your AWS DynamoDB here
    // Example: You would use fetch or axios to get data from your API endpoint
    const response = await fetch('/api/jobs?title=' + jobTitle + '&location=' + location);
    const data = await response.json();
    setJobs(data); // Assuming the data is an array of job objects
  };

  return (
    <div className="home">
      <h2>Job Search</h2>
      <div className="job-search-form">
        <input
          type="text"
          placeholder="Job Title / Skill"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search Jobs</button>
        <a href="#" onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}>
          {showAdvancedSearch ? 'Hide Advanced Search' : 'Advanced Search'}
        </a>
      </div>
      {showAdvancedSearch && (
        <div className="advanced-search">
          {/* Add advanced search fields here */}
          <h3>Advanced Search</h3>
          {/* Example additional fields can be added */}
        </div>
      )}
      <div className="job-results">
        {jobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3>{job.title}</h3>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Summary:</strong> {job.summary}</p>
            <p><strong>Job ID:</strong> {job.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
