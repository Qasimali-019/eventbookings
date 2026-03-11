import React, { useEffect, useRef, useState } from 'react';
import './Enterprise.css';

const Enterprise = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const features = [
    { icon: '📧', iconBg: '#ddefff', title: 'Email and SMS campaign', desc: 'Reach more prospects with our comprehensive email and text messaging campaigns.' },
    { icon: '📋', iconBg: '#e9f4ee', title: 'Customise your check out form', desc: 'Add the exact fields and key information you need on your order form.' },
    { icon: '🛍️', iconBg: '#f9edea', title: 'Sell merchandise at check out', desc: 'Provide customers with exclusive merchandise items at point of sale. Increase overall revenue.' },
    { icon: '🎫', iconBg: '#fff3e0', title: 'Sell tickets at the door', desc: 'If delegates arrive without a ticket, sell them one on the spot using the web app on a mobile device.' },
    { icon: '📡', iconBg: '#eef0f8', title: 'Run virtual events', desc: 'Boost engagement with live chat, polls, breakout rooms and enjoy HD quality streaming on all devices.' },
    { icon: '🏷️', iconBg: '#fce4ec', title: 'Discount codes and coupons', desc: "Create any number of specialised tickets and offers tailored to your customers' needs." },
    { icon: '📝', iconBg: '#e0f2f1', title: 'Custom registration form', desc: 'Reach more prospects with our comprehensive email and text messaging campaigns.' },
    { icon: '👥', iconBg: '#d9f8f8', title: 'Team collaboration', desc: 'Stay connected no matter where you are. Effortlessly manage your event in real-time with your team.' },
    { icon: '💰', iconBg: '#f3e5f5', title: 'Raise funds', desc: 'Use the EventBookings ticketing platform as a simple and efficient way to collect donations.' },
    { icon: '📱', iconBg: '#fffde7', title: 'Scan tickets with our mobile app', desc: 'Check-in guests during events right from a mobile device. Access real-time records and cross-reference scanned tickets.' },
  ];

  return (
    <div className="enterprise-page">

      {/* ── HERO ── */}
      <section className="ent-hero">
        <div className="ent-hero__inner">
          <div className="ent-hero__text">
            <p className="ent-hero__tag">Flexible, secure and fast.</p>
            <h1 className="ent-hero__title">Event ticketing platform for enterprise</h1>
            <p className="ent-hero__desc">
              EventBookings is the only cost-effective enterprise event ticketing solution with high
              performance, security, premium support, and guaranteed uptime. Our ticketing platform
              can be tailored to your specific needs.
            </p>
            <div className="ent-hero__ctas">
              <button className="ent-btn ent-btn--primary" id="enterprise-cta-demo">Request A Demo</button>
              <button className="ent-btn ent-btn--outline" id="enterprise-cta-sales">Contact Sales</button>
            </div>
          </div>
          <div className="ent-hero__image">
            <img src="/enterprise-hero.png" alt="Enterprise event management team" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="ent-stats" data-section="stats" ref={addRef}>
        <div className={`ent-stats__inner ${visibleSections.has('stats') ? 'animate-in' : ''}`}>
          <div className="ent-stat-card" style={{ '--card-bg': '#eef0f8' }}>
            <span className="ent-stat-number">20K+</span>
            <span className="ent-stat-label">EventBookings organisers</span>
          </div>
          <div className="ent-stat-card" style={{ '--card-bg': '#e9f4ee' }}>
            <span className="ent-stat-number">20M+</span>
            <span className="ent-stat-label">Total ticket sales</span>
          </div>
          <div className="ent-stat-card" style={{ '--card-bg': '#f9edea' }}>
            <span className="ent-stat-number">10K+</span>
            <span className="ent-stat-label">Requests per minute</span>
          </div>
        </div>
      </section>

      {/* ── INTEGRATION ── */}
      <section className="ent-feature-section ent-feature-section--light" data-section="integration" ref={addRef}>
        <div className={`ent-feature-section__inner ${visibleSections.has('integration') ? 'animate-in' : ''}`}>
          <div className="ent-feature-section__text">
            <span className="ent-feature-section__label">Integration</span>
            <h2 className="ent-feature-section__title">Seamless integration with your existing system</h2>
            <p className="ent-feature-section__desc">
              Integrate EventBookings and use the software as an add-on with your existing platform.
              EventBookings has robust API solutions to cover your specific ticketing requirements.
              From creating events to booking fees, invitee list management to the email invitation,
              take complete control of your ticketing while EventBookings does all the heavy lifting
              hiding behind your brand.
            </p>
          </div>
          <div className="ent-feature-section__image">
            <img src="/enterprise-integration.png" alt="Platform integrations diagram" />
          </div>
        </div>
      </section>

      {/* ── EMBED ── */}
      <section className="ent-feature-section ent-feature-section--dark" data-section="embed" ref={addRef}>
        <div className={`ent-feature-section__inner ent-feature-section__inner--reverse ${visibleSections.has('embed') ? 'animate-in' : ''}`}>
          <div className="ent-feature-section__image ent-feature-section__image--embed">
            <div className="ent-embed-mockup">
              <div className="ent-embed-browser">
                <div className="ent-embed-browser__bar">
                  <span></span><span></span><span></span>
                </div>
                <div className="ent-embed-browser__body">
                  <div className="ent-embed-widget">
                    <div className="ent-embed-widget__ticket">
                      <div className="ent-embed-widget__event-name">Tech Expo 2025</div>
                      <div className="ent-embed-widget__meta">📅 Dec 15, 2025 &nbsp; 📍 Sydney</div>
                      <div className="ent-embed-widget__price">From <strong>$49</strong></div>
                      <button className="ent-embed-widget__btn">Buy Tickets</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ent-feature-section__text">
            <span className="ent-feature-section__label ent-feature-section__label--light">Embedded Ticketing</span>
            <h2 className="ent-feature-section__title ent-feature-section__title--light">Generate ticket sales right from your website</h2>
            <p className="ent-feature-section__desc ent-feature-section__desc--light">
              Embed our ticketing software into your own website to transform your existing website
              into a full-fledged event ticketing system. Keep your attendees on your website and
              sell your event tickets directly within it for a fully branded experience.
            </p>
          </div>
        </div>
      </section>

      {/* ── CUSTOM FEATURES ── */}
      <section className="ent-feature-section ent-feature-section--purple" data-section="custom" ref={addRef}>
        <div className={`ent-feature-section__inner ${visibleSections.has('custom') ? 'animate-in' : ''}`}>
          <div className="ent-feature-section__image">
            <img src="/faetures1.png" alt="Custom features dashboard" className="ent-section-img ent-section-img--shadow" />
          </div>
          <div className="ent-feature-section__text">
            <h2 className="ent-feature-section__title ent-feature-section__title--light">Get custom features built especially for you</h2>
            <p className="ent-feature-section__desc ent-feature-section__desc--light">
              Customised features are tailored exactly to your needs to attain your business demands.
              Engage your customers with high-end and highly configurable solutions introducing new
              add-ons to your ticketing features. EventBookings have a dedicated, experienced team
              who works on building custom features and extending capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section className="ent-feature-section ent-feature-section--light" data-section="security" ref={addRef}>
        <div className={`ent-feature-section__inner ${visibleSections.has('security') ? 'animate-in' : ''}`}>
          <div className="ent-feature-section__text">
            <h2 className="ent-feature-section__title">Compliance and security</h2>
            <p className="ent-feature-section__desc">
              EventBookings encrypts all attendee data in transit and at rest and uses advanced
              security features to minimise unauthorised access. Choose EventBookings for a
              worry-free event booking experience.
            </p>
          </div>
          <div className="ent-feature-section__image">
            <img src="/faetures2.png" alt="Security and compliance interface" className="ent-section-img ent-section-img--shadow" />
          </div>
        </div>
      </section>

      {/* ── PRIORITY SUPPORT ── */}
      <section className="ent-feature-section ent-feature-section--light" data-section="support" ref={addRef}>
        <div className={`ent-feature-section__inner ${visibleSections.has('support') ? 'animate-in' : ''}`}>
          <div className="ent-feature-section__image">
            <img src="/support_illustration.png" alt="Priority customer support" className="ent-section-img ent-section-img--rounded" />
          </div>
          <div className="ent-feature-section__text">
            <h2 className="ent-feature-section__title">Priority customer support</h2>
            <p className="ent-feature-section__desc">
              We offer multi-level training to ensure that you are not just buying the software, but
              you are guaranteed a support team that works along with the software solution! We offer
              an incredible customer success team with rich industry experience to support your
              business.
            </p>
          </div>
        </div>
      </section>

      {/* ── SUITE OF FEATURES ── */}
      <section className="ent-suite" data-section="suite" ref={addRef}>
        <div className={`ent-suite__inner ${visibleSections.has('suite') ? 'animate-in' : ''}`}>
          <div className="ent-suite__header">
            <h2 className="ent-suite__title">Leverage a complete suite full of integrated features</h2>
            <p className="ent-suite__subtitle">
              Everything you need to run successful events, from first registration to final check-in.
            </p>
          </div>
          <div className="ent-suite__grid">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="ent-feat-card"
                style={{ animationDelay: `${idx * 0.07}s` }}
              >
                <div className="ent-feat-card__icon" style={{ background: feat.iconBg }}>
                  {feat.icon}
                </div>
                <div className="ent-feat-card__body">
                  <h3 className="ent-feat-card__title">{feat.title}</h3>
                  <p className="ent-feat-card__desc">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="ent-cta" data-section="cta" ref={addRef}>
        <div className={`ent-cta__inner ${visibleSections.has('cta') ? 'animate-in' : ''}`}>
          <h2 className="ent-cta__title">Ready to get started or have some questions?</h2>
          <p className="ent-cta__subtitle">
            Let us know what you would like to discuss and we'll be in touch shortly.
          </p>
          <button className="ent-btn ent-btn--primary ent-btn--large" id="enterprise-bottom-cta">
            Request A Demo
          </button>
        </div>
      </section>
    </div>
  );
};

export default Enterprise;
