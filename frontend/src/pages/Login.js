// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import the UserContext

function Login() {
  const { login } = useUser(); // Access the login function from UserContext
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);

      if (response.data) {
        // Assuming the API returns the user's first and last name
        const { firstName, lastName } = response.data;
        
        // Use the login function to store user information in context
        login({ firstName, lastName, email: formData.email });

        alert('Login successful!');
        navigate('/'); // Redirect to home or desired page
      }
    } catch (error) {
      console.error('There was an error!', error);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
