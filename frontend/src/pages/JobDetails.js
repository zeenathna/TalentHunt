import React from 'react';
import { useParams } from 'react-router-dom';

function JobDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Job Details for Job ID: {id}</h2>
      <p>Job description, qualifications, and requirements go here.</p>
    </div>
  );
}

export default JobDetails;
