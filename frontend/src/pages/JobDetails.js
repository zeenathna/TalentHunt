import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './JobDetails.css'; 

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleApplyClick = () => {
    setShowModal(true);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.status === 200) {
        setShowModal(false);
        navigate('/confirmation', { state: { jobTitle: job.title, jobId: job.jobId } });
      }
    } catch (err) {
      setLoginError('Invalid credentials');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setLoginError('');
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
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Login to Apply</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError && <p className="error">{loginError}</p>}
            <div className="modal-buttons">
              <button onClick={handleLogin}>Login</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
