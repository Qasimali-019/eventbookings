import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-logo-col">
          <Link to="/"><img src="/logo.png" alt="EventBookings" className="footer-logo" /></Link>
        </div>
        <div className="footer-links-col">
          <div className="footer-link-group">
            <h4>Product</h4>
            <ul>
              <li><Link to="/">Features</Link></li>
              <li><Link to="/enterprise">Enterprise</Link></li>
              <li><Link to="/explore">Explore Events</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>
          <div className="footer-link-group">
            <h4>EventBookings</h4>
            <ul>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login">Sign In</Link></li>
            </ul>
          </div>
          <div className="footer-link-group">
            <h4>Support</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-links">
          <a href="#">Terms & Conditions</a>
          <span>•</span>
          <a href="#">Privacy Policy</a>
          <span>•</span>
          <a href="#">Cookie Policy</a>
        </div>
        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram" /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter" /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin" /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube-play" /></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-tiktok" /></a>
        </div>
        <div className="footer-copyright">
          &copy; 2026 EventBookings. All rights reserved.
          <a href="#" className="footer-top-link">Top ↑</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;