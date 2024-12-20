import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './JobDetails.css'; 
import { useUser } from '../context/UserContext'; 

const JobDetails = ({ jobId }) => { // Receive jobId as a prop
  const navigate = useNavigate();
  const { user } = useUser();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  // Fetch job details when jobId changes
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (jobId) { // Check if jobId is available
        try {
          console.log('>>>', jobId);
          const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
          setJob(response.data);
        } catch (err) {
          setError('Could not fetch job details');
        }
      }
    };
    fetchJobDetails();
  }, [jobId]);

  // Function to handle job application
  const storeJobApplication = async (email) => {
    try {
      await axios.post('http://localhost:5000/api/jobs/apply', {
        jobId: job.jobId,
        jobTitle: job.title,
        email: email, // Use the user's email
        dateapplied: new Date().toISOString(),
        emailsent: false,
      });
      
      // Redirect to confirmation page on successful application
      navigate('/confirmation', { state: { jobTitle: job.title, jobId: job.jobId } });
    } catch (err) {
      console.log(err);
      setError('Failed to apply for the job');
    }
  };

  // Handle the apply button click
  const handleApplyClick = () => {
    if (user) {
      storeJobApplication(user.email); // Apply using the logged-in user's email
    } else {
      // Redirect to login, storing job details in state
      navigate('/login', { state: { fromApply: true, jobId: job.jobId, jobTitle: job.title } });
    }
  };

  // Show error message if there's an issue fetching job details
  if (error) {
    return <div>{error}</div>;
  }

  // Show loading spinner if the job is still being fetched
  if (!job) {
    return <div>Loading...</div>;
  }

  // Render job details and apply button
  return (
    <div className="job-details">
      <button className="apply-button" onClick={handleApplyClick}>Apply</button> 

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
