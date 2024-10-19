// src/pages/Success.js
import React from 'react';
import { Link } from 'react-router-dom';

function Success() {
  return (
    <div className="success-message">
      <h2>Signup Successful!</h2>
      <p>Thank you for signing up. You can now log in and start exploring the job opportunities!</p>
      <Link to="/login" className="login-link">Login</Link> {/* Added login link */}
    </div>
  );
}

export default Success;
