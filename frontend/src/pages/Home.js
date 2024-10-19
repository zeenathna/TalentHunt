import React from 'react';

function Home() {
  return (
    <div>
      <h2>Find your dream job</h2>
      <input type="text" placeholder="Search for jobs..." />
      <button>Search</button>
      
      <h3>Job Categories</h3>
      <ul>
        <li>IT Jobs</li>
        <li>Marketing Jobs</li>
        <li>Engineering Jobs</li>
        <li>Healthcare Jobs</li>
      </ul>

      <h3>Featured Jobs</h3>
      <ul>
        <li>Software Engineer at ABC Corp</li>
        <li>Marketing Specialist at XYZ Inc</li>
        <li>Mechanical Engineer at LMN Ltd</li>
      </ul>
    </div>
  );
}

export default Home;
