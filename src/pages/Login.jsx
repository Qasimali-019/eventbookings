import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Signup.css'; // Reusing styles

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(formData.email, formData.password);
    if (user.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container" style={{ maxWidth: '1000px' }}>
        <div className="signup-left">
          <div className="signup-left-content">
            <h2>Welcome back to EventBookings</h2>
            <p style={{ opacity: 0.8, fontSize: '1.1rem', marginBottom: '40px' }}>
              Sign in to manage your events, bookings and community interactions.
            </p>
            <div className="signup-communities">
              <div className="partner-logos">
                <div className="logo-placeholder">OMF</div>
                <div className="logo-placeholder">QUBA</div>
                <div className="logo-placeholder">IPSC</div>
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
            <h1>Login to your account</h1>
            <form onSubmit={handleSubmit}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label>Password</label>
                  <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: '#19d36e' }}>Forgot?</Link>
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="Password" 
                  required 
                  onChange={handleChange}
                />
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)} style={{ bottom: '12px' }}>
                  {showPassword ? '👁️‍🗨️' : '👁'}
                </span>
              </div>
              
              <button type="submit" className="signup-submit-btn">Login</button>
            </form>
            
            <div className="signup-divider">
              <span>Or, Login with</span>
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
            </div>
            
            <p className="signup-footer" style={{ marginTop: '40px' }}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
