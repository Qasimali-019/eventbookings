import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    signup({ 
      name: `${formData.firstName} ${formData.lastName}`, 
      email: formData.email 
    });
    navigate('/dashboard');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <div className="signup-left-content">
            <h2>Why choose EventBookings for your event ticketing?</h2>
            <ul className="signup-features">
              <li><span className="check">✓</span> Simple, easy-to-use platform</li>
              <li><span className="check">✓</span> Lowest ticketing fees</li>
              <li><span className="check">✓</span> Dedicated customer support team</li>
              <li><span className="check">✓</span> Powerful features</li>
            </ul>
            
            <div className="signup-communities">
              <h3>10,000+ communities and organisers worldwide sell with EventBookings</h3>
              <div className="partner-logos">
                {/* Mock partner logos placeholders */}
                <div className="logo-placeholder">OMF</div>
                <div className="logo-placeholder">QUBA</div>
                <div className="logo-placeholder">IPSC</div>
                <div className="logo-placeholder">TACA</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="signup-right">
          <div className="signup-form-card">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Link to="/">
                <img src="/logo.png" alt="EventBookings" style={{ height: '36px' }} />
              </Link>
            </div>
            <h1>Create a free account now</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First name</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First name" 
                    required 
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last name" 
                    required 
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Email address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email address" 
                  required 
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group password-group">
                <label>Password</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="Password" 
                  required 
                  onChange={handleChange}
                />
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '👁️‍🗨️' : '👁'}
                </span>
              </div>
              
              <div className="form-group password-group">
                <label>Confirm Password</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  placeholder="Confirm Password" 
                  required 
                  onChange={handleChange}
                />
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '👁️‍🗨️' : '👁'}
                </span>
              </div>
              
              <button type="submit" className="signup-submit-btn">Sign up</button>
            </form>
            
            <div className="signup-divider">
              <span>Or, Sign up with</span>
            </div>
            
            <div className="social-signup">
              <button className="social-btn google">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                Google
              </button>
              <button className="social-btn facebook">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
                Facebook
              </button>
              <button className="social-btn apple">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
                Apple
              </button>
            </div>
            
            <p className="signup-terms">
              By clicking "Sign up", you agree to EventBookings <Link to="/terms">Terms & Conditions</Link> and have read the <Link to="/privacy">Privacy Policy</Link>.
            </p>
            
            <p className="signup-footer">
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
