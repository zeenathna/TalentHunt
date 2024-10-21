import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './JobDetails.css'; 
import LoginModal from './LoginModal'; 
import { useUser } from '../context/UserContext'; 

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser(); 
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); 

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

  const storeJobApplication = async (email) => {
    alert('>>>',email);
    if (!user || !email || email.trim() === '') {
      console.error("User is not logged in or email is invalid");
      setError('You need to be logged in to apply for a job.');
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/api/jobs/apply', {
        jobId: job.jobId,
        jobTitle: job.title,
        email: email, // Use the passed email
        dateapplied: new Date().toISOString(),
        emailsent: false,
      });
      
      navigate('/confirmation', { state: { jobTitle: job.title, jobId: job.jobId } });
    } catch (err) {
      console.log(err);
      setError('Failed to apply for the job');
    }
  };

  const handleApplyClick = () => {
    if (user) {
      storeJobApplication(user.email); // Pass the user's email
    } else {
      setShowModal(true);
    }
  };

  // Callback to handle login success
  const handleLoginSuccess = (email) => {
    storeJobApplication(email); // Pass the email from the login modal
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

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

      {showModal && (
        <LoginModal closeModal={() => setShowModal(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default JobDetails;
