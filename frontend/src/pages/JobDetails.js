import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import './JobDetails.css'; // Import CSS for styling

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (err) {
        setError('Could not fetch job details');
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details">
      <button className="apply-button">Apply</button> {/* Apply button */}
      <h1>{job.title}</h1>
      <div className="job-details-container">
        <p><strong>Job ID:</strong> {job.jobId}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Tech Skills:</strong> {job.techSkills}</p>
        <p><strong>Role:</strong> {job.role}</p>
        <p><strong>Education:</strong> {job.education}</p>
        <p><strong>Work Experience:</strong> {job.workexperience}</p>
        <p><strong>Work Mode:</strong> {job.workMode}</p>
        <p><strong>Part/Full Time:</strong> {job.partFullTime}</p>
        <p><strong>Sponsorship:</strong> {job.sponsership}</p>
        <p><strong>Visa Status:</strong> {job.visastatus}</p>
        <p><strong>Created Date:</strong> {new Date(job.createddate).toLocaleDateString()}</p>
        <p><strong>Contact ID:</strong> {job.contactid}</p>
      </div>
    </div>
  );
};

export default JobDetails;
