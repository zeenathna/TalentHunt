// MainLayout.js
import React from 'react';
import './MainLayout.css'; // Optional: Add styles for your layout

const MainLayout = ({ leftContent, centerContent, rightContent }) => (
  <div className="layout">
    {leftContent && <div className="left">{leftContent}</div>} {/* Conditionally render left content */}
    <div className="center">{centerContent}</div> {/* Always render center content */}
    {rightContent && <div className="right">{rightContent}</div>} {/* Conditionally render right content */}
  </div>
);

export default MainLayout;
