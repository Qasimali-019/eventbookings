import React from 'react';
import './FeesSection.css';

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
    ),
    bg: '#e1f5fe',
    title: 'Free ticket scanning app',
    desc: 'Scan tickets instantly with our free ticket scanning. Keep your attendee check-ins smooth, fast, and completely hassle-free.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    bg: '#fff3e0',
    title: 'Seat reservation',
    desc: 'Create and manage your event’s seating plan easily with our simple tools. Organise seating layouts, assign seats, and keep track of availability without any stress.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    bg: '#e8f5e9',
    title: 'Customisable registration form',
    desc: 'Collect all the attendee information you need with our customisable registration forms. Our configurable order form gives you complete control over attendee details.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
    bg: '#e1f5fe',
    title: 'Email customisation',
    desc: 'Customise your emails to match your event’s style and voice. From order confirmations to event reminders, personalise any emails to make your communications look professional and on-brand.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    ),
    bg: '#f3e5f5',
    title: 'Free email campaign',
    desc: 'Keep your attendees informed and engaged with our free email campaign feature. Reach your audience easily using email campaign to send event updates without any extra cost.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <line x1="20" y1="8" x2="20" y2="14"></line>
        <line x1="23" y1="11" x2="17" y2="11"></line>
      </svg>
    ),
    bg: '#ffebee',
    title: 'Invite people to your event',
    desc: 'Grow your event attendance with our "invitation" feature. Invite guests to your event and track RSVP effortlessly.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
      </svg>
    ),
    bg: '#e1f5fe',
    title: 'Sell tickets with popular payment processors',
    desc: 'Accept payments securely via Stripe, PayPal, Afterpay and Fat Zebra (formerly SecurePay). Your attendees can purchase tickets using debit/credit cards, Apple Pay, Google Pay, and PayPal.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
      </svg>
    ),
    bg: '#e0f2f1',
    title: 'Real human support',
    desc: 'Our friendly support team is available 24/7 to ensure you are never stuck managing your event. Get help from real people whenever you need it.',
  },
];

const FeesSection = () => (
  <section className="fees-full-container">
    {/* Organizations Bar */}
    <div className="orgs-bar">
      <p className="orgs-text">Events created by thousands of organisations around the globe</p>
      <div className="orgs-logos">
        <div className="org-logo">OMF</div>
        <div className="org-logo">IPSC AUSTRALIA</div>
        <div className="org-logo">BIBLICAL COUNSELLING AUSTRALIA</div>
        <div className="org-logo">IPAM</div>
        <div className="org-logo">TRANSPARENCY INTERNATIONAL AUSTRALIA</div>
        <div className="org-logo">TACA</div>
      </div>
    </div>

    {/* Fees Card Section */}
    <div className="fees-highlight-card">
      <div className="fees-highlight-content">
        <div className="fees-highlight-left">
          <h2 className="fees-highlight-title">Lowest fees in the industry</h2>
          <p className="fees-highlight-subtitle-bold">No contracts, no monthly fees, no worries.</p>
          <p className="fees-highlight-subtitle-normal">
            Affordable ticket fees that make sense. Sell tickets and keep more of your revenue.
          </p>
          <button className="btn-create-event-fees">Create Event</button>
        </div>
        <div className="fees-highlight-right">
          <div className="dark-fees-card">
            <div className="dark-fees-top">
              <span className="dark-fees-cents">30<sup>¢</sup></span>
              <span className="dark-fees-plus">+</span>
              <div className="dark-fees-badge">2.5%</div>
            </div>
            <p className="dark-fees-label">Per ticket sold</p>
            <p className="dark-fees-sublabel">Includes credit card processing fees</p>
          </div>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="features-showcase">
      <div className="features-showcase-container">
        <h2 className="features-showcase-title">Powering 20,000+ event organisers globally</h2>
        <p className="features-showcase-subtitle">
          From intimate gatherings to large-scale events, we provide all the tools you need to sell tickets and manage your events smoothly, all without the complexity or high fees.
        </p>
        <div className="features-showcase-grid">
          {features.map((f, i) => (
            <div className="feature-showcase-item" key={i}>
              <div className="feature-icon-wrapper" style={{ backgroundColor: f.bg }}>
                {f.icon}
              </div>
              <div className="feature-text-content">
                <h3 className="feature-showcase-item-title">{f.title}</h3>
                <p className="feature-showcase-item-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="features-showcase-link">
          <a href="#">View All Feature <span>&rarr;</span></a>
        </div>
      </div>
    </div>
  </section>
);

export default FeesSection;