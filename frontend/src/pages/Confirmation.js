import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { jobTitle, jobId } = location.state || {};

  console.log('Received in confirmation:', location.state);  // Log entire state
  return (
    <div className="confirmation-page">
      <h2>Application Confirmation</h2>
      <p>Thank you for applying to the position: <strong>{jobTitle}</strong> (Job ID: {jobId})</p>
      <p>We have received your application and will get back to you soon.</p>
    </div>
  );
};

export default Confirmation;
