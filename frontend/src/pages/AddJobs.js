import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddJobs.css'; // Add necessary styling

const AddJobs = () => {
  const [jobData, setJobData] = useState({
    jobId: '', // Required
    category: '', // Optional
    companyName: '', // Optional
    companyDetails: '', // Optional
    contactId: '', // Optional
    createdBy: '', // Optional
    createdDate: '', // Optional
    description: '', // Optional
    education: '', // Optional
    isActive: true,
    location: '', // Optional
    partFullTime: '', // Optional
    role: '', // Optional
    sponsorship: '', // Optional
    techSkills: '', // Optional
    title: '', // Optional
    visaStatus: '', // Optional
    workExperience: '', // Optional
    workMode: '', // Optional
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleAddMore = async (e) => {
    e.preventDefault();

    if (!jobData.jobId) {
      alert('Job ID is required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/addjobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const jobId = jobData.jobId;
        setMessage(`Job ID #${jobId} saved successfully!`);
        
        // Clear form after saving
        setJobData({
          jobId: '',
          category: '',
          companyName: '',
          companyDetails: '',
          contactId: '',
          createdBy: '',
          createdDate: '',
          description: '',
          education: '',
          isActive: true,
          location: '',
          partFullTime: '',
          role: '',
          sponsorship: '',
          techSkills: '',
          title: '',
          visaStatus: '',
          workExperience: '',
          workMode: '',
        });
      } else {
        alert('Failed to add job');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="add-jobs-form">
        {/* Success message */}
        {message && <div className="success-message">{message}</div>} 

      <h2>Add Job</h2>

      <form onSubmit={handleAddMore}>
        <div className="form-row">
          <label htmlFor="jobId">Job ID (Required):</label>
          <input name="jobId" value={jobData.jobId} onChange={handleChange} placeholder="Job ID" required />
        </div>

        <div className="form-row">
          <label htmlFor="category">Category:</label>
          <input name="category" value={jobData.category} onChange={handleChange} placeholder="Category" />
        </div>

        <div className="form-row">
          <label htmlFor="companyName">Company Name:</label>
          <input name="companyName" value={jobData.companyName} onChange={handleChange} placeholder="Company Name" />
        </div>

        <div className="form-row">
          <label htmlFor="companyDetails">Company Details:</label>
          <input name="companyDetails" value={jobData.companyDetails} onChange={handleChange} placeholder="Company Details" />
        </div>

        <div className="form-row">
          <label htmlFor="contactId">Contact ID:</label>
          <input name="contactId" value={jobData.contactId} onChange={handleChange} placeholder="Contact ID" />
        </div>

        <div className="form-row">
          <label htmlFor="createdBy">Created By:</label>
          <input name="createdBy" value={jobData.createdBy} onChange={handleChange} placeholder="Created By" />
        </div>

        <div className="form-row">
          <label htmlFor="createdDate">Created Date:</label>
          <input name="createdDate" value={jobData.createdDate} onChange={handleChange} placeholder="Created Date" type="date" />
        </div>

        <div className="form-row">
          <label htmlFor="description">Description:</label>
          <textarea name="description" value={jobData.description} onChange={handleChange} placeholder="Job Description" />
        </div>

        <div className="form-row">
          <label htmlFor="education">Education:</label>
          <input name="education" value={jobData.education} onChange={handleChange} placeholder="Required Education" />
        </div>

        <div className="form-row">
          <label htmlFor="location">Location:</label>
          <input name="location" value={jobData.location} onChange={handleChange} placeholder="Location" />
        </div>

        <div className="form-row">
          <label htmlFor="partFullTime">Full/Part Time:</label>
          <input name="partFullTime" value={jobData.partFullTime} onChange={handleChange} placeholder="Full/Part Time" />
        </div>

        <div className="form-row">
          <label htmlFor="role">Role:</label>
          <input name="role" value={jobData.role} onChange={handleChange} placeholder="Role" />
        </div>

        <div className="form-row">
          <label htmlFor="sponsorship">Sponsorship Available:</label>
          <input name="sponsorship" value={jobData.sponsorship} onChange={handleChange} placeholder="Sponsorship Available?" />
        </div>

        <div className="form-row">
          <label htmlFor="techSkills">Technical Skills:</label>
          <input name="techSkills" value={jobData.techSkills} onChange={handleChange} placeholder="Technical Skills" />
        </div>

        <div className="form-row">
          <label htmlFor="title">Job Title:</label>
          <input name="title" value={jobData.title} onChange={handleChange} placeholder="Job Title" />
        </div>

        <div className="form-row">
          <label htmlFor="visaStatus">Visa Status:</label>
          <input name="visaStatus" value={jobData.visaStatus} onChange={handleChange} placeholder="Visa Status" />
        </div>

        <div className="form-row">
          <label htmlFor="workExperience">Work Experience:</label>
          <input name="workExperience" value={jobData.workExperience} onChange={handleChange} placeholder="Work Experience" />
        </div>

        <div className="form-row">
          <label htmlFor="workMode">Work Mode (Remote/Onsite):</label>
          <input name="workMode" value={jobData.workMode} onChange={handleChange} placeholder="Work Mode (Remote/Onsite)" />
        </div>

        {/* Save & Add More button */}
        <div className="form-buttons">
          <button type="submit">Save & Add More</button>
        </div>
      </form>
    </div>
  );
};

export default AddJobs;
