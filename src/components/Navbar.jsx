import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const industries = [
    { name: "Business", icon: "💼", bg: "#e8f5e9" },
    { name: "Sports", icon: "⚽", bg: "#e3f2fd" },
    { name: "Charity", icon: "🤝", bg: "#fff3e0" },
    { name: "Councils", icon: "🏛️", bg: "#f3e5f5" },
    { name: "Community", icon: "👨‍👩‍👧‍👦", bg: "#fce4ec" },
    { name: "Entertainment", icon: "🎬", bg: "#f1f8e9" },
    { name: "Concert", icon: "🎸", bg: "#fffde7" }
  ];

  const countries = [
    { name: "Australia", flag: "https://flagcdn.com/w40/au.png" },
    { name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
    { name: "Ireland", flag: "https://flagcdn.com/w40/ie.png" },
    { name: "New Zealand", flag: "https://flagcdn.com/w40/nz.png" },
    { name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
    { name: "United States", flag: "https://flagcdn.com/w40/us.png" },
    { name: "Argentina", flag: "https://flagcdn.com/w40/ar.png" },
    { name: "Austria", flag: "https://flagcdn.com/w40/at.png" }
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleCreateEvent = () => {
    if (isAuthenticated) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard/create-event');
      } else {
        navigate('/dashboard'); // Users can't create from here in this demo logic, but dashboards handle it
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}>
      <div className="navbar-left">
        <Link to="/"><img src="/logo.png" alt="EventBookings" className="navbar-logo" /></Link>
        <span className="navbar-divider" />
        <button className="mobile-toggle" onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`navbar-menu-list ${mobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">Features</Link></li>
          <li className="has-dropdown">
            <span className="nav-item-link">Industry <span className="navbar-caret">&#9662;</span></span>
            <div className="dropdown-menu industry-dropdown">
              {industries.map((item, idx) => (
                <Link key={idx} to={`/industry/${item.name.toLowerCase()}`} className="dropdown-item">
                  <span className="dropdown-icon" style={{ backgroundColor: item.bg }}>{item.icon}</span>
                  <span className="dropdown-text">{item.name}</span>
                </Link>
              ))}
            </div>
          </li>
          <li><Link to="/enterprise">Enterprise</Link></li>
          <li><Link to="/explore">Explore Events</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li className="has-dropdown">
            <span className="nav-item-link">Help <span className="navbar-caret">&#9662;</span></span>
            <div className="dropdown-menu help-dropdown">
              <Link to="/contact" className="dropdown-item">
                <span className="dropdown-icon" style={{ backgroundColor: '#fce4ec' }}>📧</span>
                <span className="dropdown-text">Contact us</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="has-dropdown login-dropdown-trigger">
          <span className="navbar-greeting">
            {isAuthenticated ? `Hi, ${user.name}` : 'Greetings! Sign in'} <span className="navbar-caret">&#9662;</span>
          </span>
          <div className="dropdown-menu auth-dropdown">
            {isAuthenticated ? (
              <>
                <Link to={user.role === 'admin' ? "/admin-dashboard" : "/dashboard"} className="dropdown-item simple-item">Dashboard</Link>
                <div onClick={() => logout(navigate)} className="dropdown-item simple-item" style={{ cursor: 'pointer' }}>Logout</div>
              </>
            ) : (
              <>
                <Link to="/login" className="dropdown-item simple-item">Sign In</Link>
                <Link to="/signup" className="dropdown-item simple-item">Sign Up</Link>
              </>
            )}
          </div>
        </div>
        
        <button className="navbar-create-event" onClick={handleCreateEvent}>
          <span className="navbar-calendar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </span> 
          Create Event
        </button>
        
        <div className="has-dropdown country-dropdown-trigger">
          <span className="navbar-country">
            <img src={selectedCountry.flag} alt={selectedCountry.name} className="navbar-flag" /> {selectedCountry.name} <span className="navbar-caret">&#9662;</span>
          </span>
          <div className="dropdown-menu country-dropdown">
            {countries.map((c, i) => (
              <div key={i} className="dropdown-item country-item" onClick={() => setSelectedCountry(c)}>
                <img src={c.flag} alt={c.name} className="navbar-flag" />
                <span className="dropdown-text">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;