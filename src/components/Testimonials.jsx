import React from 'react';
import './Testimonials.css';

const reviews = [
  {
    rating: "5.0",
    title: "Awesome in event management",
    content: "Easier user intense experience with enough free options available to make running a small event much more simple. I feel their service is tailored with a keen willingness to improve upon their platform and take advice on any quirks/feedbacks.",
    author: "Rory W.",
    role: "Admin & Events"
  },
  {
    rating: "5.0",
    title: "Very useful platform for event ticketing and management",
    content: "EventBookings has allowed my rotary club to take online bookings for events which our previous non profit enterprise. Credit card fees are low and are be charged to the person booking the ticket. The website is easy to use and highly customizable.",
    author: "Nikki F.",
    role: "Secretary"
  },
  {
    rating: "5.0",
    title: "Custom ticketing system and cash flow update",
    content: "EventBookings met my expectations and i found everything i needed. The software is highly flexbile and has customizable courses/session run in great features. It is so simple and easy to use.",
    author: "Prue G.",
    role: "Operations Manager"
  },
  {
    rating: "5.0",
    title: "Customisable and helpful",
    content: "Excellent service from Operative (Robert Miller), he was so through responsive and extremely knowledgeable. the ability to customize order forms with drop down fields, multiple choice and the expertise of the team was key for us. It enabled customers to select exactly what they wanted for every main and dessert, which meant we could produce reports on pre orders.",
    author: "Maurice H.",
    role: "Owner"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Loved by customers</h2>
          <div className="capterra-badge">
            <img src="/capterra-logo.png" alt="Capterra" className="capterra-logo" />
            <div className="capterra-text">
              <p>EventBookings has a 4.7 rating according to the leading software review site, Capterra.</p>
              <div className="stars">★★★★★</div>
            </div>
          </div>
        </div>

        <div className="reviews-slider-container">
          <div className="reviews-grid">
            {reviews.map((row, i) => (
              <div key={i} className="review-card">
                <div className="review-stars">★★★★★</div>
                <h4 className="review-title">{row.title}</h4>
                <p className="review-content">{row.content}</p>
                <div className="review-author">
                  <strong>{row.author}</strong>
                  <span>{row.role}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            <button className="slider-btn">&larr;</button>
            <button className="slider-btn">&rarr;</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
