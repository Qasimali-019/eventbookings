import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';
import './EventDetail.css';

const allEvents = [
  {
    id: "junior-park-cc-presentation-night-2026",
    title: "Junior Park CC Presentation Night 2026",
    location: "Sydney Community Centre",
    address: "12 Park Street, Sydney, NSW, 2000, Australia",
    date: "Fri, 2 Nov 2026",
    time: "10:30 AM - 2:00 PM",
    price: "$5.00",
    img: "/1.png",
    category: "Community and Culture",
    organiser: "Junior Park CC",
    eventsHosted: 12,
    description: "Join us for the annual presentation night celebrating the achievements of our community members. This is a wonderful evening of recognition, performances, and camaraderie. Light refreshments will be provided. Families and friends are welcome to attend and celebrate together.",
    highlights: ["Live performances", "Award ceremonies", "Light refreshments", "Family friendly"],
    refundPolicy: "Full refund available up to 48 hours before the event. No refunds after that period."
  },
  {
    id: "annual-business-networking-gala",
    title: "Annual Business Networking Gala",
    location: "Melbourne Convention Centre",
    address: "1 Convention Centre Place, South Wharf, VIC, 3006, Australia",
    date: "Sat, 15 Mar 2026",
    time: "6:00 PM - 11:00 PM",
    price: "$85.00",
    img: "/1.png",
    category: "Business",
    organiser: "Melbourne Business Network",
    eventsHosted: 45,
    description: "An exclusive evening of networking with top business leaders and entrepreneurs from across Australia. Enjoy premium catering, keynote speakers, and valuable connections that will help grow your business. Dress code: Business formal.",
    highlights: ["Keynote speakers", "Premium catering", "VIP networking lounge", "Business card exchange"],
    refundPolicy: "Non-refundable. Ticket transfers allowed up to 7 days before the event."
  },
  {
    id: "live-jazz-soul-night",
    title: "Live Jazz & Soul Night",
    location: "The Tivoli Brisbane",
    address: "52 Costin Street, Fortitude Valley, QLD, 4006, Australia",
    date: "Fri, 21 Mar 2026",
    time: "7:30 PM - 11:30 PM",
    price: "$45.00",
    img: "/1.png",
    category: "Music and Theater",
    organiser: "Brisbane Live Music Co.",
    eventsHosted: 78,
    description: "Experience an unforgettable evening of live jazz and soul music featuring some of Australia's finest musicians. The intimate venue provides the perfect atmosphere for a night of smooth sounds, cocktails, and good vibes.",
    highlights: ["Live band performance", "Cocktail bar", "Intimate venue", "18+ event"],
    refundPolicy: "Refunds available up to 72 hours before the event. A 10% processing fee applies."
  },
  {
    id: "yoga-wellness-retreat-weekend",
    title: "Yoga & Wellness Retreat Weekend",
    location: "Serenity Wellness Centre",
    address: "88 Ocean Drive, Gold Coast, QLD, 4217, Australia",
    date: "Sat, 5 Apr 2026",
    time: "8:00 AM - 5:00 PM",
    price: "$120.00",
    img: "/1.png",
    category: "Sports and Fitness",
    organiser: "Gold Coast Wellness",
    eventsHosted: 34,
    description: "A full-day wellness retreat combining yoga, meditation, and holistic health workshops. Set against the stunning Gold Coast backdrop, this retreat is designed to rejuvenate your mind, body, and soul. Includes organic lunch, herbal teas, and wellness goody bag.",
    highlights: ["Morning yoga session", "Guided meditation", "Organic lunch included", "Wellness workshops"],
    refundPolicy: "Full refund up to 7 days before the event. 50% refund within 3-7 days."
  },
  {
    id: "digital-marketing-masterclass",
    title: "Digital Marketing Masterclass",
    location: "Online Event",
    address: "Virtual — Zoom link provided upon registration",
    date: "Wed, 9 Apr 2026",
    time: "10:00 AM - 1:00 PM",
    price: "Free",
    img: "/1.png",
    category: "Education and Training",
    organiser: "Digital Academy AU",
    eventsHosted: 156,
    description: "A comprehensive 3-hour masterclass covering the latest digital marketing strategies for 2026. Learn about SEO, social media marketing, content strategy, and paid advertising from industry experts. Perfect for small business owners and marketing professionals.",
    highlights: ["SEO strategies", "Social media tips", "Content planning", "Q&A session"],
    refundPolicy: "Free event — no refund policy applicable."
  },
  {
    id: "contemporary-art-exhibition-opening",
    title: "Contemporary Art Exhibition Opening",
    location: "Perth Gallery of Modern Art",
    address: "45 Cultural Boulevard, Perth, WA, 6000, Australia",
    date: "Thu, 17 Apr 2026",
    time: "5:00 PM - 9:00 PM",
    price: "$25.00",
    img: "/1.png",
    category: "Arts",
    organiser: "Perth Arts Collective",
    eventsHosted: 23,
    description: "Be among the first to experience this stunning new exhibition featuring works from 15 contemporary Australian artists. The opening night includes an artist talk, complimentary champagne, and canapés.",
    highlights: ["Artist meet & greet", "Complimentary champagne", "15 featured artists", "Interactive installations"],
    refundPolicy: "Refunds available up to 48 hours before the event."
  },
  {
    id: "startup-pitch-night-2026",
    title: "Startup Pitch Night 2026",
    location: "Fishburners Coworking",
    address: "11 York Street, Sydney, NSW, 2000, Australia",
    date: "Tue, 22 Apr 2026",
    time: "6:30 PM - 9:30 PM",
    price: "$15.00",
    img: "/1.png",
    category: "Business",
    organiser: "Sydney Startup Hub",
    eventsHosted: 67,
    description: "Watch 10 promising startups pitch their ideas to a panel of investors and industry experts. Network with founders, investors, and fellow tech enthusiasts. Includes pizza and drinks.",
    highlights: ["10 startup pitches", "Investor panel", "Networking drinks", "Audience voting"],
    refundPolicy: "Non-refundable. Tickets are transferable."
  },
  {
    id: "community-cultural-festival",
    title: "Community Cultural Festival",
    location: "Adelaide Botanic Gardens",
    address: "North Terrace, Adelaide, SA, 5000, Australia",
    date: "Sun, 27 Apr 2026",
    time: "11:00 AM - 6:00 PM",
    price: "Free",
    img: "/1.png",
    category: "Community and Culture",
    organiser: "Adelaide Multicultural Council",
    eventsHosted: 19,
    description: "A vibrant celebration of the diverse cultures that make Adelaide special. Enjoy live performances from around the world, traditional food stalls, art workshops, and children's activities. Free entry for all — everyone is welcome!",
    highlights: ["Live cultural performances", "Food stalls", "Children's activities", "Art workshops"],
    refundPolicy: "Free event — no refund policy applicable."
  },
  {
    id: "professional-photography-workshop",
    title: "Professional Photography Workshop",
    location: "Melbourne School of Photography",
    address: "200 Spencer Street, Melbourne, VIC, 3000, Australia",
    date: "Sat, 3 May 2026",
    time: "9:00 AM - 4:00 PM",
    price: "$75.00",
    img: "/1.png",
    category: "Education and Training",
    organiser: "Melbourne Photography Academy",
    eventsHosted: 89,
    description: "A hands-on photography workshop covering composition, lighting, and post-processing techniques. Suitable for intermediate photographers looking to elevate their skills. Bring your own DSLR or mirrorless camera.",
    highlights: ["Hands-on practice", "Studio lighting session", "Photo editing tutorial", "Portfolio review"],
    refundPolicy: "Full refund up to 5 days before. 50% refund within 2-5 days."
  },
  {
    id: "outdoor-music-festival-2026",
    title: "Outdoor Music Festival 2026",
    location: "Byron Bay Parklands",
    address: "Broken Head Road, Byron Bay, NSW, 2481, Australia",
    date: "Sat, 10 May 2026",
    time: "12:00 PM - 10:00 PM",
    price: "$95.00",
    img: "/1.png",
    category: "Music and Theater",
    organiser: "Byron Bay Events Co.",
    eventsHosted: 42,
    description: "A full-day outdoor music festival featuring local and international artists across two stages. Enjoy food trucks, craft beer gardens, and artisan market stalls. Set in the beautiful Byron Bay Parklands with ocean views.",
    highlights: ["Two live stages", "Food trucks", "Craft beer garden", "Artisan market"],
    refundPolicy: "Non-refundable. Ticket transfers available via our website."
  },
  {
    id: "marathon-fun-run",
    title: "Marathon & Fun Run",
    location: "Sydney Olympic Park",
    address: "Olympic Boulevard, Sydney Olympic Park, NSW, 2127, Australia",
    date: "Sun, 18 May 2026",
    time: "6:00 AM - 12:00 PM",
    price: "$55.00",
    img: "/1.png",
    category: "Sports and Fitness",
    organiser: "Run Australia",
    eventsHosted: 58,
    description: "Choose from 5km, 10km, half marathon, or full marathon distances. All participants receive a finisher's medal, timing chip, and event t-shirt. Water stations every 3km. Post-race festival with food, music, and recovery zone.",
    highlights: ["Multiple distance options", "Finisher's medal", "Event t-shirt", "Post-race festival"],
    refundPolicy: "Non-refundable. Deferrals to next year's event available for a $15 fee."
  },
  {
    id: "food-wine-tasting-experience",
    title: "Food & Wine Tasting Experience",
    location: "Hunter Valley Estate",
    address: "128 Wine Country Drive, Pokolbin, NSW, 2320, Australia",
    date: "Sat, 24 May 2026",
    time: "11:00 AM - 4:00 PM",
    price: "$110.00",
    img: "/1.png",
    category: "Arts",
    organiser: "Hunter Valley Experiences",
    eventsHosted: 31,
    description: "An exclusive food and wine tasting experience at one of Hunter Valley's premier estates. Enjoy expertly paired wines with gourmet dishes prepared by award-winning chefs. Includes a vineyard tour, cheese masterclass, and a bottle of wine to take home.",
    highlights: ["Wine tasting (8 varieties)", "Gourmet lunch", "Vineyard tour", "Bottle to take home"],
    refundPolicy: "Full refund up to 14 days before. No refunds within 14 days."
  }
];

