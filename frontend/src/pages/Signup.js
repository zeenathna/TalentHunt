// src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import your styles

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });
  const [resume, setResume] = useState(null); // State for resume file
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setResume(files[0]); // Set the file directly
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataWithFile = new FormData();
    for (const key in formData) {
      formDataWithFile.append(key, formData[key]);
    }
    formDataWithFile.append('resume', resume); // Append the resume file

    try {
      const response = await axios.post('http://localhost:5000/api/signup-job-seeker', formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      navigate('/success'); // Redirect to success page
    } catch (error) {
      console.error('There was an error!', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number (Optional)"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <div className="file-input-container">
  <label htmlFor="resume">Resume (Doc / PDF):</label>
  <input
    type="file"
    name="resume"
    id="resume"
    accept=".doc,.pdf"
    onChange={handleChange}
    required
  />
</div>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
