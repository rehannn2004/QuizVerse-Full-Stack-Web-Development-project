import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/main.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (err) {
      console.error('Failed to log out', err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Quiz App</Link>
      </div>
      <div className="navbar-links">
        {currentUser ? (
          <>
            <Link to="/">Quizzes</Link>
            <Link to="/chat">Doubts</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
            <span className="user-info">
              {currentUser.name} ({currentUser.usn})
            </span>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;