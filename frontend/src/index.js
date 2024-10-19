import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Optional: Add CSS if you have any
import App from './App';  // Main App component

// Create the root of the React DOM and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
