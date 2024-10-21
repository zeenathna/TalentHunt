import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { jobTitle, jobId } = location.state || {};

  if (!jobTitle || !jobId) {
    // If no state is provided (e.g., someone accesses the page directly), navigate back to the homepage
    navigate('/');
    return null;
  }

  return (
    <div className="confirmation-page">
      <h2>Application Confirmation</h2>
      <p>Thank you for applying to the position: <strong>{jobTitle}</strong> (Job ID: {jobId})</p>
      <p>We have received your application and will get back to you soon. store in db & since login hide login signup links</p>
    </div>
  );
};

export default Confirmation;
