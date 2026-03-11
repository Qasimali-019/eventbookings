import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleCreateEvent = () => {
    if (isAuthenticated) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard/create-event');
      } else {
        navigate('/admin-dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Event ticketing <br />
            made simple
          </h1>
          <p className="hero-description">
            An easy-to-use event ticketing platform with fair pricing and dedicated human support. All the tools you need for a fraction of the cost charged by other platforms.
          </p>
          <div className="hero-btns">
            <button className="btn-primary-hero" onClick={handleCreateEvent}>Create Event</button>
            <a href="#" className="demo-link">Book A Demo</a>
          </div>
          <div className="hero-ratings">
            <div className="rating-item">
              <span className="rating-text">Capterra 4.7/5</span>
              <span className="stars">★★★★★</span>
            </div>
            <div className="rating-item">
              <span className="rating-text">G2 5/5</span>
              <span className="stars">★★★★★</span>
            </div>
            <div className="rating-item">
              <span className="rating-text">Google 4.7/5</span>
              <span className="stars">★★★★★</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          {/* Using the provided collage image or a placeholder that looks high quality */}
          <img src="/1.png" alt="Event collage" />
        </div>
      </div>
    </section>
  );
};

export default Hero;