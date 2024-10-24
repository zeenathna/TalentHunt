import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your styles
import talentHuntLogo from '../assets/talenthunt.png'; // Adjust the path if needed
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons
import { useUser } from '../context/UserContext'; // Import UserContext

const Header = ({ onLogout }) => {
  const { user } = useUser(); // Access the user from context
  console.log('userrrr>>>', user);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  const [isSignupMenuOpen, setIsSignupMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const loginRef = useRef(null);
  const signupRef = useRef(null);

  // Toggle functions
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsLoginMenuOpen(false);
    setIsSignupMenuOpen(false);
  };

  const toggleLoginMenu = () => {
    setIsLoginMenuOpen(!isLoginMenuOpen);
    setIsProfileMenuOpen(false);
    setIsSignupMenuOpen(false);
  };

  const toggleSignupMenu = () => {
    setIsSignupMenuOpen(!isSignupMenuOpen);
    setIsProfileMenuOpen(false);
    setIsLoginMenuOpen(false);
  };

  // Close menus if clicking outside
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileMenuOpen(false);
    }
    if (loginRef.current && !loginRef.current.contains(event.target)) {
      setIsLoginMenuOpen(false);
    }
    if (signupRef.current && !signupRef.current.contains(event.target)) {
      setIsSignupMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <h1 className="logo-text">Talent Hunt</h1>
        <img src={talentHuntLogo} alt="Talent Hunt Logo" className="logo-image" />
      </div>

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
            <li className="profile-menu-container" ref={profileRef}>
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
          ) : (
            <>
              <li className="login-menu-container" ref={loginRef}>
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

              <li className="signup-menu-container" ref={signupRef}>
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
