  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import './Home.css';
  import { useUser } from '../context/UserContext'; // Import UserContext

  const Home = () => {
    const { user } = useUser(); // Access the user from context
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs?title=${jobTitle}&location=${location}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error('Expected an array but got:', data);
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
  };

  return (
    <div className="home">
      <h2>Job Search</h2>
      
      {/* Conditional rendering based on user authentication */}
      {user ? (
        <h3>Welcome, {user.name}!</h3>
      ) : (
        <div>
          <p>Please <Link to="/login">log in</Link> to access personalized features.</p>
        </div>
      )}

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
            <div className="job-card" key={job.jobId}>
              <p><strong>Job ID:</strong> <Link to={`/jobs/${job.jobId}`}>{job.jobId}</Link></p>
              <p><strong>Summary:</strong> {job.description}</p>
              <p><strong>Tech Skills:</strong> {job.techSkills}</p>
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
