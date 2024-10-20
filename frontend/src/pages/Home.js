import React, { useState } from 'react';
import './Home.css'; // For optional custom styles

const Home = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]); // Initialize jobs as an array

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs?title=${jobTitle}&location=${location}`);
      const data = await response.json();

      // Ensure that data is an array before setting it
      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error('Expected an array but got:', data);
        setJobs([]); // Set an empty array in case of invalid data
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]); // Set jobs to an empty array in case of error
    }
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
      </div>
      
      <div className="job-results">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="job-card" key={job.JobId}>
              <h3>{job.Title}</h3>
              <p><strong>Job ID:</strong> {job.jobId}</p>
              <p><strong>Summary:</strong> {job.description}</p>
              <p><strong>Tech:</strong> {job.tech}</p>
            </div>
          ))
        ) : (
          <p>No jobs found. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
