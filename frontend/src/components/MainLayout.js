import React from 'react';

const MainLayout = ({ leftContent, centerContent, rightContent }) => {
  return (
    <div className="main-layout">
      <div className="left-container">{leftContent}</div>
      <div className="center-container">{centerContent}</div>
      <div className="right-container">{rightContent}</div>
    </div>
  );
};

export default MainLayout;
