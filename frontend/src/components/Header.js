import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your styles
import talentHuntLogo from '../assets/talenthunt.png'; // Adjust the path if needed
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons

const Header = ({ user, onLogout }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State to manage profile dropdown
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false); // State to manage login dropdown
  const [isSignupMenuOpen, setIsSignupMenuOpen] = useState(false); // State to manage signup dropdown

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen); // Toggle profile dropdown
    setIsLoginMenuOpen(false); // Close other menus
    setIsSignupMenuOpen(false); // Close other menus
  };

  const toggleLoginMenu = () => {
    setIsLoginMenuOpen(!isLoginMenuOpen); // Toggle login dropdown
    setIsProfileMenuOpen(false); // Close other menus
    setIsSignupMenuOpen(false); // Close other menus
  };

  const toggleSignupMenu = () => {
    setIsSignupMenuOpen(!isSignupMenuOpen); // Toggle signup dropdown
    setIsProfileMenuOpen(false); // Close other menus
    setIsLoginMenuOpen(false); // Close other menus
  };

  return (
    <header className="header">
      <div className="logo">
        <h1 className="logo-text">Talent Hunt</h1>
        <img src={talentHuntLogo} alt="Talent Hunt Logo" className="logo-image" />
      </div>

      {/* Welcome message in the center */}
      {user && (
        <div className="welcome-message">
          Welcome, {user.firstName} {user.lastName} !!!
        </div>
      )}

      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/jobs">Find Jobs</Link></li>

          {user ? (
            <>
              {/* Profile menu with drop-down */}
              <li className="profile-menu-container">
                <Link to="#" className="profile-link" onClick={toggleProfileMenu}>
                  Profile {isProfileMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
                </Link>
                {isProfileMenuOpen && (
                  <ul className="dropdown-menu profile-menu">
                    <li><Link to="/update-profile">Update Profile</Link></li>
                    <li><Link to="/job-preferences">Job Preferences</Link></li>
                    <li><Link to="#" onClick={onLogout}>Logout</Link></li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <>
              {/* Login menu with drop-down */}
              <li className="login-menu-container">
                <Link to="#" className="login-link" onClick={toggleLoginMenu}>
                  Login {isLoginMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
                </Link>
                {isLoginMenuOpen && (
                  <ul className="dropdown-menu login-menu">
                    <li><Link to="/login">Job Seeker</Link></li>
                    <li><Link to="/login-employer">Employer</Link></li>
                  </ul>
                )}
              </li>

              {/* Signup menu with drop-down */}
              <li className="signup-menu-container">
                <Link to="#" className="signup-link" onClick={toggleSignupMenu}>
                  Sign Up {isSignupMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
                </Link>
                {isSignupMenuOpen && (
                  <ul className="dropdown-menu signup-menu">
                    <li><Link to="/signup-job-seeker">Job Seeker</Link></li>
                    <li><Link to="/signup-employer">Employer</Link></li>
                  </ul>
                )}
              </li>
            </>
          )}
          
          {/* Admin menu with drop-down */}
          <li className="admin-menu-container">
            <Link to="#" className="admin-link">
              Admin <FaChevronDown />
            </Link>
            <ul className="dropdown-menu admin-menu">
              <li><Link to="/addjobs">Add Jobs</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
