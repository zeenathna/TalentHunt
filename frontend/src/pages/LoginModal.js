import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const LoginModal = ({ closeModal, onLoginSuccess }) => {
  const { login } = useUser(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
        alert('>>email,password>',email,password);

      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      alert('>>>',response.data);
      if (response.status === 200) {
        const { token, email, firstName, lastName } = response.data;
        
        // Store the token in local storage
        localStorage.setItem('token', token);

        // Set the user data in the context
        login({ email, firstName, lastName });

        // Call the success handler with the email
        alert('email in login',email);
        onLoginSuccess(email); // Pass email directly to the parent
        closeModal(); // Close the modal
      }
    } catch (err) {
      setLoginError('Invalid credentials');
    }
  };

  return (
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
  );
};

export default LoginModal;
