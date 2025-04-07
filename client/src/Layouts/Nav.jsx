import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import AuthSidebar from './Authsidebar.jsx';
import { useAuth } from '../Contexts/Authcontext.jsx';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'bg-light shadow navbar-scrolled' : 'bg-transparent'}`}>
        <div className="container">
          <Link to="/" className={`navbar-brand fw-bold ${scrolled ? 'text-dark' : 'text-white'}`}>DARNA</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${scrolled ? 'text-dark' : 'text-white'}`}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/estate" className={`nav-link ${scrolled ? 'text-dark' : 'text-white'}`}>Estate</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${scrolled ? 'text-dark' : 'text-white'}`}>About Us</Link>
              </li>
              {user ? (
                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle d-flex align-items-center ${scrolled ? 'text-dark' : 'text-white'}`}
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="rounded-circle me-2"
                        style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2"
                        style={{ width: '30px', height: '30px', fontSize: '16px' }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {user.username}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="userDropdown">
                    <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <button className="btn btn-warning" onClick={() => setAuthOpen(true)}>Sign in</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <AuthSidebar isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Nav;