const EventDetail = () => {
  const { eventId } = useParams();
  const [ticketQty, setTicketQty] = useState(1);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [attendeeDetails, setAttendeeDetails] = useState({ name: '', email: '', dietary: '' });

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const event = allEvents.find(e => e.id === eventId);

  // Countdown timer
  useEffect(() => {
    if (!event) return;
    const targetDate = new Date('2026-04-18T15:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) { clearInterval(timer); return; }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [event]);

  if (!event) {
    return (
      <div className="event-detail-page">
        <div className="event-not-found">
          <h2>Event not found</h2>
          <p>Sorry, we couldn't find the event you're looking for.</p>
          <Link to="/explore" className="back-link">← Back to Explore Events</Link>
        </div>
      </div>
    );
  }

  // Parse date for badge
  const [weekday, month, day] = event.date.replace(',', '').split(' ');
  const priceNum = event.price === "Free" ? 0 : parseFloat(event.price.replace('$', ''));
  const totalPrice = priceNum * ticketQty;
  const relatedEvents = allEvents.filter(e => e.id !== event.id).slice(0, 8);

  const handlePurchaseClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Pre-fill user data
    setAttendeeDetails({ ...attendeeDetails, name: user.name, email: user.email });
    setIsCheckoutOpen(true);
    setCheckoutStep(1);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (checkoutStep === 1) {
      setCheckoutStep(2);
    } else {
      setIsCheckoutOpen(false);
      setCheckoutStep(1);
      navigate('/dashboard');
    }
  };

  return (
    <div className="event-detail-page">
      {/* Event Header */}
      <div className="event-header">
        <div className="event-header-inner">
          <div className="event-date-badge">
            <div className="event-date-day">{weekday}</div>
            <div className="event-date-num">{day}</div>
            <div className="event-date-month">{month.toUpperCase()}</div>
          </div>
          <div className="event-header-info">
            <h1 className="event-header-title">{event.title}</h1>
            <div className="event-header-meta">
              <span className="event-header-location">{event.location}</span>
              <span className="event-header-dot">•</span>
              <span className="event-header-date">{event.date}</span>
              <span className="event-header-dot">•</span>
              <span className="event-header-time">{event.time}</span>
            </div>
          </div>
          <div className="event-header-actions">
            <button className="event-header-btn">Share</button>
            <button className="event-header-btn">Save</button>
          </div>
        </div>
        <div className="event-header-img-wrap">
          <img src={event.img} alt={event.title} className="event-header-img" />
        </div>
      </div>

      {/* Organiser Bar */}
      <div className="organiser-bar">
        <div className="organiser-bar-inner">
          <div className="organiser-bar-left">
            <div className="organiser-bar-avatar">{event.organiser.charAt(0)}</div>
            <div>
              <h3 className="organiser-bar-name">{event.organiser}</h3>
              <p className="organiser-bar-count">{event.eventsHosted} Followers</p>
            </div>
          </div>
          <button className="follow-btn-bar">Follow</button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="ed-container">
        <div className="ed-layout">
          {/* LEFT COLUMN */}
          <div className="ed-left">
            {/* About This Event */}
            <section className="ed-section">
              <h2 className="ed-section-title">About This Event</h2>
              <h3 className="ed-event-name">{event.title}</h3>
              <p className="ed-description">{event.description}</p>

              <div className="ed-highlights-list">
                {event.highlights.map((h, i) => (
                  <p key={i}>* {h}</p>
                ))}
              </div>

              <p className="ed-price-line">{event.price === "Free" ? "Free entry" : `${event.price} + BF`}</p>
            </section>

            {/* Refund Policy */}
            <section className="ed-section refund-section">
              <h3 className="ed-refund-title">REFUND POLICY</h3>
              <p className="ed-refund-text">{event.refundPolicy}</p>
              <div className="ed-refund-list">
                <p>a) You changed your mind</p>
                <p>b) Our booking proceeded and you did not like it</p>
                <p>c) You were not able to attend</p>
              </div>
            </section>

            {/* Location with Map */}
            <section className="ed-section">
              <h2 className="ed-section-title">Location</h2>
              <div className="ed-map-embed">
                <iframe
                  title="Event Location"
                  width="100%"
                  height="350"
                  style={{ border: 0, borderRadius: '16px' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(event.address)}&output=embed`}
                ></iframe>
              </div>
              <div className="ed-location-info">
                <div className="ed-location-pin">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <strong>Location</strong>
                  <p>{event.location}, {event.address}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="ed-directions-link"
                  >Get Directions</a>
                </div>
              </div>
            </section>

            {/* About Organiser */}
            <section className="ed-section">
              <h2 className="ed-section-title">About Organiser</h2>
              <div className="ed-organiser-card">
                <div className="ed-org-avatar">{event.organiser.charAt(0)}</div>
                <div className="ed-org-info">
                  <h3>{event.organiser}</h3>
                  <p>Hosted {event.eventsHosted} events</p>
                  <div className="ed-org-actions">
                    <button className="ed-org-btn view-profile">View Profile</button>
                    <button className="ed-org-btn contact-org">Contact</button>
                    <button className="ed-org-btn follow-org">Follow</button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="ed-right">
            <div className="ed-ticket-sidebar">
              {/* Countdown Timer */}
              <p className="ed-countdown-label">Booking will end on {event.date}</p>
              <p className="ed-countdown-sub">Hurry! Limited Tickets Available</p>
              <div className="ed-countdown-boxes">
                <div className="cd-box"><span className="cd-num">{String(countdown.days).padStart(2, '0')}</span><span className="cd-label">DAYS</span></div>
                <div className="cd-box"><span className="cd-num">{String(countdown.hours).padStart(2, '0')}</span><span className="cd-label">HOURS</span></div>
                <div className="cd-box"><span className="cd-num">{String(countdown.minutes).padStart(2, '0')}</span><span className="cd-label">MINUTES</span></div>
                <div className="cd-box"><span className="cd-num">{String(countdown.seconds).padStart(2, '0')}</span><span className="cd-label">SECONDS</span></div>
              </div>

              {/* Date & Time */}
              <div className="ed-sidebar-group">
                <h4>Date & Time</h4>
                <p className="ed-sidebar-detail">Start Time - {event.date}</p>
                <p className="ed-sidebar-detail">End Time - {event.date}</p>
                <a href="#" className="ed-sidebar-link">📅 Add to Calendar</a>
              </div>

              {/* Location */}
              <div className="ed-sidebar-group">
                <h4>Location</h4>
                <p className="ed-sidebar-detail">{event.location}</p>
                <p className="ed-sidebar-detail">{event.address}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`} target="_blank" rel="noreferrer" className="ed-sidebar-link">📍 View on Map</a>
              </div>

              {/* Refund Policy */}
              <div className="ed-sidebar-group">
                <h4>Refund Policy</h4>
                <p className="ed-sidebar-detail">{event.refundPolicy.substring(0, 80)}</p>
              </div>

              {/* Price & Purchase */}
              <div className="ed-sidebar-price">
                <span className="ed-price-big">{event.price === "Free" ? "Free" : `$${totalPrice.toFixed(2)}`}</span>
              </div>
              <button className="ed-purchase-btn" onClick={handlePurchaseClick}>Purchase Ticket</button>
            </div>
          </div>
        </div>
      </div>

      {/* More Events from Organiser */}
      <section className="ed-more-events">
        <div className="ed-more-container">
          <h2 className="ed-more-title">More events from this organiser</h2>
          <div className="ed-more-grid">
            {relatedEvents.map((ev) => (
              <Link to={`/event/${ev.id}`} key={ev.id} className="ed-more-card">
                <div className="ed-more-img-wrap">
                  <img src={ev.img} alt={ev.title} className="ed-more-img" />
                  <span className="ed-more-badge">{ev.category}</span>
                </div>
                <div className="ed-more-body">
                  <h4 className="ed-more-card-title">{ev.title}</h4>
                  <p className="ed-more-card-price">{ev.price}</p>
                  <p className="ed-more-card-date">{ev.date} · {ev.time}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="checkout-modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="checkout-modal" onClick={e => e.stopPropagation()}>
            <div className="checkout-modal-header">
              <h2>{checkoutStep === 1 ? 'Attendee Details' : 'Review & Payment'}</h2>
              <button className="close-modal-btn" onClick={() => setIsCheckoutOpen(false)}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleCheckoutSubmit}>
              <div className="checkout-modal-body">
                {checkoutStep === 1 ? (
                  <div className="checkout-step-1">
                    <p className="checkout-subtitle">Tickets for {event.title}</p>
                    
                    <div className="form-group mb-16">
                      <label>Full Name</label>
                      <input type="text" value={attendeeDetails.name} onChange={e => setAttendeeDetails({...attendeeDetails, name: e.target.value})} required />
                    </div>
                    
                    <div className="form-group mb-16">
                      <label>Email Address</label>
                      <input type="email" value={attendeeDetails.email} onChange={e => setAttendeeDetails({...attendeeDetails, email: e.target.value})} required />
                    </div>

                    <div className="form-group mb-16">
                      <label>Dietary Requirements (Optional)</label>
                      <input type="text" placeholder="e.g. Vegan, Gluten-Free" value={attendeeDetails.dietary} onChange={e => setAttendeeDetails({...attendeeDetails, dietary: e.target.value})} />
                    </div>
                  </div>
                ) : (
                  <div className="checkout-step-2">
                    <div className="order-summary-box">
                      <h4>Order Summary</h4>
                      <div className="summary-row">
                        <span>{ticketQty}x General Admission</span>
                        <span>{event.price === "Free" ? "Free" : `$${(priceNum * ticketQty).toFixed(2)}`}</span>
                      </div>
                      <div className="summary-row">
                        <span>Platform Fee</span>
                        <span>$0.00</span>
                      </div>
                      <hr className="summary-divider" />
                      <div className="summary-row total">
                        <span>Total</span>
                        <span>{event.price === "Free" ? "Free" : `$${(priceNum * ticketQty).toFixed(2)}`}</span>
                      </div>
                    </div>

                    {event.price !== "Free" && (
                       <div className="payment-mock-box">
                         <p style={{marginBottom: '10px', fontSize: '14px', fontWeight: '600'}}>Payment Details</p>
                         <input type="text" placeholder="Card Number" required style={{ width: '100%', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                         <div style={{ display: 'flex', gap: '10px' }}>
                           <input type="text" placeholder="MM/YY" required style={{ width: '50%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                           <input type="text" placeholder="CVC" required style={{ width: '50%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                         </div>
                       </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="checkout-modal-footer">
                {checkoutStep === 2 && (
                  <button type="button" className="btn-secondary" onClick={() => setCheckoutStep(1)}>Back</button>
                )}
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px', fontSize: '16px' }}>
                  {checkoutStep === 1 ? 'Continue' : `Confirm RSVP ${event.price === "Free" ? "" : "& Pay"}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;